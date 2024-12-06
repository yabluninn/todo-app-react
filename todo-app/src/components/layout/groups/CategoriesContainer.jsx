import CreateCategoryButton from "../../ui/CreateCategoryButton";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";
import Category from "./Category.jsx";

// eslint-disable-next-line react/prop-types
export default function CategoriesContainer({openModal}) {
  const {categories} = useCategories();

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
      <div style={styles.grid}>
        {categories && categories.length > 0 && categories.map((category) => (
            <Category key={category.id} category={category} />
        ))}
        <CreateCategoryButton onOpenModal={openModal}/>
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "120px",
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
  grid: {
    paddingTop: "12px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
};
