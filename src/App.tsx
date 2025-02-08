import type { FC } from "react";
import React from "react";

import Board from "./components/Board";
import "./App.css";

const App: FC = () => {
  return (
    <div>
      <h1 className="App">Connect Four</h1>
      <Board />
    </div>
  );
};

export default App;
