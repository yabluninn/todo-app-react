import "../../styles/Settings.css";
import SettingsItem from "../layout/settings/SettingsItem.jsx";
import SettingsBlock from "../layout/settings/SettingsBlock.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import ChangeUsernameModal from "../modals/ChangeUsernameModal.jsx";
import {useNotificationsContext} from "../../contexts/NotificationsContext.jsx";

export default function Settings() {
    const [user, setUser] = useState(null);

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] = useState(false);

    const { isNotificationsEnabled, toggleNotifications } = useNotificationsContext();

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser?.id) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/user/${parsedUser.id}`);
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
            alert("User ID not found. Please log in again.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/user/${storedUser.id}`);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/signup");
        } catch (err) {
            alert("Failed to delete account. Please try again.");
        }
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
    }

    const openChangeUsernameModal = () => {
        setIsChangeUsernameModalOpen(!isChangeUsernameModalOpen);
    }

    return (
        <div className="page-container">
            <div className="settings-header">
                <div>
                    <p className="s-header-title">Settings</p>
                    <p className="s-header-subtitle">
                        Here you can manage your profile&apos;s info, data, and appearance
                    </p>
                </div>
            </div>
            <div className="settings-wrapper">
                <SettingsBlock title="profile" icon="hgi-user">
                    <SettingsItem
                        title="username"
                        content={user ? user.username : "Loading..."}
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={openChangeUsernameModal}
                    />
                    <SettingsItem title="email" content={user ? user.email : "Loading..."} />
                    <SettingsItem
                        title="password"
                        buttonText="manage-password"
                        buttonClass="s-block-default-button"
                        buttonAction={openChangePasswordModal}
                    />
                    <SettingsItem
                        title="account"
                        buttonText="delete-account"
                        buttonClass="s-block-red-button"
                        buttonAction={handleDeleteAccount}
                    />
                </SettingsBlock>

                <SettingsBlock title="appearance" icon="hgi-paint-brush-04">
                    <SettingsItem
                        title="language"
                        content="English"
                        buttonIcon="hgi-pencil-edit-01"
                        buttonAction={() => alert("Change language")}
                    />
                </SettingsBlock>

                <SettingsBlock title="notifications" icon="hgi-notification-01">
                    <SettingsItem
                        title="puhs-notifications"
                        buttonText={isNotificationsEnabled ? "Enabled" : "Disabled"}
                        buttonClass="s-block-default-button"
                        buttonAction={toggleNotifications}
                    />
                </SettingsBlock>
            </div>
            {isChangePasswordModalOpen && (<ChangePasswordModal onClose={openChangePasswordModal} user={user} />)}
            {isChangeUsernameModalOpen && (<ChangeUsernameModal onClose={openChangeUsernameModal} user={user} onUpdateUser={fetchUserProfile}/>)}
        </div>
    );
}