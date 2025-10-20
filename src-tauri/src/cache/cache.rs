use std::{collections::HashMap, fs};

use serde::{Deserialize, Serialize};

use crate::{
    embed::server::Coords,
    file_manager::{FileManager, FileReadError, RequestType, osfs::CACHE_PATH},
    settings::Settings,
};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct MapCache {
    pub cached_map: HashMap<String, u32>,
    pub not_cached_map: HashMap<String, u32>,
}

impl MapCache {
    pub fn new() -> Self {
        if let Ok(map_cache) = FileManager::read(&RequestType::CacheFrequence) {
            map_cache
        } else {
            Self {
                cached_map: HashMap::new(),
                not_cached_map: HashMap::new(),
            }
        }
    }

    fn dir_size() -> Result<usize, FileReadError> {
        if let Ok(mut dir) = fs::read_dir(&*CACHE_PATH) {
            dir.try_fold(0, |acc, file| {
                if let Ok(file) = file
                    && let Ok(metadata) = file.metadata()
                {
                    Ok(acc + metadata.len() as usize)
                } else {
                    Ok(acc)
                }
            })
        } else {
            Err(FileReadError::Cache)
        }
    }

    fn cache_tile(mut self, coords: &Coords, tile: Vec<u8>) {
        let tilename = format!("{z}_{x}_{y}", z = coords.z, x = coords.x, y = coords.y);
        let cache_size = Settings::pull_settings().cache_size;
        let mut cache_entry = self.not_cached_map.remove(&tilename).unwrap_or(0);
        cache_entry += 1;
        let mut is_valid = cache_size.is_none() || tile.len() < cache_size.unwrap();
        while cache_size.is_some()
            && tile.len() + MapCache::dir_size().unwrap_or(cache_size.unwrap())
                >= cache_size.unwrap()
        {
            if let Some(min_tile) = self.cached_map.iter().min_by_key(|x| x.1) {
                if cache_entry > *min_tile.1 {
                    is_valid = false;
                    break;
                }
            } else {
                break;
            }
        }
        if is_valid {
            MapCache::write_cache(tile, coords);
            self.cached_map.insert(tilename, cache_entry);
        } else {
            self.not_cached_map.insert(tilename, cache_entry);
        }
    }

    async fn get_api_tile(coords: Coords) -> Vec<u8> {
        let Coords { x, y, z, path } = coords;
        let mut uri =
            "https://vtiles.openhistoricalmap.org/maps/{path}/{z}/{x}/{y}.pbf".to_string();
        uri = uri
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

    pub async fn get_tile(self, coords: Coords) -> Vec<u8> {
        if let Some(tile) = MapCache::read_cache(&coords) {
            tile
        } else {
            let tile = MapCache::get_api_tile(coords.clone()).await;
            self.cache_tile(&coords, tile.clone());
            tile
        }
    }

    fn write_cache(tile: Vec<u8>, coords: &Coords) {
        FileManager::write(&RequestType::OfflineMap(coords), tile);
    }

    fn read_cache(coords: &Coords) -> Option<Vec<u8>> {
        FileManager::read(&RequestType::OfflineMap(coords)).ok()
    }
}
