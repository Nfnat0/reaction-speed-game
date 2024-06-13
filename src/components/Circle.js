// src/components/Circle.js
import React from "react";

const Circle = ({ color, onClick, x, y }) => {
  const circleStyle = {
    backgroundColor: color,
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
  };

  return <div style={circleStyle} onClick={onClick}></div>;
};

export default Circle;
