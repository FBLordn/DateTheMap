use std::{env::{self, home_dir}, pat, path::{Path, PathBuf}};

use axum::body::Bytes;
use log::error;

use crate::embed::server::Coords;

pub trait Cache {
    async fn get_tile(&self, coords: Coords) -> Bytes;
    async fn force_get_tile(&self, coords: Coords) -> Bytes;
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
    async fn get_tile(&self, coords: Coords) -> Bytes {
        let Coords { x, y, z, path } = coords;
        let uri = self
            .path
            .replace("{path}", &path)
            .replace("{z}", &z)
            .replace("{x}", &x)
            .replace("{y}", &y);
        reqwest::get(uri).await.unwrap().bytes().await.unwrap()
    }

    async fn force_get_tile(&self, coords: Coords) -> Bytes {
        self.get_tile(coords).await
    }
}

pub struct MapCacher {
    uri: String,
    file_path: PathBuf,
}

impl MapCacher {
    pub fn new(uri: String) -> MapCacher {
        let path;
        #[cfg(target_os = "linux")]
        let base = env::var_os("XDG_CACHE_HOME");
        if base.is_some() {
            path = PathBuf::from(base.unwrap()).push("/dateTheMap");
        } else if home_dir().is_none() {
            error!("No suitable directory found for linux.");
        }
        else {
            path = home_dir().unwrap().push("/dateTheMap");
        }

        #[cfg(target_os = "windows")]
        todo!()

        MapCacher { uri }
    }

    fn write_cache(tile: Bytes, coords: Coords) {
        todo!()
    }

    fn read_cache(coords: Coords) -> Bytes {
        todo!()
    }
}

impl Cache for MapCacher {
    async fn get_tile(&self, coords: Coords) -> Bytes {
        let Coords { x, y, z, path } = coords;
        let uri = self
            .uri
            .replace("{path}", &path)
            .replace("{z}", &z)
            .replace("{x}", &x)
            .replace("{y}", &y);
        reqwest::get(uri).await.unwrap().bytes().await.unwrap()
    }

    async fn force_get_tile(&self, coords: Coords) -> Bytes {
        todo!()
    }
}
