use std::sync::Mutex;

use crate::map_api::WorldMap;
use tauri::State;

pub struct Range<A>
where
    A: std::cmp::Ord,
{
    lower_bound: A,
    upper_bound: A,
}

impl<A> Range<A>
where
    A: std::cmp::Ord,
{
    pub fn new(range: [A; 2]) -> Self
    where
        A: Copy,
    {
        Range {
            lower_bound: range[0].min(range[1]),
            upper_bound: range[0].max(range[1]),
        }
    }

    pub fn is_in_range(&self, value: &A) -> bool {
        value >= &self.lower_bound && value <= &self.upper_bound
    }
}

#[derive(Default)]
pub struct GameState {
    round: i8,
    score: i16,
    world_map: WorldMap,
}

impl GameState {
    #[must_use]
    pub fn get_round(&self) -> i8 {
        self.round
    }

    #[must_use]
    pub fn get_score(&self) -> i16 {
        self.score
    }

    #[must_use]
    pub fn calculate_score(&self, guess_range: &Range<i16>) -> i16 {
        if guess_range.is_in_range(&self.world_map.get_correct_year()) {
            2024 - (guess_range.upper_bound - guess_range.lower_bound)
        } else {
            0
        }
    }

    pub fn update_score(&mut self, guess: [i16; 2]) {
        self.score += self.calculate_score(&Range::new(guess));
    }

    pub fn end_round(&mut self, guess: [i16; 2]) -> i8 {
        self.round += 1;
        self.update_score(guess);
        self.round
    }

    pub fn new_round(&mut self) {
        self.world_map = WorldMap::default();
        self.world_map.get_map();
        //return HMTL element from get_map
    }

    pub fn reset(&mut self) {
        self.round = 0;
        self.score = 0;
    }
}

#[allow(clippy::must_use_candidate)]
#[tauri::command]
pub fn finish_round(guess: [i16; 2], state: State<Mutex<GameState>>) -> i8 {
    let mut game = state.lock().unwrap();
    game.end_round(guess)
}

#[tauri::command]
pub fn new_round(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.new_round();
}

#[tauri::command]
pub fn reset(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.reset();
}
