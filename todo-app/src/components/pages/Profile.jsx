import "../../styles/Profile.css";
import ava from "../../assets/avatar.png";
import { ACCOUNT_TYPES } from "../../constants/account-types.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
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
                    <button className="profile-button delete-button">Delete Account</button>
                </div>
            </div>
        </div>
    );
}
