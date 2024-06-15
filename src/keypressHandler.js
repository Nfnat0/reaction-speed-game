// src/keypressHandler.js
import { removeShape, incrementScore } from "./features/game/gameSlice";

export const handleKeyPress = (
  event,
  shapes,
  rules,
  gameOver,
  dispatch,
  setMistakes,
  setGlowEffect
) => {
  if (gameOver) return;

  const letter = event.key.toUpperCase();
  const matchingShape = shapes.find((shape) => shape.letter === letter);

  if (matchingShape) {
    const colorMatch =
      rules.colors.length === 0 || rules.colors.includes(matchingShape.color);
    const shapeMatch =
      rules.shapes.length === 0 || rules.shapes.includes(matchingShape.shape);

    if (colorMatch && shapeMatch) {
      dispatch(removeShape(letter));
      dispatch(incrementScore());
      setGlowEffect("glow-correct");
    } else {
      setMistakes((mistakes) => mistakes + 1);
      setGlowEffect("glow-wrong");
    }
  } else {
    setMistakes((mistakes) => mistakes + 1);
    setGlowEffect("glow-wrong");
  }

  // Remove the glow effect after a short delay
  setTimeout(() => setGlowEffect(""), 500);
};
