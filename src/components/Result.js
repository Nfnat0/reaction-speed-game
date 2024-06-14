// src/components/Result.js
import React from "react";

const Result = ({ score, mistakes, misses, onReset }) => {
  return (
    <div className="result-container">
      <h2>Game Over</h2>
      <p>Score: {score}</p>
      <p>Mistakes: {mistakes}</p>
      <p>Misses: {misses}</p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Result;
