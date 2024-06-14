// src/features/game/gameSelectors.js
export const selectShapes = (state) => state.game.shapes;
export const selectScore = (state) => state.game.score;
export const selectTimeLeft = (state) => state.game.timeLeft;
export const selectRules = (state) => state.game.rules;
