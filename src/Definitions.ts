import { SettingsAPI } from "./ApiTypes";

enum Page {
    MENU,
    PLAYING,
    SETTINGS,
    INFO
}

enum Theme {
    Dark="Dark",
    Light="Light",
    System="System"
}

enum SettingType {
SOUND,
MUSIC,
THEME
}

const DEFAULTSETTINGS: SettingsAPI = {music_volume: 0.5, sound_volume:0.5, theme:Theme.System, cache_size:500_000_000}

export {Page, Theme, SettingType, DEFAULTSETTINGS};