use rand::Rng;
use serde::Serialize;

/// Represents a world map
#[derive(Clone, Serialize)]
pub struct WorldMap {
    /// Correct year of the shown world map
    pub correct: i16,
    /// Minimum year map can be from
    pub min: i16,
    /// Maximum year map can be from
    pub max: i16,
}

impl WorldMap {
    pub fn get_map(&self) {
        todo!("implement API call and return HTML element");
    }
}

impl Default for WorldMap {
    fn default() -> Self {
        Self {
            min: 1500,
            max: 2024,
            correct: rand::thread_rng().gen_range(1500..2025),
        }
    }
}
