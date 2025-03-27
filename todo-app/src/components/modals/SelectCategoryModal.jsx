import { createPortal } from "react-dom";
import { useState } from "react";
import {useCategories} from "../../contexts/CategoriesContext.jsx";

export default function SelectCategoryModal({ onClose, onSelect }) {
    const root = document.getElementById("root");
    const { categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelect = () => {
        if (selectedCategory) {
            onSelect(selectedCategory);
        }
    };

    return createPortal(
        <div style={styles.container}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <p style={styles.title}>Выберите категорию</p>
                    <button style={styles.closeButton} onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01" style={styles.closeIcon}></i>
                    </button>
                </div>
                <div style={styles.content}>
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            style={{
                                ...styles.categoryItem,
                                borderColor: selectedCategory?._id === cat._id ? "#7437ff" : "transparent",
                                backgroundColor: cat.color,
                            }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>
                <div style={styles.footer}>
                    <button
                        style={styles.addButton}
                        className="add-category-button"
                        onClick={handleSelect}
                        disabled={!selectedCategory}
                    >
                        Add Category
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
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        width: "400px",
        maxHeight: "80%",
        overflowY: "auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    closeIcon: {
        fontSize: "20px",
        color: "#888",
    },
    content: {
        marginTop: "16px",
    },
    categoryItem: {
        padding: "12px",
        marginBottom: "8px",
        borderRadius: "6px",
        border: "2px solid transparent",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
    },
    footer: {
        marginTop: "16px",
        display: "flex",
        justifyContent: "center",
    },
    addButton: {
        backgroundColor: "#7437ff",
        color: "white",
        padding: "10px 20px",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
    },
};
