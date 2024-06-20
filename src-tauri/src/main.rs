// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![warn(clippy::pedantic, missing_docs)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//! Backend for Date The Map
//!
//! Manages the game and internal data and handles events via an API exposed to the front end

use game_state::GameState;
use std::sync::Mutex;

mod game_state;
mod range;
mod tauri_api;
mod world_map;
mod world_map_backend;

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(GameState::default()))
        .invoke_handler(tauri::generate_handler![
            tauri_api::make_guess,
            tauri_api::new_round,
            tauri_api::reset,
            tauri_api::get_game_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
