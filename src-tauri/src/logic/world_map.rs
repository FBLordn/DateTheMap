use std::fmt::Debug;

use rand::Rng;
use serde::Serialize;

use crate::{logic::world_map_backend::MapInterface, util::Range};

#[derive(Debug, Clone)]
/// Represents a world map
pub struct WorldMap {
    /// Correct year of the shown world map
    pub correct: i16,
    /// Range of years map can be from
    pub range: Range<i16>,
    /// Interface for world map
    pub interface: Box<dyn MapInterface>,
}

impl WorldMap {
    pub fn new(range: Range<i16>, interface: Box<dyn MapInterface + Send>) -> Self {
        Self {
            range,
            correct: rand::thread_rng().gen_range(range.lower_bound..=range.upper_bound),
            interface,
        }
    }

    pub fn get_map(&self) -> Vec<u8> {
        todo!("implement API call and return HTML element");
    }
}

#[derive(Debug, Serialize)]
pub struct WorldMapToTS {
    pub correct: i16,
    pub range: Range<i16>,
}

impl From<WorldMap> for WorldMapToTS {
    fn from(value: WorldMap) -> Self {
        WorldMapToTS {
            correct: value.correct,
            range: value.range,
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        logic::game_state::{MAXIMUM_YEAR, MINIMUM_YEAR},
        logic::world_map_backend::Test,
    };

    use super::*;

    fn test_get_map_returns_png() {
        let world_map = WorldMap::new(
            Range::new([MINIMUM_YEAR, MAXIMUM_YEAR]),
            Box::new(Test::default()),
        );
        let map = world_map.get_map();
        png::Decoder::new(map).unwrap();
    }
}
