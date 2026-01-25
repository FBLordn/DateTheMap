// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![warn(clippy::pedantic, missing_docs)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//! Backend for Date The Map
//!
//! Manages the game and internal data and handles events via an API exposed to the front end

use std::sync::Mutex;

mod cache;
use audio::provider::AUDIO_PROVIDER;
use settings::Settings;

mod audio;
mod embed;
mod file_manager;
mod logic;
mod settings;
mod tauri_api;
mod util;

#[tokio::main]
async fn main() {
    tokio::spawn(embed::server::start());
    let settings = Settings::pull_settings();
    println!("In rust-main: {settings:?}");

    AUDIO_PROVIDER.set_music_volume(settings.music_volume);
    AUDIO_PROVIDER.set_sound_volume(settings.sound_volume);

    AUDIO_PROVIDER.start_bg_music();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(logic::GameState::default()))
        .invoke_handler(tauri::generate_handler![
            tauri_api::make_guess,
            tauri_api::new_round,
            tauri_api::reset,
            tauri_api::get_game_state,
            tauri_api::get_possible_range,
            tauri_api::get_round_amount,
            tauri_api::set_music_volume,
            tauri_api::set_sound_volume,
            tauri_api::set_settings,
            tauri_api::get_settings,
            tauri_api::close_game,
            tauri_api::reset_cache
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
