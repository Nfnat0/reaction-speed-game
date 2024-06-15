// src/components/Result.js
import React from "react";

const Result = ({ score, mistakes, misses, totalShapes, onReset }) => {
  return (
    <div className="result-container">
      <h2>Game Over</h2>
      <p>Score: {score}</p>
      <p>Mistakes: {mistakes}</p>
      <p>Misses: {misses}</p>
      <p>Total Shapes Displayed: {totalShapes}</p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Result;
