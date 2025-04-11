/* eslint-disable react/prop-types */
import { useState } from "react";
import {useTranslation} from "react-i18next";

export default function PriorityDropdown({ onChange, width, defaultValue }) {
  const [selectedPriority, setSelectedPriority] = useState(defaultValue);
  const [isListVisible, setListVisible] = useState(false);
  const { t } = useTranslation();

  const priorities = ["none", "low", "medium", "high"];

  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    onChange(priority);
  };

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
      <div style={{ ...styles.container, width: width }}>
        <div style={styles.dropdownContainer}>
          <div style={styles.selectedItem} onClick={toggleVisibility}>
            <i className="hgi-stroke hgi-arrow-up-01" style={{ scale: 0 }}></i>
            {t(`priority_${selectedPriority}`)}
            <i
                className={
                  isListVisible
                      ? "hgi-stroke hgi-arrow-up-01"
                      : "hgi-stroke hgi-arrow-down-01"
                }
                style={styles.dropdownIcon}
            ></i>
          </div>
          <ul
              style={{
                ...styles.dropdownList,
                display: isListVisible ? "block" : "none",
              }}
          >
            {priorities.map((priority) => (
                <li
                    key={priority}
                    style={{
                      ...styles.dropdownItem,
                      fontWeight: priority === selectedPriority ? "bold" : "normal",
                    }}
                    onClick={() => handleSelect(priority)}
                >
                  <div
                      style={{
                        ...styles.priorityIcon,
                        backgroundColor:
                            priority === "low"
                                ? "blue"
                                : priority === "medium"
                                    ? "orange"
                                    : priority === "high"
                                        ? "red"
                                        : "grey",
                      }}
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

const styles = {
  container: {
    position: "relative",
    width: "450px",
  },
  dropdownContainer: {
    width: "100%",
    height: "40px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "rgb(251, 251, 251)",
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
