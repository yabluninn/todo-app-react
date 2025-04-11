/* eslint-disable react/prop-types */
import { useState } from "react";

import "../../styles/PriorityDropdown.css"
import {useTranslation} from "react-i18next";

export default function PriorityDropdown({ onChange }) {
  const [selectedPriority, setSelectedPriority] = useState("none");
  const [isListVisible, setListVisible] = useState(false);

  const { t } = useTranslation();

  const priorities = ["none", "low", "medium", "high"];

  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    onChange(priority);
    setListVisible(false);
  };

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "blue";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "grey";
    }
  };

  return (
      <div className="priority-dropdown-container">
        <p className="priority-label">
          <i className="hgi-stroke hgi-flag-02"></i>
          {t("priority_label")}
        </p>
        <div className="priority-dropdown">
          <div className="priority-selected" onClick={toggleVisibility}>
            <i className="hgi-stroke hgi-arrow-up-01" style={{ scale: 0 }}></i>
            {t(`priority_${selectedPriority}`)}
            <i
                className={`hgi-stroke ${
                    isListVisible ? "hgi-arrow-up-01" : "hgi-arrow-down-01"
                } priority-dropdown-icon`}
            ></i>
          </div>
          <ul
              className="priority-list"
              style={{ display: isListVisible ? "block" : "none" }}
          >
            {priorities.map((priority) => (
                <li
                    key={priority}
                    className="priority-item"
                    style={{
                      fontWeight: priority === selectedPriority ? "bold" : "normal",
                    }}
                    onClick={() => handleSelect(priority)}
                >
                  <div
                      className="priority-icon"
                      style={{ backgroundColor: getPriorityColor(priority) }}
                  ></div>
                  {t(`priority_${priority}`)}
                  <div style={{ scale: "0" }}></div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}