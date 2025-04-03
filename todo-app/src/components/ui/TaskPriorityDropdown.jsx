/* eslint-disable react/prop-types */
import { useState } from "react";

import "../../styles/PriorityDropdown.css"

export default function PriorityDropdown({ onChange }) {
  const [selectedPriority, setSelectedPriority] = useState("none");
  const [isListVisible, setListVisible] = useState(false);

  const priorities = ["none", "low", "medium", "high"];

  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    onChange(priority);
    setListVisible(false); // скрываем список после выбора
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
          <i className="hgi-stroke hgi-flag-02"></i>Priority
        </p>
        <div className="priority-dropdown">
          <div className="priority-selected" onClick={toggleVisibility}>
            <i className="hgi-stroke hgi-arrow-up-01" style={{ scale: 0 }}></i>
            {selectedPriority}
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
                  {priority}
                  <div style={{ scale: "0" }}></div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "450px",
    marginBottom: "16px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  dropdownContainer: {
    width: "100%",
    height: "40px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  selectedItem: {
    padding: "8px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
  },
  dropdownIcon: {
    fontSize: "18px",
  },
  dropdownList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "absolute",
    width: "100%",
    maxHeight: "160px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "8px 12px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
  priorityIcon: {
    width: "10px",
    height: "10px",
    borderRadius: "3px",
  },
};
