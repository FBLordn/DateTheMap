import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";

window.addEventListener('resize', function(event) {
  console.log(`w: ${window.innerWidth}`)
  console.log(`h: ${window.innerHeight}`)
}, true);

function App() {

  return (
    <GameLayout />
  );
}

export default App;
