// src/components/GameBoard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RuleSelector from "./RuleSelector";
import GameArea from "./GameArea";
import {
  addShape,
  removeShape,
  incrementScore,
  decrementScore,
  decrementTime,
  resetGame,
  removeShapeNoScore,
} from "../features/game/gameSlice";
import {
  selectScore,
  selectTimeLeft,
  selectRules,
  selectShapes,
} from "../features/game/gameSelectors";

const generateRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomShape = () => {
  const shapes = ["circle", "square"];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const generateRandomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

const generateRandomPosition = (maxWidth, maxHeight) => {
  const x = Math.floor(Math.random() * (maxWidth - 100));
  const y = Math.floor(Math.random() * (maxHeight - 100));
  return { x, y };
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const timeLeft = useSelector(selectTimeLeft);
  const rules = useSelector(selectRules);
  const shapes = useSelector(selectShapes);

  useEffect(() => {
    const shapeInterval = setInterval(() => {
      const color = generateRandomColor();
      const shape = generateRandomShape();
      const letter = generateRandomLetter();
      const position = generateRandomPosition(1600, 500); // Adjust dimensions as needed
      const id = Math.random().toString(36).substring(2, 9); // Generate a unique ID for each shape
      dispatch(addShape({ id, color, shape, letter, ...position }));

      // Remove shape after 1 second if not typed
      setTimeout(() => {
        dispatch(removeShapeNoScore(id));
      }, 1000);
    }, rules.speed || 1000);

    const timerInterval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(shapeInterval);
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(shapeInterval);
      clearInterval(timerInterval);
    };
  }, [timeLeft, dispatch, rules.speed]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key.toUpperCase();
      const matchingShape = shapes.find((shape) => shape.letter === letter);

      if (matchingShape) {
        const colorMatch =
          rules.colors.length === 0 ||
          rules.colors.includes(matchingShape.color);
        const shapeMatch =
          rules.shapes.length === 0 ||
          rules.shapes.includes(matchingShape.shape);

        if (colorMatch && shapeMatch) {
          dispatch(removeShape(letter));
          dispatch(incrementScore());
        } else {
          dispatch(decrementScore());
        }
      } else {
        dispatch(decrementScore());
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [rules, shapes, dispatch]);

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <h2>Score: {score}</h2>
        <h2>Time Left: {timeLeft} seconds</h2>
        <button onClick={handleReset}>Reset</button>
      </div>
      <RuleSelector />
      <GameArea />
    </div>
  );
};

export default GameBoard;
