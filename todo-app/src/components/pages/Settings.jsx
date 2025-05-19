import "../../styles/Settings.css";
import SettingsItem from "../layout/settings/SettingsItem.jsx";
import SettingsBlock from "../layout/settings/SettingsBlock.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import ChangeUsernameModal from "../modals/ChangeUsernameModal.jsx";
import {useNotificationsContext} from "../../contexts/NotificationsContext.jsx";
import {useTranslation} from "react-i18next";
import ChangeLanguageModal from "../modals/ChangeLanguageModal.jsx";
import i18n from "../../i18n.js";
import axiosInstance from "../../services/axiosInstance.js";

export default function Settings() {
    const [user, setUser] = useState(null);

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] = useState(false);
    const [isChangeLanguageModalOpen, setIsChangeLanguageModalOpen] = useState(false);

    const { isNotificationsEnabled, toggleNotifications } = useNotificationsContext();
    const { t } = useTranslation();

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser?.id) return;

        try {
            const response = await axiosInstance.get(`/user/${parsedUser.id}`);
            setUser(response.data);
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleDeleteAccount = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
            alert(t("user_id_missing"));
            return;
        }

        const confirmDelete = window.confirm(t("delete_confirm"));
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/user/${storedUser.id}`);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signup");
        } catch (err) {
            alert(t("delete_error"));
        }
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
    };

    const openChangeUsernameModal = () => {
        setIsChangeUsernameModalOpen(!isChangeUsernameModalOpen);
    };

    const openChangeLanguageModal = () => {
        setIsChangeLanguageModalOpen(!isChangeLanguageModalOpen);
    }

    return (
        <div className="page-container">
            <div className="settings-header">
                <div>
                    <p className="s-header-title">{t("settings")}</p>
                    <p className="s-header-subtitle">{t("settings_subtitle")}</p>
                </div>
            </div>

            <div className="settings-wrapper">
                <SettingsBlock title={t("profile")} icon="hgi-user">
                    <SettingsItem
                        title={t("username")}
                        content={user ? user.username : t("loading")}
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={openChangeUsernameModal}
                    />
                    <SettingsItem
                        title={t("email")}
                        content={user ? user.email : t("loading")}
                    />
                    <SettingsItem
                        title={t("password")}
                        buttonText={t("manage-password")}
                        buttonClass="s-block-default-button"
                        buttonAction={openChangePasswordModal}
                    />
                    <SettingsItem
                        title={t("account")}
                        buttonText={t("delete-account")}
                        buttonClass="s-block-red-button"
                        buttonAction={handleDeleteAccount}
                    />
                </SettingsBlock>

                <SettingsBlock title={t("appearance")} icon="hgi-paint-brush-04">
                    <SettingsItem
                        title={t("language")}
                        content={i18n.language === "en" ? "English" : "Українська"}
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={openChangeLanguageModal}
                    />
                </SettingsBlock>

                <SettingsBlock title={t("notifications")} icon="hgi-notification-01">
                    <SettingsItem
                        title={t("push-notifications")}
                        buttonText={isNotificationsEnabled ? t("enabled") : t("disabled")}
                        buttonClass="s-block-default-button"
                        buttonAction={toggleNotifications}
                    />
                </SettingsBlock>
            </div>

            {isChangePasswordModalOpen && (
                <ChangePasswordModal onClose={openChangePasswordModal} user={user} />
            )}
            {isChangeUsernameModalOpen && (
                <ChangeUsernameModal
                    onClose={openChangeUsernameModal}
                    user={user}
                    onUpdateUser={fetchUserProfile}
                />
            )}
            {isChangeLanguageModalOpen && (
                <ChangeLanguageModal onClose={openChangeLanguageModal} />
            )}
        </div>
    );
}