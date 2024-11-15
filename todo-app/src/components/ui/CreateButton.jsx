/* eslint-disable react/prop-types */
export default function CreateTaskButton({ onClick }) {
  return (
    <button style={styles.main} onClick={onClick}>
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      Create new task
    </button>
  );
}

const styles = {
  main: {
    width: "480px",
    height: "48px",
    fontSize: "18px",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    background: "black",
    paddingLeft: "18px",
    paddingRight: "18px",
    color: "white",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: "18px",
    color: "white",
    marginRight: "10px",
  },
};
