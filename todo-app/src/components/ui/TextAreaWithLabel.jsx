/* eslint-disable react/prop-types */
import "../../styles/TextAreaWithLabel.css";

export default function TextAreaWithLabel({
  placeholder,
  label,
  icon,
  value,
  onChange,
}) {
  return (
    <div className="textarea-container">
      <label>
        {icon && <i className={icon}></i>}
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
