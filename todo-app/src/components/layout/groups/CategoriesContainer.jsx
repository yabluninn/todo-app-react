import "../../../styles/CategoriesContainer.css"; // Подключаем CSS
import CreateCategoryButton from "../../ui/CreateCategoryButton";
import { useCategories } from "../../../contexts/CategoriesContext.jsx";
import Category from "./Category.jsx";

import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function CategoriesContainer({ openModal }) {
  const { categories } = useCategories();

  const { t } = useTranslation();

  return (
      <div className="categories-container">
        <div className="header">
          <div className="header-block">
            <i className="hgi-stroke hgi-delivery-box-01 header-icon"></i>
            <p className="title">{t("categories")}</p>
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
