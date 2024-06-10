type GameState = {
  total: number;
  round: number;
  score: number;
  world_map: WorldMapAPI;
}

type WorldMapAPI = {
    correct_year: number;
}

export type { GameState, WorldMapAPI};