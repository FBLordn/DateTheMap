use crate::map_api::WorldMap;
use crate::range::Range;
use serde::Serialize;

/// Represents the game state
#[derive(Clone, Serialize)]
pub struct GameState {
    /// Round in which the ongoing game is in
    pub round: i8,
    /// Total score of all played rounds in the current game
    pub total: i16,
    /// Score of the round after a guess was made
    pub score: i16,
    /// Struct representing the world map
    pub world_map: WorldMap,
}

impl GameState {
    /// Returns the score achieved by a given guess
    ///
    /// The score is lower the broader the guess is and 0 if the correct year is outside of the range
    #[must_use]
    pub fn calculate_score(&self, guess_range: &Range<i16>) -> i16 {
        if guess_range.is_in_range(&self.world_map.correct_year) {
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
        //self.world_map.get_map();
        //todo!("return HMTL element from get_map");
    }

    /// Resets the game state entirely
    pub fn reset(&mut self) {
        *self = GameState::default();
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calculate_score() {
        let game_state = GameState::default();
        let wrong_guess_over = Range::new([
            game_state.world_map.correct_year + 7,
            game_state.world_map.correct_year + 3642,
        ]);
        let wrong_guess_under = Range::new([
            game_state.world_map.correct_year - 3,
            game_state.world_map.correct_year - 6,
        ]);
        let correct_guess = Range::new([
            game_state.world_map.correct_year - 39,
            game_state.world_map.correct_year + 10,
        ]);
        assert_eq!(game_state.calculate_score(&wrong_guess_over), 0);
        assert_eq!(game_state.calculate_score(&wrong_guess_under), 0);
        assert!(game_state.calculate_score(&correct_guess) > 0);
    }

    #[test]
    fn test_make_guess() {
        let mut game_state = GameState {
            total: 42,
            ..Default::default()
        };
        let correct_guess = Range::new([
            game_state.world_map.correct_year - 39,
            game_state.world_map.correct_year + 10,
        ]);
        let score = game_state.calculate_score(&correct_guess);
        game_state.make_guess([correct_guess.lower_bound, correct_guess.upper_bound]);
        assert_eq!(score, game_state.score);
        assert_eq!(score, game_state.total - 42);
    }
}
