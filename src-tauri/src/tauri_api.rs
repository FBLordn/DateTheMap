use std::sync::{Mutex, MutexGuard};

use tauri::State;

use crate::logic::{GameState, GameStateToJS};

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub fn make_guess(guess: [i16; 2], state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.make_guess(guess);
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub fn new_round(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.new_round();
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub fn reset(state: State<Mutex<GameState>>) {
    let mut game = state.lock().unwrap();
    game.reset();
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub fn get_game_state(state: State<Mutex<GameState>>) -> GameStateToJS {
    let game = state.lock().unwrap();
    game.clone().into()
}
