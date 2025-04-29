use serde::{Deserialize, Serialize};
use std::env;
use std::ffi::OsString;
use std::fs;

#[cfg(any(target_os = "linux", target_os = "macos"))]
mod osfs {
    use super::check_path_var;
    use std::sync::LazyLock;
    static CONFIG_PATH: LazyLock<std::ffi::OsString> =
        LazyLock::new(|| check_path_var("XDG_CONFIG_HOME", "~/.config/".to_string()));
    static CACHE_PATH: LazyLock<std::ffi::OsString> =
        LazyLock::new(|| check_path_var("XDG_CACHE_HOME", "~/.cache/".to_string()));
}
#[cfg(target_os = "windows")]
mod osfs {
    use super::check_path_var;
    use std::sync::LazyLock;
    static CONFIG_PATH: LazyLock<std::ffi::OsString> = LazyLock::new(|| {
        check_path_var(
            "LOCALAPPDATA",
            "C:\\Users\\{username}\\AppData\\Local".to_string(),
        )
    });
    static CACHE_PATH: LazyLock<std::ffi::OsString> = LazyLock::new(|| {
        check_path_var(
            "LOCALAPPDATA",
            "C:\\Users\\{username}\\Desktop\\".to_string(), //Punish user for missing env var
        )
    });
}

fn check_path_var(var: &str, alternative: String) -> OsString {
    let path = env::var_os(var).unwrap_or(alternative.clone().into());
    if !fs::exists(&path).unwrap_or(false) {
        fs::create_dir(&alternative);
        fs::create_dir(&(alternative.clone() + "DateTheMap"));
        return alternative.into();
    }
    fs::create_dir(&(path.clone().into_string().unwrap() + "DateTheMap"));
    path
}

pub enum RequestType {
    Config,
    OfflineMap((u8, u8)),
}

pub struct FileManager {}

impl FileManager {
    fn write<T: Serialize>(request: RequestType, data: T) {}

    fn read<'a, T: Deserialize<'a>>(request: RequestType) {}
}
