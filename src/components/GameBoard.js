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

const GameBoard = () => {
  const dispatch = useDispatch();
  const circles = useSelector(selectCircles);
  const score = useSelector(selectScore);
  const timeLeft = useSelector(selectTimeLeft);
  const rule = useSelector(selectRule);

  useEffect(() => {
    const circleInterval = setInterval(() => {
      dispatch(addCircle(generateRandomColor()));
    }, 1000);

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

  return (
    <div>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft} seconds</h2>
      <div>
        {circles.map((color, index) => (
          <Circle
            key={index}
            color={color}
            onClick={() => handleCircleClick(index, color)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
