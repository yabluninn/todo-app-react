import { dateExtensions } from "../../../utils/date-extensions";
import { stringExtensions } from "../../../utils/string-extensions";
import HomeCategory from "./HomeCategory";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

/* eslint-disable react/prop-types */
export default function HomeNote({ note }) {
  const { categories: allCategories } = useCategories();

  const resolvedCategories = (note.categories || []).map((cat) =>
      typeof cat === "string"
          ? allCategories.find((c) => c._id === cat)
          : cat
  ).filter(Boolean);


  const formattedContent = stringExtensions.sliceWithDots(note.content || "", 180);

  const formattedDate = dateExtensions.getFormattedDate(new Date(note.creationDate));

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <i className="hgi-stroke hgi-note-02" style={styles.icon}></i>
        <p style={styles.name}>{note.name}</p>
        <p style={styles.date}>{formattedDate}</p>
      </div>
      <p style={styles.content}>{formattedContent}</p>
      <div style={styles.categories}>
        {resolvedCategories.map((category) => {
          if (!category) {
            return null;
          }
          return <HomeCategory key={category._id} category={category} />;
        })}

      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    maxHeight: "140px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    boxShadow: "rgba(99, 99, 99, 0.05) 0px 6px 12px 0px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  icon: {
    fontSize: "16px",
    marginRight: "8px",
  },
  content: {
    fontSize: "14px",
    color: "#aaa",
    padding: "8px",
    wordWrap: "break-word",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  categories: {
    width: "100%",
    padding: "0px 8px 8px 8px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    gap: "10px",
  },
  date: {
    fontSize: "14px",
    color: "#bbb",
    marginLeft: "auto",
  },
};
