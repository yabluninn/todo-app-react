/* eslint-disable react/prop-types */
import "../../styles/TextAreaWithLabel.css";
import {useTranslation} from "react-i18next";

export default function TextAreaWithLabel({
  placeholder,
  label,
  icon,
  value,
  onChange,
  width,
  height,
}) {
    const { t } = useTranslation();

  return (
    <div className="textarea-container">
      <label>
        {icon && <i className={icon}></i>}
        {t(label)}
      </label>
      <textarea
        placeholder={t(placeholder)}
        value={value}
        onChange={onChange}
        required
        style={{ width: width, height: height }}
      />
    </div>
  );
}
