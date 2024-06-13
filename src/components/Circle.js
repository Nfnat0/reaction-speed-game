// src/components/Circle.js
import React from "react";

const Circle = ({ color, shape, number, alphabet, onClick, x, y }) => {
  const circleStyle = {
    backgroundColor: color || "transparent",
    borderRadius: shape === "circle" ? "50%" : "0",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div style={circleStyle} onClick={onClick}>
      {number || alphabet}
    </div>
  );
};

export default Circle;
