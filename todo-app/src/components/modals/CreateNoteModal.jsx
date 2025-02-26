import { createPortal } from "react-dom";
import { useState } from "react";

import InputWithLabel from "../ui/InputWithLabel";
import TextAreaWithLabel from "../ui/TextAreaWithLabel";
import ListDropdown from "../ui/ListDropdown";
import { LIST_TYPES } from "../../constants/list-types";
import { useListsContext } from "../../contexts/ListsContext";
import { useCategories } from "../../contexts/CategoriesContext.jsx";
import { Link } from "react-router-dom";
import NoteModalCategory from "../layout/groups/NoteModalCategory.jsx";

export default function CreateNoteModal({ onClose }) {
  const root = document.getElementById("root");

  const { addNoteToList } = useListsContext();
  const { categories } = useCategories();

  const [noteName, setNoteName] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedList, setSelectedList] = useState(-1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleAddNote = () => {
    if (
        noteName.trim() !== "" &&
        noteContent.trim() !== "" &&
        selectedList !== -1
    ) {
      const currentDate = new Date();

      const newNote = {
        id: Date.now(),
        name: noteName,
        content: noteContent,
        creationDate: currentDate,
        categories: selectedCategories,
        listId: selectedList,
      };

      addNoteToList(newNote, selectedList);
      onClose();
    }
  };

  const handleSetCategories = (categoryId) => {
    setSelectedCategories((prevCategories) =>
        prevCategories.includes(categoryId)
            ? prevCategories.filter((id) => id !== categoryId) // Убираем категорию
            : [...prevCategories, categoryId] // Добавляем категорию
    );
  };

  return createPortal(
      <div style={styles.container}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <p style={styles.title}>Create new note</p>
            <button style={styles.closeButton} onClick={onClose}>
              <i
                  className="hgi-stroke hgi-cancel-01"
                  style={styles.closeIcon}
              ></i>
            </button>
          </div>
          <div style={styles.content}>
            <div style={styles.block}>
              <InputWithLabel
                  type="text"
                  placeholder="Enter note name"
                  label="Name"
                  icon="hgi-stroke hgi-text-font"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
              />
              <ListDropdown
                  onChange={setSelectedList}
                  listType={LIST_TYPES.NOTES_LIST}
              />
              <p style={styles.categoriesLabel}>
                <i className={"hgi-stroke hgi-delivery-box-01"}></i>Select Category
              </p>
              <div style={styles.categoriesGrid}>
                {categories &&
                    categories.map((category) => (
                        <NoteModalCategory
                            key={category._id}
                            category={category}
                            onChange={handleSetCategories}
                            isSelected={selectedCategories.includes(category._id)}
                        />
                    ))}
                <Link style={styles.createButton} to={"/app/groups"}>
                  <i className="fa-solid fa-plus" style={styles.createIcon}></i>
                  Create Category
                </Link>
              </div>
            </div>
            <TextAreaWithLabel
                placeholder="Enter note content"
                label="Content"
                icon="hgi-stroke hgi-text-firstline-left"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                width={"450px"}
                height={"300px"}
            />
          </div>
          <div style={styles.footer}>
            <button style={styles.addButton} className="add-note-button" onClick={handleAddNote}>
              <i
                  className="hgi-stroke hgi-sticky-note-01"
                  style={styles.addIcon}
              ></i>
              Create note
            </button>
          </div>
        </div>
      </div>,
      root
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    width: "60%",
    maxWidth: "55%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  closeIcon: {
    fontSize: "20px",
    color: "#888",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "row",
    padding: "24px",
  },
  block: {
    width: "55%",
    marginRight: "24px",
  },
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#7437ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    width: "50%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  addIcon: {
    color: "white",
    marginRight: "8px",
  },
  categoriesGrid: {
    width: "100%",
    height: "134px",
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "2px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    overflowY: "auto",
  },
  categoriesLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    gap: "8px",
    marginBottom: "8px",
  },
  createButton: {
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px 12px",
    borderRadius: "16px",
    color: "black",
    border: "2px dashed #bbb",
    background: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textDecoration: "none",
  },
  createIcon: {
    marginRight: "8px",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .add-note-button:hover {
    background: #5b2db3 !important;
  }
`, styleSheet.cssRules.length);
