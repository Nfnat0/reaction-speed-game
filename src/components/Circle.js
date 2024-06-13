// src/components/Circle.js
import React from "react";

const Circle = ({ color, onClick }) => {
  const circleStyle = {
    backgroundColor: color,
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "inline-block",
    margin: "10px",
  };

  return <div style={circleStyle} onClick={onClick}></div>;
};

export default Circle;
