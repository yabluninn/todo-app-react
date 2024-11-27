import { useState } from "react";

/* eslint-disable react/prop-types */

export default function ListMenuButton({ list }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.button,
        backgroundColor: isHovered ? "#f7f7f7" : "transparent", // Стиль наведения
        color: isHovered ? "#222" : "#444",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.icon,
          border: `2px solid ${list.color}`,
        }}
      ></div>
      {list.name}
      <div style={styles.tasksCount}>{list.tasks}</div>
    </button>
  );
}

const styles = {
  button: {
    width: "100%",
    height: "35px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "16px",
    color: "#444",
    borderRadius: "8px",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "16px",
    border: "2x solid",
    borderRadius: "8px",
  },
  tasksCount: {
    marginLeft: "auto",
    fontSize: "12px",
    backgroundColor: "#e6e6e6",
    borderRadius: "16px",
    paddingLeft: "6px",
    paddingRight: "6px",
    color: "#333",
  },
};
