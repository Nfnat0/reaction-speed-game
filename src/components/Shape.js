// src/components/Shape.js
const Shape = ({ id, color, shape, letter, x, y }) => {
  const shapeStyle = {
    backgroundColor: color,
    borderRadius: shape === "circle" ? "50%" : "0",
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    fontSize: "3rem",
    color: "#333",
  };

  return (
    <div id={id} style={shapeStyle}>
      {letter}
    </div>
  );
};

export default Shape;
