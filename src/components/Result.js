// src/components/Result.js
import React from "react";

const Result = ({ score, mistakes, misses, totalShapes, onReset }) => {
  return (
    <div className="result-container">
      <h2>Game Over</h2>
      <div className="result-table">
        <table>
          <tbody>
            <tr>
              <td>Score</td>
              <td>{score}</td>
            </tr>
            <tr>
              <td>Mistakes</td>
              <td>{mistakes}</td>
            </tr>
            <tr>
              <td>Misses</td>
              <td>{misses}</td>
            </tr>
            <tr>
              <td>Total Shapes</td>
              <td>{totalShapes}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};

export default Result;
