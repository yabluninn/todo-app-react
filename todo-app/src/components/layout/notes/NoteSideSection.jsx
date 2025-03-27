/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import EditTextArea from "../../ui/EditTextArea";
import SideCategory from "./SideCategory.jsx";
import SelectCategoryModal from "../../modals/SelectCategoryModal.jsx";
import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

export default function NoteSideSection({ note, onClose }) {
  const { categories: allCategories } = useCategories();

  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [categories, setCategories] = useState(note.categories || []);

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const {getNoteListById, updateNote} = useListsContext();

  useEffect(() => {
    setNewName(note.name);
    setNewContent(note.content);

    const resolvedCategories = (note.categories || [])
        .map(id => typeof id === "string"
            ? allCategories.find(c => c._id === id)
            : id)
        .filter(Boolean);

    setCategories(resolvedCategories);
  }, [note.name, note.content, note.categories, allCategories]);

  const saveNote = () => {
    const updatedNote = {
      ...note,
      name: newName,
      content: newContent,
      categories: categories,
    };

    console.log("categories: ", categories);

    updateNote(note._id, updatedNote);
    onClose();
  };


  const handleAddCategory = (newCategory) => {
    const alreadyExists = categories.find((c) => c._id === newCategory._id);
    if (!alreadyExists) {
      setCategories([...categories, newCategory]);
    }
    setShowCategoryModal(false);
  };

  const removeCategory = (categoryId) => {
    const updatedCategories = categories.filter((c) => c._id !== categoryId);
    setCategories(updatedCategories);
  };

  const list = getNoteListById(note.listId);

  return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerSubblock}>
            <i
                className="hgi-stroke hgi-arrow-right-double"
                style={styles.headerIcon}
            ></i>
            <p style={styles.headerListName}>{list.name}</p>
          </div>
          <button style={styles.closeButton} onClick={onClose}>
            <i className="hgi-stroke hgi-cancel-01" style={styles.closeIcon}></i>
          </button>
        </div>
        <div style={styles.infoBlock}>
          <div style={styles.infoSubBlock}>
            <EditInput
                type="text"
                placeholder="Note name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <p style={styles.infoLabel}>Name</p>
          </div>
        </div>
        <div style={styles.infoBlock}>
          <div style={styles.infoSubBlock}>
            <EditTextArea
                placeholder={"Note text..."}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
            />
            <p style={styles.infoLabel}>Text</p>
          </div>
        </div>
        <div style={styles.infoBlock}>
          <div style={styles.infoSubBlock}>
            <div style={styles.categories}>
              {categories.map((category) => {
                return (
                    <SideCategory
                        key={category._id}
                        category={category}
                        onSelected={removeCategory}
                    />
                );
              })}
            </div>
            <button
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#7437ff",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
                onClick={() => setShowCategoryModal(true)}
            >
              + Add Category
            </button>
            <p style={styles.infoLabel}>Categories</p>
          </div>
        </div>

        <button style={styles.saveButton} onClick={saveNote}>
          Save
        </button>
        {showCategoryModal && (
            <SelectCategoryModal
                onClose={() => setShowCategoryModal(false)}
                onSelect={handleAddCategory}
            />
        )}
      </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "25%",
    height: "100%",
    background: "white",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 8px 16px 0px",
    padding: "18px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "16px",
  },
  headerIcon: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#aaa",
  },
  headerListName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "8px",
  },
  headerSubblock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  infoBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "16px",
    paddingBottom: "16px",
    gap: "8px",
    borderBottom: "1px solid #ccc",
  },
  infoSubBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: "14px",
    color: "grey",
    marginTop: "6px",
  },
  saveButton: {
    backgroundColor: "#7437ff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "43%",
  },
  categories: {
    width: "100%",
    minHeight: "40px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    gap: "12px",
    flexWrap: "wrap",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor:"rgb(251, 251, 251)",
  }
};
