/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../../styles/EditInput.css";

export default function EditInput({
  type,
  placeholder,
  value,
  onChange,
  width,
}) {
  return (
    <div className="edit-input-container" style={{ width: width }}>
      {type === "color" ? (
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="color-input"
          required
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
}
