import "../../styles/Profile.css";
import ava from "../../assets/avatar.png";
import { ACCOUNT_TYPES } from "../../constants/account-types.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next";
import axiosInstance from "../../services/axiosInstance.js";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser) return;

                const response = await axiosInstance.get(`/user/${storedUser.id}`);
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleDeleteAccount = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
            alert(t("user_not_found"));
            return;
        }

        const confirmDelete = window.confirm(t("delete_account_confirm"));
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/user/${storedUser.id}`);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/signup");
        } catch (err) {
            alert(t("delete_account_error"));
        }
    };


    if (!user) {
        return <div className="page-container profile-container">{t("profile_loading")}</div>;
    }

    return (
        <div className="page-container profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={ava} alt="Avatar" className="profile-avatar" />
                    <div className="profile-info">
                        <h2 className="profile-username">{user.username}</h2>
                        <p className="profile-email">{user.email}</p>
                        <span className="profile-account">{t("free_account")}</span>
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="profile-button logout-button" onClick={handleLogout}>
                        {t("log_out")}
                    </button>
                    <button className="profile-button delete-button" onClick={handleDeleteAccount}>
                        {t("delete_account")}
                    </button>
                </div>
            </div>
        </div>
    );
}
