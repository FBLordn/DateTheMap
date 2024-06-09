use rand::Rng;
use serde::Serialize;

/// Represents a world map
#[derive(Clone, Serialize)]
pub struct WorldMap {
    /// Correct year of the shown world map
    pub correct_year: i16,
}

impl WorldMap {
    pub fn get_map(&self) {
        todo!("implement API call and return HTML element");
    }
}

impl Default for WorldMap {
    fn default() -> Self {
        Self {
            correct_year: rand::thread_rng().gen_range(1500..2025),
        }
    }
}
