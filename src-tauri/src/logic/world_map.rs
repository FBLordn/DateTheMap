use std::{fmt::Debug, hash::Hash};

use rand::Rng;
use serde::Serialize;

use crate::{logic::world_map_backend::MapInterface, util::Range};

/// Represents a world map
#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default, Serialize)]
pub struct WorldMap<I>
where
    I: MapInterface,
{
    /// Correct year of the shown world map
    pub correct: i16,
    /// Range of years map can be from
    pub range: Range<i16>,
    /// Interface for world map
    pub interface: I,
}

impl<I> WorldMap<I>
where
    I: MapInterface,
{
    pub fn new(range: Range<i16>, interface: I) -> Self {
        Self {
            correct: rand::thread_rng().gen_range(range.lower_bound..=range.upper_bound),
            range,
            interface,
        }
    }

    pub fn get_map(&self) -> Vec<u8> {
        self.interface.get_raw_map(self.range)
    }
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default, Serialize)]
pub struct WorldMapToJS {
    pub correct: i16,
    pub range: Range<i16>,
}

impl<I> From<WorldMap<I>> for WorldMapToJS
where
    I: MapInterface,
{
    fn from(value: WorldMap<I>) -> Self {
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
        let world_map = WorldMap::new(Range::new([MINIMUM_YEAR, MAXIMUM_YEAR]), Test::default());
        let map = world_map.get_map();
        png::Decoder::new(Cursor::new(map));
    }
}
