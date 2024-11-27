import { useState } from "react";

export default function HomeNoteWidget() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.main,
        border: isHovered ? "2px dashed #7437ff" : "2px dashed #bbb",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <i
        className="hgi-stroke hgi-add-circle"
        style={{ ...styles.icon, color: isHovered ? "#7437ff" : "#bbb" }}
      ></i>
      <p style={{ ...styles.label, color: isHovered ? "#7437ff" : "#bbb" }}>
        Add Widget
      </p>
    </div>
  );
}

const styles = {
  main: {
    width: "49%",
    height: "55.6%",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    fontSize: "44px",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "8px",
  },
};
