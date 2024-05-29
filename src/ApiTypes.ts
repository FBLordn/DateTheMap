import * as React from 'react';


type GameState = {
  score: number;
  round: number;
  worldMap: WorldMap;
}

type WorldMap = {
    correctYear: number;
}

export type { GameState, WorldMap };