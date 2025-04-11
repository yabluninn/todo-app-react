import { createPortal } from "react-dom";
import { useState } from "react";
import { useCategories } from "../../contexts/CategoriesContext.jsx";
import { useTranslation } from "react-i18next";
import "../../styles/modals/SelectCategoryModal.css";

export default function SelectCategoryModal({ onClose, onSelect }) {
    const root = document.getElementById("root");
    const { categories } = useCategories();
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelect = () => {
        if (selectedCategory) {
            onSelect(selectedCategory);
        }
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <p className="modal-title">{t("select_category_modal_title")}</p>
                    <button className="modal-close-button" onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01 modal-close-icon"></i>
                    </button>
                </div>
                <div className="modal-content">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="modal-category-item"
                            style={{
                                borderColor: selectedCategory?._id === cat._id ? "#7437ff" : "transparent",
                                backgroundColor: cat.color,
                            }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button
                        className="add-category-button"
                        onClick={handleSelect}
                        disabled={!selectedCategory}
                    >
                        {t("add_category_button")}
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}