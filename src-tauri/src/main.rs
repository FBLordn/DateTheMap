// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![warn(clippy::pedantic, missing_docs)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//! Backend for Date The Map
//!
//! Manages the game and internal data and handles events via an API exposed to the front end

use std::sync::Mutex;

mod embed;
mod logic;
mod tauri_api;
mod util;

#[tokio::main]
async fn main() {
    tokio::spawn(embed::server::start());

    tauri::Builder::default()
        .manage(Mutex::new(logic::GameState::default()))
        .invoke_handler(tauri::generate_handler![
            tauri_api::make_guess,
            tauri_api::new_round,
            tauri_api::reset,
            tauri_api::get_game_state,
            tauri_api::get_possible_range,
            tauri_api::get_round_amount
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
