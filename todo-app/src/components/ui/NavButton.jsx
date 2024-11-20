import { useState } from "react";

/* eslint-disable react/prop-types */

export default function NavButton({ icon, label }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.button,
        backgroundColor: isHovered ? "#f7f7f7" : "transparent", // Стиль наведения
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={icon} style={styles.icon}></i>
      {label}
    </button>
  );
}

const styles = {
  button: {
    width: "100%",
    height: "45px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "20px",
    color: "#333",
    borderRadius: "8px",
    paddingLeft: "12px",
  },
  icon: {
    marginRight: "16px",
  },
};
