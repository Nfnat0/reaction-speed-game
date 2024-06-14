// src/features/game/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shapes: [],
  score: 0,
  timeLeft: 30,
  rules: {
    colors: ["red"],
    shapes: ["circle", "square"],
    letters: [],
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addShape: (state, action) => {
      state.shapes.push(action.payload);
    },
    removeShape: (state, action) => {
      state.shapes = state.shapes.filter(
        (shape) => shape.letter !== action.payload
      );
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetGame: (state) => {
      state.shapes = [];
      state.score = 0;
      state.timeLeft = 30;
    },
    setRule: (state, action) => {
      state.rules[action.payload.type] = action.payload.value;
    },
    removeShapeNoScore: (state, action) => {
      state.shapes = state.shapes.filter(
        (shape) => shape.id !== action.payload
      );
    },
  },
});

export const {
  addShape,
  removeShape,
  incrementScore,
  decrementTime,
  resetGame,
  setRule,
  removeShapeNoScore,
} = gameSlice.actions;

export default gameSlice.reducer;
