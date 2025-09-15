use serde::{Deserialize, Serialize};

use crate::file_manager::{FileManager, RequestType};

#[derive(Debug, Serialize, Deserialize, Default)]
pub enum Theme {
    Dark,
    Light,
    #[default]
    System,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    pub theme: Theme,
    pub sound_volume: f32,
    pub music_volume: f32,
}

impl Settings {
    pub fn push_settings(self) {
        println!("{self:?}");
        FileManager::write(&RequestType::Config, self);
    }

    pub fn pull_settings() -> Settings {
        FileManager::read(&RequestType::Config).unwrap_or_default()
    }
}

impl Default for Settings {
    fn default() -> Settings {
        Settings {
            theme: Theme::default(),
            sound_volume: 0.5,
            music_volume: 0.5,
        }
    }
}
