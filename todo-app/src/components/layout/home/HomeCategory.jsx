/* eslint-disable react/prop-types */
export default function HomeCategory({ category }) {
  return (
    <p
      style={{
        ...styles.main,
        backgroundColor: category.color,
        color: "white",
      }}
    >
      {category.name}
    </p>
  );
}

const styles = {
  main: {
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px 12px 4px 12px",
    borderRadius: "16px",
  },
};
