// src/components/RuleSelector.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRule } from "../features/game/gameSlice";
import { selectRules } from "../features/game/gameSelectors";
import { MAX_SPEED, MIN_SPEED, DEFAULT_SPEED } from "../constants";

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

  const handleSpeedChange = (event) => {
    const value = parseInt(event.target.value, 10);
    dispatch(setRule({ type: "speed", value }));
  };

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
        {["circle", "square", "star", "triangle"].map((shape) => (
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
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          step="100"
          value={rules.speed || DEFAULT_SPEED}
          onChange={handleSpeedChange}
        />
        <span>{rules.speed || DEFAULT_SPEED} ms</span>
      </div>
    </div>
  );
};

export default RuleSelector;
