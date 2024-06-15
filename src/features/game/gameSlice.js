// src/features/game/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { TIME_LEFT } from "../../constants";

const initialState = {
  shapes: [],
  score: 0,
  timeLeft: TIME_LEFT,
  rules: {
    colors: ["red"],
    shapes: ["circle", "square"],
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
    removeShapeNoScore: (state, action) => {
      state.shapes = state.shapes.filter(
        (shape) => shape.id !== action.payload
      );
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    decrementScore: (state) => {
      state.score -= 1;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetGame: (state) => {
      state.shapes = [];
      state.score = 0;
      state.timeLeft = TIME_LEFT;
    },
    setRule: (state, action) => {
      state.rules[action.payload.type] = action.payload.value;
    },
  },
});

export const {
  addShape,
  removeShape,
  removeShapeNoScore,
  incrementScore,
  decrementScore,
  decrementTime,
  resetGame,
  setRule,
} = gameSlice.actions;

export default gameSlice.reducer;
