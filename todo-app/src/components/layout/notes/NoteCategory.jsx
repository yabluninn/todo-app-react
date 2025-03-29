/* eslint-disable react/prop-types */
import "../../../styles/notes/NoteCategory.css";

export default function NoteCategory({ category }) {
    return (
        <div
            className="note-category"
            style={{ backgroundColor: category.color }}
        >
            <p className="note-category-name">{category.name}</p>
        </div>
    );
}
