/* eslint-disable react/prop-types */
import "../../styles/EditTextArea.css";
import {useTranslation} from "react-i18next";

export default function EditTextArea({ placeholder, value, onChange }) {
    const { t } = useTranslation();
  return (
    <div className="edit-textarea-container">
      <textarea
        placeholder={t(placeholder)}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
