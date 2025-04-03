/* eslint-disable react/prop-types */

import "../../styles/CreateButton.css";

export default function CreateButton({ title, onClick }) {
  return (
      <button className="create-button" onClick={onClick}>
        <i className="fa-solid fa-plus create-button-icon"></i>
        {title}
      </button>
  );
}
