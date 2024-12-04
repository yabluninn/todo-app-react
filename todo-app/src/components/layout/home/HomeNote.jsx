import HomeCategory from "./HomeCategory";

/* eslint-disable react/prop-types */
export default function HomeNote({ note }) {
  const noteCategory = {
    name: "Test",
    bgColor: "rgb(164, 94, 230)",
    color: "white",
  };

  const noteTwoCategory = {
    name: "JS",
    bgColor: "orange",
    color: "white",
  };

  const formatContent = (content) => {
    if (content.length >= 180) {
      return content.slice(0, 180) + " ...";
    } else {
      return content;
    }
  };

  const formattedContent = formatContent(note.content);

  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <i className="hgi-stroke hgi-note-02" style={styles.icon}></i>
        <p style={styles.name}>{note.name}</p>
      </div>
      <p style={styles.content}>{formattedContent}</p>
      <div style={styles.categories}>
        <HomeCategory category={noteCategory} />
        <HomeCategory category={noteTwoCategory} />
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
    color: "#666",
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
};
