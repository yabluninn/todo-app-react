/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../../styles/InputWithLabel.css";

export default function InputWithLabel({
  type,
  placeholder,
  label,
  icon,
  value,
  onChange,
}) {
  return (
    <div className="input-container">
      <label>
        {icon && <i className={icon}></i>}
        {label}
      </label>
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
