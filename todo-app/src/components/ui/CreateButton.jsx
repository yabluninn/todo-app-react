/* eslint-disable react/prop-types */
export default function CreateButton({ title, onClick }) {
  return (
      <button style={styles.main} onClick={onClick} className="create-button">
        <i className="fa-solid fa-plus" style={styles.icon}></i>
        {title}
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
    marginTop: "12px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  icon: {
    fontSize: "16px",
    color: "black",
    marginRight: "10px",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .create-button:hover {
    background: #ddd !important;
  }
`, styleSheet.cssRules.length);
