// src/components/GameBoard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Circle from "./Circle";
import {
  addCircle,
  removeCircle,
  incrementScore,
  decrementTime,
  resetGame,
  setRule,
} from "../features/game/gameSlice";
import {
  selectCircles,
  selectScore,
  selectTimeLeft,
  selectRule,
} from "../features/game/gameSelectors";

const generateRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomPosition = (maxWidth, maxHeight) => {
  const x = Math.floor(Math.random() * (maxWidth - 50));
  const y = Math.floor(Math.random() * (maxHeight - 50));
  return { x, y };
};

const GameBoard = () => {
  const dispatch = useDispatch();
  const circles = useSelector(selectCircles);
  const score = useSelector(selectScore);
  const timeLeft = useSelector(selectTimeLeft);
  const rule = useSelector(selectRule);

  useEffect(() => {
    const circleInterval = setInterval(() => {
      const color = generateRandomColor();
      const position = generateRandomPosition(1200, 600); // Adjust dimensions as needed
      dispatch(addCircle({ color, ...position }));
    }, 300);

    const timerInterval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(circleInterval);
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(circleInterval);
      clearInterval(timerInterval);
    };
  }, [timeLeft, dispatch]);

  const handleCircleClick = (index, color) => {
    if (color === rule) {
      dispatch(incrementScore());
    }
    dispatch(removeCircle(index));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const handleRuleChange = (event) => {
    dispatch(setRule(event.target.value));
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <h2>Score: {score}</h2>
        <h2>Time Left: {timeLeft} seconds</h2>
        <button onClick={handleReset}>Reset</button>
        <div>
          <label htmlFor="rule-select">Select Rule: </label>
          <select id="rule-select" onChange={handleRuleChange} value={rule}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
      </div>
      <div className="game-area">
        {circles.map(({ color, x, y }, index) => (
          <Circle
            key={index}
            color={color}
            x={x}
            y={y}
            onClick={() => handleCircleClick(index, color)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
