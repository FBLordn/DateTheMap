use std::sync::Mutex;

use tauri::State;

use crate::game_state::GameState;

#[allow(clippy::needless_pass_by_value)]
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
pub fn get_game_state(state: State<Mutex<GameState>>) -> GameState {
    let game = state.lock().unwrap();
    game.clone()
}
