/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../../styles/InputWithLabel.css";
import {useTranslation} from "react-i18next";

export default function InputWithLabel({
  type,
  placeholder,
  label,
  icon,
  value,
  onChange,
}) {
  const { t } = useTranslation();

  return (
    <div className="input-container">
      <label>
        {icon && <i className={icon}></i>}
        {t(label)}
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
          placeholder={t(placeholder)}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
}
