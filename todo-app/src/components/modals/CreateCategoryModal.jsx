import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel";
import { useCategories } from "../../contexts/CategoriesContext.jsx";

export default function CreateCategoryModal({ onClose }) {
  const root = document.getElementById("root");

  const { addCategory, getCategoriesLength } = useCategories();

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const handleAddCategory = () => {
    if (categoryName.trim() !== "" && categoryColor.trim() !== "") {
      const id = getCategoriesLength();
      const newCategory = {
        id: id,
        name: categoryName,
        color: categoryColor,
      };
      addCategory(newCategory);

      onClose();
    }
  };

  return createPortal(
      <div style={styles.container}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <p style={styles.title}>Create Category</p>
            <button style={styles.closeButton} onClick={onClose}>
              <i
                  className="hgi-stroke hgi-cancel-01"
                  style={styles.closeIcon}
              ></i>
            </button>
          </div>
          <div style={styles.content}>
            <InputWithLabel
                type="text"
                placeholder="Enter category name"
                label="Name"
                icon="hgi-stroke hgi-text-font"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <InputWithLabel
                type="color"
                placeholder="Set category color"
                label="Color"
                icon="hgi-stroke hgi-paint-board"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
            />
          </div>
          <div style={styles.footer}>
            <button style={styles.addButton} onClick={handleAddCategory}>
              Create category
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
    maxWidth: "500px",
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
    padding: "24px",
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
  addButtonHover: {
    backgroundColor: "#5b2db3",
  },
  addIcon: {
    color: "white",
    marginRight: "8px",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .addButton:hover {
    background: #5b2db3 !important;
  }
`, styleSheet.cssRules.length);
