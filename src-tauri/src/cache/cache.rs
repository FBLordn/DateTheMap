use crate::{
    embed::server::Coords,
    file_manager::{FileManager, RequestType},
    settings::Settings,
};

#[derive(Debug, Clone)]
pub struct MapCache {
    pub uri: String,
}

impl MapCache {
    async fn get_api_tile(&self, coords: Coords) -> Vec<u8> {
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

    pub async fn get_tile(&self, coords: Coords) -> Vec<u8> {
        if let Some(tile) = MapCache::read_cache(&coords) {
            tile
        } else {
            let tile = MapCache::get_api_tile(self, coords.clone()).await;
            if coords.x.parse::<i8>().unwrap_or(i8::MAX) <= Settings::pull_settings().cache_level {
                MapCache::write_cache(tile.clone(), &coords);
            }
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
