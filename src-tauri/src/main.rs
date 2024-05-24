// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![warn(clippy::pedantic)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub mod map_api;
pub mod stats;

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
