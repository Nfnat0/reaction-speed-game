// src/components/Result.js
import React from "react";

const Result = ({ score, mistakes, onReset }) => {
  return (
    <div className="result-container">
      <h2>Game Over</h2>
      <p>Score: {score}</p>
      <p>Mistakes: {mistakes}</p>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Result;
