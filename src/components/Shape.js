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
    fontSize: "3.5rem",
    color: "#fff",
    textShadow: "4px 4px 6px rgba(0, 0, 0, 1)",
    border: shape === "circle" ? "2px solid #fff" : "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease",
  };

  return (
    <div id={id} style={shapeStyle}>
      {letter}
    </div>
  );
};

export default Shape;
