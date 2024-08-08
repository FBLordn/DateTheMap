use std::{fmt::Debug, hash::Hash};

use serde::Serialize;

use crate::{logic::world_map_backend::MapInterface, util::Range};

use super::{
    game_state::{MAXIMUM_YEAR, MINIMUM_YEAR},
    world_map_backend::InterfaceReturn,
};

/// Represents a world map
#[derive(Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default, Serialize)]
pub struct WorldMap<I>
where
    I: MapInterface,
{
    /// Correct year of the shown world map
    pub correct: i16,
    /// Interface for world map
    pub interface: I,
    /// html element of the map
    pub html: String,
}

impl<I> WorldMap<I>
where
    I: MapInterface,
{
    pub fn new(interface: I) -> Self {
        let round: InterfaceReturn =
            interface.get_raw_map(Range::new([MINIMUM_YEAR, MAXIMUM_YEAR]));
        Self {
            html: round.html,
            correct: round.correct_year,
            interface,
        }
    }

    pub fn get_map(&mut self) {
        let response: InterfaceReturn = self
            .interface
            .get_raw_map(Range::new([MINIMUM_YEAR, MAXIMUM_YEAR]));
        self.correct = response.correct_year;
        self.html = response.html;
    }
}

#[derive(Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default, Serialize)]
pub struct WorldMapToJS {
    pub correct: i16,
    pub html: String,
}

impl<I> From<WorldMap<I>> for WorldMapToJS
where
    I: MapInterface,
{
    fn from(value: WorldMap<I>) -> Self {
        WorldMapToJS {
            correct: value.correct,
            html: value.html,
        }
    }
}

#[cfg(test)]
mod tests {

    use crate::logic::world_map_backend::OHMLibrary;

    use super::*;

    #[test]
    fn test_get_map_returns_html() {
        let world_map = WorldMap::new(OHMLibrary::default());
        assert!(tl::parse(&world_map.html, tl::ParserOptions::default()).is_ok());
    }
}
