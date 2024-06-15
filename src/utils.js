// src/utils.js
import { COLORS, SHAPES, LETTERS, MIN_DISTANCE } from "./constants";

export const generateRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const generateRandomShape = () => {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
};

export const generateRandomLetter = (existingLetters) => {
  const availableLetters = LETTERS.split("").filter(
    (letter) => !existingLetters.includes(letter)
  );
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
};

export const generateRandomPosition = (
  maxWidth,
  maxHeight,
  existingPositions
) => {
  let position;
  let isOverlapping;

  do {
    isOverlapping = false;
    position = {
      x: Math.floor(Math.random() * (maxWidth - MIN_DISTANCE)),
      y: Math.floor(Math.random() * (maxHeight - MIN_DISTANCE)),
    };

    for (const existingPosition of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(existingPosition.x - position.x, 2) +
          Math.pow(existingPosition.y - position.y, 2)
      );
      if (distance < MIN_DISTANCE) {
        isOverlapping = true;
        break;
      }
    }
  } while (isOverlapping);

  return position;
};
