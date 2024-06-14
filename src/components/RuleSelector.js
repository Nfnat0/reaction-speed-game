// src/components/RuleSelector.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRule } from "../features/game/gameSlice";
import { selectRules } from "../features/game/gameSelectors";

const RuleSelector = () => {
  const dispatch = useDispatch();
  const rules = useSelector(selectRules);

  const handleRuleChange = (type, selectedOptions) => {
    const value = Array.from(selectedOptions, (option) => option.value);
    dispatch(setRule({ type, value }));
  };

  return (
    <div className="rule-selector">
      <label htmlFor="colors">Colors: </label>
      <div id="colors" className="list">
        <label>
          <input
            type="checkbox"
            value="red"
            checked={rules.colors.includes("red")}
            onChange={(e) =>
              handleRuleChange(
                "colors",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Red
        </label>
        <label>
          <input
            type="checkbox"
            value="blue"
            checked={rules.colors.includes("blue")}
            onChange={(e) =>
              handleRuleChange(
                "colors",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Blue
        </label>
        <label>
          <input
            type="checkbox"
            value="green"
            checked={rules.colors.includes("green")}
            onChange={(e) =>
              handleRuleChange(
                "colors",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Green
        </label>
        <label>
          <input
            type="checkbox"
            value="yellow"
            checked={rules.colors.includes("yellow")}
            onChange={(e) =>
              handleRuleChange(
                "colors",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Yellow
        </label>
      </div>
      <label htmlFor="shapes">Shapes: </label>
      <div id="shapes" className="list">
        <label>
          <input
            type="checkbox"
            value="circle"
            checked={rules.shapes.includes("circle")}
            onChange={(e) =>
              handleRuleChange(
                "shapes",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Circle
        </label>
        <label>
          <input
            type="checkbox"
            value="square"
            checked={rules.shapes.includes("square")}
            onChange={(e) =>
              handleRuleChange(
                "shapes",
                e.target.parentNode.parentNode.querySelectorAll("input:checked")
              )
            }
          />{" "}
          Square
        </label>
      </div>
    </div>
  );
};

export default RuleSelector;
