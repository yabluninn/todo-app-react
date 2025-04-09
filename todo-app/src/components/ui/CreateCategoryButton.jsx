import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function CreateCategoryButton({ onOpenModal }) {
  const { t, i18n } = useTranslation();

  return (
      <button style={styles.main} onClick={onOpenModal} className="create-category-button">
        <i className="fa-solid fa-plus" style={styles.icon}></i>
        {t("create-category")}
      </button>
  );
}

const styles = {
  main: {
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px 12px",
    borderRadius: "16px",
    color: "black",
    border: "2px dashed #bbb",
    background: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  icon: {
    marginRight: "8px",
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .create-category-button:hover {
    background: #ddd !important;
  }
`, styleSheet.cssRules.length);
