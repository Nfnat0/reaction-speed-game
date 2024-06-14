// src/components/RuleSelector.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRule } from "../features/game/gameSlice";
import { selectRules } from "../features/game/gameSelectors";

const RuleSelector = () => {
  const dispatch = useDispatch();
  const rules = useSelector(selectRules);

  const handleRuleToggle = (type, value) => {
    const currentValues = rules[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    dispatch(setRule({ type, value: newValues }));
  };

  const speeds = [500, 1000, 1500]; // Speeds in milliseconds

  return (
    <div className="rule-selector">
      <div className="rule-group">
        <h3>Colors:</h3>
        {["red", "blue", "green", "yellow"].map((color) => (
          <button
            key={color}
            className={`rule-button ${
              rules.colors.includes(color) ? "active" : ""
            }`}
            onClick={() => handleRuleToggle("colors", color)}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="rule-group">
        <h3>Shapes:</h3>
        {["circle", "square"].map((shape) => (
          <button
            key={shape}
            className={`rule-button ${
              rules.shapes.includes(shape) ? "active" : ""
            }`}
            onClick={() => handleRuleToggle("shapes", shape)}
          >
            {shape}
          </button>
        ))}
      </div>
      <div className="rule-group">
        <h3>Speed:</h3>
        {speeds.map((speed) => (
          <button
            key={speed}
            className={`rule-button ${rules.speed === speed ? "active" : ""}`}
            onClick={() => dispatch(setRule({ type: "speed", value: speed }))}
          >
            {speed} ms
          </button>
        ))}
      </div>
    </div>
  );
};

export default RuleSelector;
