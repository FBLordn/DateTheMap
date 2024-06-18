type GameState = {
  total: number;
  round: number;
  score: number;
  round_amount: number;
  world_map: WorldMapAPI;
}

type WorldMapAPI = {
    correct: number;
    min: number;
    max: number;
}

export type { GameState, WorldMapAPI};