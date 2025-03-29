/* eslint-disable react/prop-types */
import "../../../styles/notes/Note.css";
import { stringExtensions } from "../../../utils/string-extensions";
import NoteCategory from "./NoteCategory.jsx";
import {useCategories} from "../../../contexts/CategoriesContext.jsx";

export default function Note({ note, handleDelete, handleEdit }) {
  const { categories: allCategories } = useCategories();

  const resolvedCategories = (note.categories || []).map((cat) =>
      typeof cat === "string"
          ? allCategories.find((c) => c._id === cat)
          : cat
  ).filter(Boolean);


  const formattedContent = stringExtensions.sliceWithDots(note.content || "", 80);

  return (
      <div className="n-container">
        <div className="note-block">
          <div className="note-main-block">
            <div className="note-main-subblock">
              <div style={{width: "65%"}}>
                <p className="note-name">{note.name}</p>
                <p className="note-content">{formattedContent}</p>
              </div>
              <div className="note-categories">
                {resolvedCategories.map((category) => (
                    <NoteCategory key={category._id} category={category}/>
                ))}
              </div>
            </div>
            <div className="note-sub-block">
              <button onClick={handleEdit} className="note-action-button">
                <i className="hgi-stroke hgi-pencil-edit-01 note-action-icon"></i>
              </button>
              <button onClick={handleDelete} className="note-action-button">
                <i className="hgi-stroke hgi-delete-02 note-action-icon delete"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}