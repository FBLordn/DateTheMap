import { Theme } from "./Definitions";

type GameState = {
  total: number;
  round: number;
  score: number;
  world_map: WorldMapAPI;
}

type WorldMapAPI = {
    correct: number;
    html: string;
}

type Range = {
  lower_bound: any;
  upper_bound: any
}

type SettingsAPI = {
  sound_volume: number;
  music_volume: number;
  theme: Theme;
  cache_level: number;
}

export type { GameState, WorldMapAPI, Range, SettingsAPI};