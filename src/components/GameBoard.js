// src/components/GameBoard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RuleSelector from "./RuleSelector";
import GameArea from "./GameArea";
import {
  addShape,
  removeShape,
  incrementScore,
  decrementTime,
  resetGame,
  removeShapeNoScore,
} from "../features/game/gameSlice";
import {
  selectScore,
  selectTimeLeft,
  selectRules,
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
  const x = Math.floor(Math.random() * (maxWidth - 50));
  const y = Math.floor(Math.random() * (maxHeight - 50));
  return { x, y };
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const timeLeft = useSelector(selectTimeLeft);
  const rules = useSelector(selectRules);

  useEffect(() => {
    const shapeInterval = setInterval(() => {
      const color = generateRandomColor();
      const shape = generateRandomShape();
      const letter = generateRandomLetter();
      const position = generateRandomPosition(1200, 600); // Adjust dimensions as needed
      const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID for each shape
      dispatch(addShape({ id, color, shape, letter, ...position }));

      // Remove shape after 1 second if not typed
      setTimeout(() => {
        dispatch(removeShapeNoScore(id));
      }, 1000);
    }, 1000);

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
  }, [timeLeft, dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key.toUpperCase();
      if (rules.letters.includes(letter)) {
        dispatch(removeShape(letter));
        dispatch(incrementScore());
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [rules.letters, dispatch]);

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
