/* eslint-disable react/prop-types */
export default function CreateTaskButton({ onClick }) {
  return (
    <button style={styles.main} onClick={onClick}>
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      Create new list
    </button>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "40px",
    fontSize: "16px",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    background: "#f1f1f1",
    paddingLeft: "18px",
    paddingRight: "18px",
    color: "black",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    marginTop: "18px",
  },
  icon: {
    fontSize: "16px",
    color: "black",
    marginRight: "10px",
  },
};
