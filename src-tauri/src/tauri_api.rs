use std::sync::Mutex;

use tauri::State;

use crate::{
    audio::provider::AUDIO_PROVIDER,
    logic::{GameState, GameStateToJS, MAXIMUM_YEAR, MINIMUM_YEAR, ROUND_AMOUNT},
    util::Range,
};

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

#[tauri::command]
pub fn get_possible_range() -> Range<i16> {
    Range::new([MINIMUM_YEAR, MAXIMUM_YEAR])
}

#[tauri::command]
pub fn get_round_amount() -> i8 {
    ROUND_AMOUNT
}

#[tauri::command]
pub fn set_music_volume(volume: f32) {
    AUDIO_PROVIDER.set_music_volume(volume);
}

#[tauri::command]
pub fn set_sound_volume(volume: f32) {
    AUDIO_PROVIDER.set_sound_volume(volume);
    AUDIO_PROVIDER.success();
}
