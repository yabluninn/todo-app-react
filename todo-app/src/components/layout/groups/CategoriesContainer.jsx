export default function CategoriesContainer() {
  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <div style={styles.headerBlock}>
          <i
            className="hgi-stroke hgi-delivery-box-01"
            style={styles.headerIcon}
          ></i>
          <p style={styles.title}>Categories</p>
        </div>
        <button style={styles.moreButton}>
          <i
            className="hgi-stroke hgi-more-vertical"
            style={styles.moreIcon}
          ></i>
        </button>
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "240px",
    maxHeight: "240px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 2px 12px 0px",
    padding: "12px",
  },
  header: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottom: "1px solid #eee",
  },
  headerBlock: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
  },
  headerIcon: {
    fontSize: "18px",
    marginRight: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  moreButton: {
    width: "35px",
    height: "35px",
  },
  moreIcon: {
    fontSize: "22px",
    fontWeight: "bold",
  },
};
