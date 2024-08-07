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

export type { GameState, WorldMapAPI, Range};