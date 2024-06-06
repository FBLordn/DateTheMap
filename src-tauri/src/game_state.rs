use crate::map_api::WorldMap;
use crate::range::Range;
use serde::Serialize;

#[derive(Clone, Serialize)]
pub struct GameState {
    round: i8,
    total: i16,
    score: i16,
    pub world_map: WorldMap,
}

impl GameState {
    #[must_use]
    pub fn get_round(&self) -> i8 {
        self.round
    }

    #[must_use]
    pub fn get_score(&self) -> i16 {
        self.total
    }

    #[must_use]
    pub fn calculate_score(&self, guess_range: &Range<i16>) -> i16 {
        if guess_range.is_in_range(&self.world_map.get_correct_year()) {
            2024 - (guess_range.upper_bound - guess_range.lower_bound)
        } else {
            0
        }
    }

    pub fn make_guess(&mut self, guess: [i16; 2]) {
        self.score = self.calculate_score(&Range::new(guess));
        self.total += self.score;
    }

    pub fn new_round(&mut self) {
        self.round += 1;
        self.score = 0;
        self.world_map = WorldMap::default();
        self.world_map.get_map();
        //return HMTL element from get_map
    }

    pub fn reset(&mut self) {
        self.round = 1;
        self.total = 0;
        self.score = 0;
    }
}

impl Default for GameState {
    fn default() -> Self {
        Self {
            round: 1,
            score: 0,
            total: 0,
            world_map: WorldMap::default(),
        }
    }
}
