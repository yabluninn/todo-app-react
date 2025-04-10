import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

import "../../styles/modals/ChangeModal.css"
import {useTranslation} from "react-i18next";

export default function ChangeUsernameModal({ user, onClose, onUpdateUser }) {
    const root = document.getElementById("root");

    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangeUsername = async () => {
        setError("");
        setSuccess("");

        if (!user || !user._id) {
            setError(t("user_not_found"));
            return;
        }

        try {
            // Verify current password
            const response = await axios.post("http://localhost:5000/api/user/verify-password", {
                userId: user._id,
                currentPassword,
            });

            if (!response.data.success) {
                setError(t("incorrect_password"));
                return;
            }

            // Update username if password is verified
            await axios.put("http://localhost:5000/api/user/change-username", {
                userId: user._id,
                newUsername,
            });

            setSuccess(t("change_username_success"));
            onUpdateUser();
            setCurrentPassword("");
            setNewUsername("");
        } catch (err) {
            setError(t("change_username_error"));
        }
    };

    return createPortal(
        <div className="change-container">
            <div className="change-modal">
                <div className="change-header">
                    <p className="change-title">{t("change_username")}</p>
                    <button className="change-close-button" onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01 change-close-icon"></i>
                    </button>
                </div>
                <div className="change-content">
                    <InputWithLabel
                        type="password"
                        placeholder={t("enter_current_password")}
                        label={t("current_password")}
                        icon="hgi-stroke hgi-lock"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <InputWithLabel
                        type="text"
                        placeholder={t("enter_new_username")}
                        label={t("new_username")}
                        icon="hgi-stroke hgi-user"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    {error && <p className="change-error">{error}</p>}
                    {success && <p className="change-success">{success}</p>}
                </div>
                <div className="change-footer">
                    <button
                        className="change-add-button"
                        onClick={handleChangeUsername}
                        disabled={!currentPassword || !newUsername}
                    >
                        {t("change_username")}
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}