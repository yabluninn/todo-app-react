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

import "../../styles/modals/CreateNoteModal.css";
import {useTranslation} from "react-i18next";

export default function CreateNoteModal({ onClose }) {
  const root = document.getElementById("root");

  const { t } = useTranslation();

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
      <div className="modal-container">
        <div className="modal note-modal">
          <div className="modal-header">
            <p className="modal-title">{t("create_new_note")}</p>
            <button className="modal-close-button" onClick={onClose}>
              <i className="hgi-stroke hgi-cancel-01 modal-close-icon"></i>
            </button>
          </div>
          <div className="note-modal-content">
            <div className="note-modal-input-block">
              <InputWithLabel
                  type="text"
                  placeholder={t("enter_note_name")}
                  label={t("note_name")}
                  icon="hgi-stroke hgi-text-font"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
              />
              <ListDropdown
                  onChange={setSelectedList}
                  listType={LIST_TYPES.NOTES_LIST}
              />
              <p className="categoriesLabel">
                <i className={"hgi-stroke hgi-delivery-box-01"}></i>
                {t("select_category")}
              </p>
              <div className="categoriesGrid">
                {categories &&
                    categories.map((category) => (
                        <NoteModalCategory
                            key={category._id}
                            category={category}
                            onChange={handleSetCategories}
                            isSelected={selectedCategories.includes(category._id)}
                        />
                    ))}
                <Link className="createButton" to={"/app/groups"}>
                  <i className="fa-solid fa-plus createIcon"></i>
                  {t("create_category")}
                </Link>
              </div>
            </div>
            <TextAreaWithLabel
                placeholder={t("enter_note_content")}
                label={t("note_content")}
                icon="hgi-stroke hgi-text-firstline-left"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="add-task-button" onClick={handleAddNote}>
              <i className="hgi-stroke hgi-sticky-note-01 addIcon"></i>
              {t("create_note_button")}
            </button>
          </div>
        </div>
      </div>,
      root
  );
}