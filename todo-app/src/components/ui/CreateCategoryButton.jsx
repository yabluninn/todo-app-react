// eslint-disable-next-line react/prop-types
export default function CreateCategoryButton({onOpenModal}) {
  return (
      <button style={styles.main} onClick={onOpenModal}>
        <i className="fa-solid fa-plus" style={styles.icon}></i>
          Create Category
      </button>);
}

const styles = {
  main: {
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px 12px 4px 12px",
    borderRadius: "16px",
    color: "black",
    border: "2px dashed #bbb",
    background: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: "8px",
  }
};
