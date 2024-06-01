type GameState = {
  total: number;
  round: number;
  score: number;
  worldMap: WorldMap;
}

type WorldMap = {
    correctYear: number;
}

export type { GameState, WorldMap };