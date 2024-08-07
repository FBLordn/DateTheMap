type GameState = {
  total: number;
  round: number;
  score: number;
  round_amount: number;
  world_map: WorldMapAPI;
}

type WorldMapAPI = {
    correct: number;
    range: Range;
}

type Range = {
  lower_bound: any;
  upper_bound: any
}

export type { GameState, WorldMapAPI};