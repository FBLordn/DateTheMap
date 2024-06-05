use std::sync::Mutex;

use crate::map_api::WorldMap;
use serde::Serialize;
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

#[derive(Clone, Serialize)]
pub struct GameState {
    round: i8,
    total: i16,
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
        self.total
    }

    #[must_use]
    pub fn get_score_of_round(&self) -> i16 {
        self.score
    }

    #[must_use]
    pub fn calculate_score(&self, guess_range: &Range<i16>) -> i16 {
        println!(
            "Range: {}-{}, Year: {}",
            guess_range.lower_bound,
            guess_range.upper_bound,
            &self.world_map.get_correct_year()
        );
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

#[allow(clippy::must_use_candidate)]
#[tauri::command]
pub fn make_guess(guess: [i16; 2], state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.make_guess(guess);
    println!(
        "Round: {}, Score: {}, Year: {}",
        game.get_round(),
        game.get_score(),
        game.world_map.get_correct_year()
    );
}

#[allow(clippy::must_use_candidate)]
#[tauri::command]
pub fn new_round(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.new_round();
}

#[allow(clippy::must_use_candidate)]
#[tauri::command]
pub fn reset(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.reset();
}

#[allow(clippy::must_use_candidate)]
#[tauri::command]
pub fn get_game_state(state: State<Mutex<GameState>>) -> GameState {
    let game = state.lock().unwrap();
    game.clone()
}
