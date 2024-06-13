// src/features/game/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circles: [],
  score: 0,
  timeLeft: 30,
  rule: "red",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addCircle: (state, action) => {
      state.circles.push(action.payload);
    },
    removeCircle: (state, action) => {
      state.circles = state.circles.filter(
        (_, index) => index !== action.payload
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
      state.circles = [];
      state.score = 0;
      state.timeLeft = 30;
    },
    setRule: (state, action) => {
      state.rule = action.payload;
    },
  },
});

export const {
  addCircle,
  removeCircle,
  incrementScore,
  decrementTime,
  resetGame,
  setRule,
} = gameSlice.actions;

export default gameSlice.reducer;
