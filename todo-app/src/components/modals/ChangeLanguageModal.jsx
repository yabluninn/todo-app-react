import { createPortal } from "react-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/modals/ChangeModal.css";

export default function ChangeLanguageModal({ onClose }) {
    const root = document.getElementById("root");
    const { i18n, t } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [success, setSuccess] = useState("");

    const handleChangeLanguage = () => {
        i18n.changeLanguage(selectedLanguage);
        setSuccess(t("change_language_success"));
    };

    return createPortal(
        <div className="change-container">
            <div className="change-modal">
                <div className="change-header">
                    <p className="change-title">{t("change_language")}</p>
                    <button className="change-close-button" onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01 change-close-icon"></i>
                    </button>
                </div>
                <div className="change-content">
                    <div className="language-options">
                        <label className="language-label">
                            <input
                                type="radio"
                                name="language"
                                value="en"
                                checked={selectedLanguage === "en"}
                                onChange={() => setSelectedLanguage("en")}
                            />
                            English
                        </label>
                        <label className="language-label">
                            <input
                                type="radio"
                                name="language"
                                value="ua"
                                checked={selectedLanguage === "ua"}
                                onChange={() => setSelectedLanguage("ua")}
                            />
                            Українська
                        </label>
                    </div>
                    {success && <p className="change-success">{success}</p>}
                </div>
                <div className="change-footer">
                    <button
                        className="change-add-button"
                        onClick={handleChangeLanguage}
                        disabled={selectedLanguage === i18n.language}
                    >
                        {t("save_changes")}
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}
