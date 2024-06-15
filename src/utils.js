// src/utils.js
export const generateRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomShape = () => {
  const shapes = ["circle", "square", "star", "triangle"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

export const generateRandomLetter = (existingLetters) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const availableLetters = letters
    .split("")
    .filter((letter) => !existingLetters.includes(letter));
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
      x: Math.floor(Math.random() * (maxWidth - 120)),
      y: Math.floor(Math.random() * (maxHeight - 120)),
    };

    for (const existingPosition of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(existingPosition.x - position.x, 2) +
          Math.pow(existingPosition.y - position.y, 2)
      );
      if (distance < 120) {
        isOverlapping = true;
        break;
      }
    }
  } while (isOverlapping);

  return position;
};
