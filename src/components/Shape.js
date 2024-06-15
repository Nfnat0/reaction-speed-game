// src/components/Shape.js
import React from "react";
import { FaCircle, FaSquare, FaStar, FaPlay } from "react-icons/fa"; // Import icons from react-icons

const shapeComponents = {
  circle: FaCircle,
  square: FaSquare,
  star: FaStar,
  triangle: FaPlay, // Using FaPlay to represent a triangle
};

const Shape = ({ color, shape, letter, x, y }) => {
  const ShapeComponent = shapeComponents[shape];

  const shapeStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    fontSize: "7rem",
    color: color,
  };

  return (
    <div style={shapeStyle}>
      <ShapeComponent />
      <div className="letter-overlay">{letter}</div>
    </div>
  );
};

export default Shape;
