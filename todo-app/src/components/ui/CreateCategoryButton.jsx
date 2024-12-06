export default function CreateCategoryButton() {
  return <button style={styles.main}>Create category</button>;
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
  },
};
