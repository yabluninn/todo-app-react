import { useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */

export default function NavButton({ icon, label, path }) {
  const [isHovered, setIsHovered] = useState(false);

  const DEFAULT_APP_URL = "/app";

  return (
    <Link
      to={DEFAULT_APP_URL + path}
      style={{
        ...styles.button,
        backgroundColor: isHovered ? "#f7f7f7" : "transparent",
        color: isHovered ? "#222" : "#444",
        textDecoration: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={icon} style={styles.icon}></i>
      {label}
    </Link>
  );
}

const styles = {
  button: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "18px",
    color: "#444",
    borderRadius: "8px",
    paddingLeft: "12px",
  },
  icon: {
    marginRight: "16px",
  },
};
