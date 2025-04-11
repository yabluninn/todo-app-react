import "../../styles/Profile.css";
import ava from "../../assets/avatar.png";
import { ACCOUNT_TYPES } from "../../constants/account-types.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser) return;

                const response = await axios.get(`http://localhost:5000/api/user/${storedUser.id}`);
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


    if (!user) {
        return <div className="page-container profile-container">Loading...</div>;
    }

    return (
        <div className="page-container profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={ava} alt="Avatar" className="profile-avatar" />
                    <div className="profile-info">
                        <h2 className="profile-username">{user.username}</h2>
                        <p className="profile-email">{user.email}</p>
                        <span className="profile-account">{ACCOUNT_TYPES.FREE} Account</span>
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="profile-button logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                    <button className="profile-button delete-button" onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
