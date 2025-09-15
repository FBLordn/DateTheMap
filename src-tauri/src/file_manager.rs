use osfs::{CACHE_PATH, CONFIG_PATH};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::{env, fs};

use crate::embed::server::Coords;

#[cfg(any(target_os = "linux", target_os = "macos"))]
mod osfs {
    use super::check_path_var;
    use std::{env, sync::LazyLock};
    pub static CONFIG_PATH: LazyLock<String> = LazyLock::new(|| {
        let path = check_path_var(
            "XDG_CONFIG_HOME",
            env::var_os("HOME").unwrap().into_string().unwrap() + "/.config",
        );
        path + "/config.json"
    });
    pub static CACHE_PATH: LazyLock<String> =
        LazyLock::new(|| check_path_var("XDG_CACHE_HOME", "~/.cache/".to_string()));
}
#[cfg(target_os = "windows")]
mod osfs {
    use super::check_path_var;
    use std::sync::LazyLock;
    pub static CONFIG_PATH: LazyLock<String> = LazyLock::new(|| {
        let mut path = check_path_var(
            "APPDATA",
            "C:\\Users\\{username}\\AppData\\Roaming".to_string(),
        );
        path.push_str(&String::from("\\config.json"));
        path
    });
    pub static CACHE_PATH: LazyLock<String> = LazyLock::new(|| {
        check_path_var(
            "LOCALAPPDATA",
            "C:\\Users\\{username}\\Desktop\\".to_string(), //Punish user for missing env var
        )
    });
}

fn check_path_var(var: &str, alternative: String) -> String {
    let mut path = env::var_os(var)
        .unwrap_or(alternative.clone().into())
        .into_string()
        .unwrap();
    if !fs::exists(&path).unwrap_or(true) {
        path = alternative;
    }
    path = PathBuf::from(path)
        .join("DateTheMap")
        .to_str()
        .unwrap()
        .into();
    let _ = fs::create_dir_all(&path).inspect_err(|err| println!("{err}"));
    path
}

pub enum RequestType {
    Config,
    OfflineMap(Coords),
}

pub struct FileManager {}

impl FileManager {
    pub fn write<T: Serialize>(request: &RequestType, data: T) {
        match request {
            RequestType::Config => {
                let serialised = serde_json::to_string(&data).unwrap();
                let _ = fs::write(Path::new(&*CONFIG_PATH), serialised);
            }
            RequestType::OfflineMap(coords) => {
                let serialised = serde_json::to_string(&data).unwrap();
                let path = PathBuf::from(&*CACHE_PATH).join(format!(
                    "tile_{x}_{y}_{z}.pbf",
                    x = coords.x,
                    y = coords.y,
                    z = coords.z
                ));
                let _ = fs::write(path, serialised);
            }
        }
    }

    pub fn read<T: for<'a> Deserialize<'a> + Default>(request: &RequestType) -> T {
        match request {
            RequestType::Config => {
                if let Ok(data) = fs::read_to_string(&*CONFIG_PATH) {
                    serde_json::from_str::<T>(&data).unwrap()
                } else {
                    T::default()
                }
            }
            RequestType::OfflineMap(coords) => {
                let path = PathBuf::from(&*CACHE_PATH).join(format!(
                    "tile_{x}_{y}_{z}.pbf",
                    x = coords.x,
                    y = coords.y,
                    z = coords.z
                ));
                let data = fs::read_to_string(path).unwrap();
                serde_json::from_str::<T>(&data).unwrap()
            }
        }
    }
}
