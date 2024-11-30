/* eslint-disable react/prop-types */
import "../../styles/EditTextArea.css";

export default function EditTextArea({ placeholder, value, onChange }) {
  return (
    <div className="edit-textarea-container">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
