import "../../../styles/CategoriesContainer.css"; // Подключаем CSS
import CreateCategoryButton from "../../ui/CreateCategoryButton";
import { useCategories } from "../../../contexts/CategoriesContext.jsx";
import Category from "./Category.jsx";
import { useState } from "react";
import ContextMenu from "../../contextMenus/ContextMenu.jsx";
import ContextMenuButton from "../../contextMenus/ContextMenuButton.jsx";

// eslint-disable-next-line react/prop-types
export default function CategoriesContainer({ openModal }) {
  const { categories, removeAllCategories } = useCategories();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const toggleContextMenuVisibility = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  return (
      <div className="categories-container">
        <div className="header">
          <div className="header-block">
            <i className="hgi-stroke hgi-delivery-box-01 header-icon"></i>
            <p className="title">Categories</p>
          </div>
          <button className="more-button" onClick={toggleContextMenuVisibility}>
            <i className="hgi-stroke hgi-more-vertical more-icon"></i>
          </button>
        </div>
        <div className="grid">
          {categories && categories.length > 0 && categories.map((category) => (
              <Category key={category.id} category={category} />
          ))}
          <CreateCategoryButton onOpenModal={openModal} />
        </div>
        {isContextMenuVisible && (
            <ContextMenu position={{ top: "160px", right: "135px" }} toggleVisibility={toggleContextMenuVisibility}>
              <ContextMenuButton title={"Remove All"} icon={"hgi-stroke hgi-delete-02"} onClick={removeAllCategories} />
            </ContextMenu>
        )}
      </div>
  );
}
