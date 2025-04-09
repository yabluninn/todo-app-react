/* eslint-disable react/prop-types */

import "../../styles/CreateButton.css";
import {useTranslation} from "react-i18next";

export default function CreateButton({ title, onClick }) {
  const { t } = useTranslation();

  return (
      <button className="create-button" onClick={onClick}>
        <i className="fa-solid fa-plus create-button-icon"></i>
        {t(title)}
      </button>
  );
}
