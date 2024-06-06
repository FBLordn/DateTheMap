// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![warn(clippy::pedantic)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use game_state::GameState;
use std::sync::Mutex;

pub mod game_state;
pub mod map_api;
pub mod range;

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(GameState::default()))
        .invoke_handler(tauri::generate_handler![
            game_state::make_guess,
            game_state::new_round,
            game_state::reset,
            game_state::get_game_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
