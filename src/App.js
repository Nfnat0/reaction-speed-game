// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Reaction Speed Game</h1>
        <GameBoard />
      </div>
    </Provider>
  );
}

export default App;
