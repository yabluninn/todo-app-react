/* eslint-disable react/prop-types */
export default function CreateTaskButton({ onClick }) {
  return (
    <button style={styles.main} onClick={onClick}>
      <i className="fa-solid fa-plus" style={styles.icon}></i>
      New Task
    </button>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "45px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: "18px",
    paddingRight: "18px",
    color: "black",
    border: "2px dashed #bbb",
    background: "#eee",
    marginTop: "26px",
  },
  icon: {
    fontSize: "16px",
    color: "black",
    marginRight: "10px",
  },
};
