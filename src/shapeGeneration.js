// src/shapeGeneration.js
import { store } from "./app/store";
import { addShape, removeShapeNoScore } from "./features/game/gameSlice";
import {
  generateRandomColor,
  generateRandomShape,
  generateRandomLetter,
  generateRandomPosition,
} from "./utils";

export const generateShape = (rules, dispatch, setTotalShapes, setMisses) => {
  const existingLetters = store
    .getState()
    .game.shapes.map((shape) => shape.letter);
  const color = generateRandomColor();
  const shape = generateRandomShape();
  const letter = generateRandomLetter(existingLetters);
  const existingPositions = store.getState().game.shapes.map((shape) => ({
    x: shape.x,
    y: shape.y,
  }));
  const position = generateRandomPosition(1600, 500, existingPositions); // Adjust dimensions as needed
  const id = Math.random().toString(36).substring(2, 9); // Generate a unique ID for each shape
  dispatch(addShape({ id, color, shape, letter, ...position }));
  setTotalShapes((totalShapes) => totalShapes + 1); // Increment total shapes displayed

  setTimeout(() => {
    const currentShapes = store.getState().game.shapes; // Access the updated shapes directly from the store
    const matchingShape = currentShapes.find((s) => s.id === id);
    if (matchingShape) {
      const colorMatch =
        rules.colors.length === 0 || rules.colors.includes(matchingShape.color);
      const shapeMatch =
        rules.shapes.length === 0 || rules.shapes.includes(matchingShape.shape);
      if (colorMatch && shapeMatch) {
        setMisses((misses) => misses + 1);
      }
    }
    dispatch(removeShapeNoScore(id));
  }, 1000);
};
