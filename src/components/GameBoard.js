// src/components/GameBoard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RuleSelector from "./RuleSelector";
import GameArea from "./GameArea";
import Result from "./Result";
import { decrementTime, resetGame } from "../features/game/gameSlice";
import {
  selectScore,
  selectTimeLeft,
  selectRules,
  selectShapes,
} from "../features/game/gameSelectors";
import { generateShape } from "../shapeGeneration";
import { handleKeyPress } from "../keypressHandler";

const GameBoard = () => {
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const timeLeft = useSelector(selectTimeLeft);
  const rules = useSelector(selectRules);
  const shapes = useSelector(selectShapes);

  const [mistakes, setMistakes] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalShapes, setTotalShapes] = useState(0); // Track total shapes displayed
  const [glowEffect, setGlowEffect] = useState("");

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameOver) return;

    const shapeInterval = setInterval(() => {
      generateShape(rules, dispatch, setTotalShapes, setMisses);
    }, rules.speed || 1000);

    return () => {
      clearInterval(shapeInterval);
    };
  }, [gameOver, rules, dispatch]);

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
    const keyPressHandler = (event) =>
      handleKeyPress(
        event,
        shapes,
        rules,
        gameOver,
        dispatch,
        setMistakes,
        setGlowEffect
      );
    window.addEventListener("keypress", keyPressHandler);

    return () => {
      window.removeEventListener("keypress", keyPressHandler);
    };
  }, [rules, shapes, dispatch, gameOver]);

  const handleReset = () => {
    dispatch(resetGame());
    setMistakes(0);
    setMisses(0);
    setTotalShapes(0); // Reset total shapes displayed
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
        <Result
          score={score}
          mistakes={mistakes}
          misses={misses}
          totalShapes={totalShapes}
          onReset={handleReset}
        />
      ) : (
        <GameArea />
      )}
    </div>
  );
};

export default GameBoard;
