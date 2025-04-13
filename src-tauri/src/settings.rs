use super::FileManager::FileManager;

pub enum Theme {
    Dark,
    Light,
    System,
}

pub struct Settings {
    theme: Theme,
    sound_volume: f32,
    music_volume: f32,
}

impl Settings {
    fn write_theme() {}

    fn write_sound() {}

    fn write_music() {}

    fn read_theme() {}

    fn read_sound() {}

    fn read_music() {}
}
