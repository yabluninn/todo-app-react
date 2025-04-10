import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

import "../../styles/modals/ChangeModal.css";
import {useTranslation} from "react-i18next";


export default function ChangePasswordModal({ user, onClose }) {
    const root = document.getElementById("root");

    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (!user || !user._id) {
            setError(t("user_not_found"));
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/user/verify-password", {
                userId: user._id,
                currentPassword,
            });

            if (!response.data.success) {
                setError(t("incorrect_password"));
                return;
            }

            await axios.put("http://localhost:5000/api/user/change-password", {
                userId: user._id,
                newPassword,
            });

            setSuccess(t("change_password_success"));
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(t("change_password_error"));
        }
    };

    return createPortal(
        <div className="change-container">
            <div className="change-modal">
                <div className="change-header">
                    <p className="change-title">{t("change_password")}</p>
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
                        type="password"
                        placeholder={t("enter_new_password")}
                        label={t("new_password")}
                        icon="hgi-stroke hgi-lock"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {error && <p className="change-error">{error}</p>}
                    {success && <p className="change-success">{success}</p>}
                </div>
                <div className="change-footer">
                    <button
                        className="change-add-button"
                        onClick={handleChangePassword}
                        disabled={!currentPassword || !newPassword}
                    >
                        {t("change_password")}
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}
