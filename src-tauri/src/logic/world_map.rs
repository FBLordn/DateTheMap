use std::fmt::Debug;

use rand::Rng;

use crate::{logic::world_map_backend::MapInterface, util::Range};

#[derive(Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default)]
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
            correct: rand::thread_rng().gen_range(range.lower_bound..=range.upper_bound),
            range,
            interface,
        }
    }

    pub fn get_map(&self) -> Vec<u8> {
        return self.interface.get_raw_map(self.range);
    }
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default)]
pub struct WorldMapToJS {
    pub correct: i16,
    pub range: Range<i16>,
}

impl From<WorldMap> for WorldMapToJS {
    fn from(value: WorldMap) -> Self {
        WorldMapToJS {
            correct: value.correct,
            range: value.range,
        }
    }
}

#[cfg(test)]
mod tests {
    use std::io::Cursor;

    use crate::{
        logic::game_state::{MAXIMUM_YEAR, MINIMUM_YEAR},
        logic::world_map_backend::Test,
    };

    use super::*;

    #[test]
    fn test_get_map_returns_png() {
        let world_map = WorldMap::new(
            Range::new([MINIMUM_YEAR, MAXIMUM_YEAR]),
            Box::<Test>::default(),
        );
        let map = world_map.get_map();
        png::Decoder::new(Cursor::new(map));
    }
}
