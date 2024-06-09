use crate::map_api::WorldMap;
use crate::range::Range;
use serde::Serialize;

/// Represents the game state
#[derive(Clone, Serialize)]
pub struct GameState {
    /// Round in which the ongoing game is in
    round: i8,
    /// Total score of all played rounds in the current game
    total: i16,
    /// Score of the round after a guess was made
    score: i16,
    /// Struct representing the world map
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

    /// Returns the score achieved by a given guess
    ///
    /// The score is lower the broader the guess is and 0 if the correct year is outside of the range
    #[must_use]
    pub fn calculate_score(&self, guess_range: &Range<i16>) -> i16 {
        if guess_range.is_in_range(&self.world_map.get_correct_year()) {
            2024 - (guess_range.upper_bound - guess_range.lower_bound)
        } else {
            0
        }
    }

    /// Updates the score and total based on the result of a given guess
    pub fn make_guess(&mut self, guess: [i16; 2]) {
        self.score = self.calculate_score(&Range::new(guess));
        self.total += self.score;
    }

    /// Updates the round, resets the score and gets a new world map
    pub fn new_round(&mut self) {
        self.round += 1;
        self.score = 0;
        self.world_map = WorldMap::default();
        self.world_map.get_map();
        //TODO return HMTL element from get_map
    }

    /// Resets the game state entirely
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
