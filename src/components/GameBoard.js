// src/components/GameBoard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RuleSelector from "./RuleSelector";
import GameArea from "./GameArea";
import Result from "./Result";
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
  const shapes = ["circle", "square", "star", "triangle"]; // Added new shapes
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const generateRandomLetter = (existingLetters) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const availableLetters = letters
    .split("")
    .filter((letter) => !existingLetters.includes(letter));
  const randomIndex = Math.floor(Math.random() * availableLetters.length);
  return availableLetters[randomIndex];
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

  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [glowEffect, setGlowEffect] = useState("");

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameOver) return;

    const shapeInterval = setInterval(() => {
      const existingLetters = shapes.map((shape) => shape.letter);
      const color = generateRandomColor();
      const shape = generateRandomShape();
      const letter = generateRandomLetter(existingLetters);
      const position = generateRandomPosition(1600, 500); // Adjust dimensions as needed
      const id = Math.random().toString(36).substring(2, 9); // Generate a unique ID for each shape
      dispatch(addShape({ id, color, shape, letter, ...position }));

      // Remove shape after 1 second if not typed
      setTimeout(() => {
        dispatch(removeShapeNoScore(id));
      }, 1000);
    }, rules.speed || 1000);

    return () => {
      clearInterval(shapeInterval);
    };
  }, [gameOver, rules.speed, rules.colors, rules.shapes, shapes, dispatch]);

  useEffect(() => {
    if (gameOver) return;

    const timerInterval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [gameOver, dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) return;

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
          setGlowEffect("glow-correct");
        } else {
          setMistakes((mistakes) => mistakes + 1);
          dispatch(decrementScore());
          setGlowEffect("glow-wrong");
        }
      } else {
        setMistakes((mistakes) => mistakes + 1);
        dispatch(decrementScore());
        setGlowEffect("glow-wrong");
      }

      // Remove the glow effect after a short delay
      setTimeout(() => setGlowEffect(""), 500);
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [gameOver, rules, shapes, dispatch]);

  const handleReset = () => {
    dispatch(resetGame());
    setMistakes(0);
    setGameOver(false);
  };

  return (
    <div className={`game-container ${glowEffect}`}>
      <div className="game-info">
        <h2>Score: {score}</h2>
        <h2>Time Left: {timeLeft} seconds</h2>
        <button onClick={handleReset}>Reset</button>
      </div>
      <RuleSelector />
      {gameOver ? (
        <Result score={score} mistakes={mistakes} onReset={handleReset} />
      ) : (
        <GameArea />
      )}
    </div>
  );
};

export default GameBoard;
