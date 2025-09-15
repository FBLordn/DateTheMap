use std::{
    env::{self, home_dir},
    fs,
    path::PathBuf,
};

use log::error;

use crate::embed::server::Coords;

pub trait Cache {
    async fn get_tile(&self, coords: Coords) -> Vec<u8>;
    async fn force_get_tile(&self, coords: Coords) -> Vec<u8>;
}

#[derive(Clone)]
pub struct MapCachent {
    path: String,
    //"https://vtiles.openhistoricalmap.org/maps/{path}/{z}/{x}/{y}.pbf"
}

impl MapCachent {
    pub fn new(path: String) -> MapCachent {
        MapCachent { path }
    }
}

impl Cache for MapCachent {
    async fn get_tile(&self, coords: Coords) -> Vec<u8> {
        let Coords { x, y, z, path } = coords;
        let uri = self
            .path
            .replace("{path}", &path)
            .replace("{z}", &z)
            .replace("{x}", &x)
            .replace("{y}", &y);
        reqwest::get(uri)
            .await
            .unwrap()
            .bytes()
            .await
            .unwrap()
            .to_vec()
    }

    async fn force_get_tile(&self, coords: Coords) -> Vec<u8> {
        self.get_tile(coords).await
    }
}

pub struct MapCacher {
    uri: String,
    file_path: PathBuf,
}

pub enum CacheError {
    NoValidStorageFound,
}

impl MapCacher {
    pub fn new(uri: String) -> Result<MapCacher, CacheError> {
        let path;
        #[cfg(target_os = "linux")]
        let base = env::var_os("XDG_CACHE_HOME");
        let errormsg = "No suitable directory found for linux.";

        #[cfg(target_os = "windows")]
        let errormsg = "No suitable directory found for Windows.";

        if let Some(flared_base) = base {
            path = Some(PathBuf::from(flared_base).join("dateTheMap"));
        } else if home_dir().is_none() {
            error!("{errormsg}",);
            path = None;
        } else {
            path = Some(home_dir().unwrap().join("dateTheMap"));
        }

        if let Some(unwrapped) = path {
            Ok(MapCacher {
                uri,
                file_path: unwrapped,
            })
        } else {
            Err(CacheError::NoValidStorageFound)
        }
    }

    fn write_cache(tile: Vec<u8>, coords: &Coords) {
        let _ = fs::write(
            format!(
                "tile_{x}_{y}_{z}.pbf",
                x = coords.x,
                y = coords.y,
                z = coords.z
            ),
            tile,
        );
    }

    fn read_cache(coords: &Coords) -> Option<Vec<u8>> {
        let data = fs::read(format!(
            "tile_{x}_{y}_{z}.pbf",
            x = coords.x,
            y = coords.y,
            z = coords.z
        ));
        data.ok()
    }
}

impl Cache for MapCacher {
    async fn get_tile(&self, coords: Coords) -> Vec<u8> {
        let Coords { x, y, z, path } = coords;
        let uri = self
            .uri
            .replace("{path}", &path)
            .replace("{z}", &z)
            .replace("{x}", &x)
            .replace("{y}", &y);
        reqwest::get(uri)
            .await
            .unwrap()
            .bytes()
            .await
            .unwrap()
            .to_vec()
    }

    async fn force_get_tile(&self, coords: Coords) -> Vec<u8> {
        todo!()
    }
}
