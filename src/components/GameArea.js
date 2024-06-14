// src/components/GameArea.js
import React from "react";
import { useSelector } from "react-redux";
import Shape from "./Shape";
import { selectShapes } from "../features/game/gameSelectors";

const GameArea = () => {
  const shapes = useSelector(selectShapes);

  return (
    <div className="game-area">
      {shapes.map((shape, index) => (
        <Shape key={index} {...shape} />
      ))}
    </div>
  );
};

export default GameArea;
