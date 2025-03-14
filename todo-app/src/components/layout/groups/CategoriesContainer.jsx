import "../../../styles/CategoriesContainer.css"; // Подключаем CSS
import CreateCategoryButton from "../../ui/CreateCategoryButton";
import { useCategories } from "../../../contexts/CategoriesContext.jsx";
import Category from "./Category.jsx";
import { useState } from "react";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";

// eslint-disable-next-line react/prop-types
export default function CategoriesContainer({ openModal }) {
  const { categories } = useCategories();

  return (
      <div className="categories-container">
        <div className="header">
          <div className="header-block">
            <i className="hgi-stroke hgi-delivery-box-01 header-icon"></i>
            <p className="title">Categories</p>
          </div>
        </div>
        <div className="grid">
            {categories && categories.length > 0 && categories.map((category) => {
                return <Category key={category._id} category={category} />;
            })}

            <CreateCategoryButton onOpenModal={openModal} />
        </div>
      </div>
  );
}
