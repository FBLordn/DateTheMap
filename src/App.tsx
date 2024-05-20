import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GameLayout from "./GameLayout.tsx";

function App() {

  return (
    <GameLayout />
  );
}

export default App;
