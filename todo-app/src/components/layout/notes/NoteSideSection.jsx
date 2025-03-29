/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import EditInput from "../../ui/EditInput";
import EditTextArea from "../../ui/EditTextArea";
import SideCategory from "./SideCategory.jsx";
import SelectCategoryModal from "../../modals/SelectCategoryModal.jsx";
import {useListsContext} from "../../../contexts/ListsContext.jsx";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

import "../../../styles/tasks/TaskSideSection.css"

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
  const listName = list ? list.name : "Unknown List";

  return (
      <div className="task-side-container">
        <div className="task-side-header">
          <div className="task-side-header-subblock">
            <i className="hgi-stroke hgi-arrow-right-double task-side-header-icon"></i>
            <p className="task-side-header-listname">{listName}</p>
          </div>
          <button className="task-side-close-button" onClick={onClose}>
            <i className="hgi-stroke hgi-cancel-01 task-side-close-icon"></i>
          </button>
        </div>
        <div className="task-side-info-block">
          <div className="task-side-info-subblock">
            <EditInput
                type="text"
                placeholder="Note name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <p className="task-side-info-label">Name</p>
          </div>
        </div>
        <div className="task-side-info-block">
          <div className="task-side-info-subblock">
            <EditTextArea
                placeholder={"Note text..."}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
            />
            <p className="task-side-info-label">Text</p>
          </div>
        </div>
        <div className="task-side-info-block">
          <div className="task-side-info-subblock">
            <div className="note-categories-block">
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
                className="add-note-category-button"
                onClick={() => setShowCategoryModal(true)}
            >
              + Add Category
            </button>
            <p className="task-side-info-label">Categories</p>
          </div>
        </div>

        <button className="task-side-save-button" onClick={saveNote}>
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