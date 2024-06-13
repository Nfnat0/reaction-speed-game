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
  setRules,
} from "../features/game/gameSlice";
import {
  selectCircles,
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

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const generateRandomAlphabet = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabets[Math.floor(Math.random() * alphabets.length)];
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
  const rules = useSelector(selectRules);

  useEffect(() => {
    const circleInterval = setInterval(() => {
      const color = generateRandomColor();
      const shape = generateRandomShape();
      const number = generateRandomNumber();
      const alphabet = generateRandomAlphabet();
      const position = generateRandomPosition(1200, 600); // Adjust dimensions as needed
      dispatch(addCircle({ color, shape, number, alphabet, ...position }));
    }, 700);

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

  const handleCircleClick = (index, circle) => {
    const { color, shape, number, alphabet } = circle;
    const { colors, shapes, numbers, alphabets } = rules;

    const colorMatch = colors.length === 0 || colors.includes(color);
    const shapeMatch = shapes.length === 0 || shapes.includes(shape);
    const numberMatch = numbers.length === 0 || numbers.includes(number);
    const alphabetMatch =
      alphabets.length === 0 || alphabets.includes(alphabet);

    if (colorMatch && shapeMatch && numberMatch && alphabetMatch) {
      dispatch(incrementScore());
    }
    dispatch(removeCircle(index));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  const handleRuleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      setRules({
        ...rules,
        [name]: value.split(","),
      })
    );
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <h2>Score: {score}</h2>
        <h2>Time Left: {timeLeft} seconds</h2>
        <button onClick={handleReset}>Reset</button>
        <div>
          <label htmlFor="colors">Colors: </label>
          <input
            id="colors"
            name="colors"
            onChange={handleRuleChange}
            placeholder="red,blue,..."
          />
          <label htmlFor="shapes">Shapes: </label>
          <input
            id="shapes"
            name="shapes"
            onChange={handleRuleChange}
            placeholder="circle,square,..."
          />
          <label htmlFor="numbers">Numbers: </label>
          <input
            id="numbers"
            name="numbers"
            onChange={handleRuleChange}
            placeholder="0,1,2,..."
          />
          <label htmlFor="alphabets">Alphabets: </label>
          <input
            id="alphabets"
            name="alphabets"
            onChange={handleRuleChange}
            placeholder="A,B,C,..."
          />
        </div>
      </div>
      <div className="game-area">
        {circles.map((circle, index) => (
          <Circle
            key={index}
            {...circle}
            onClick={() => handleCircleClick(index, circle)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
