import "../../styles/Profile.css";
import ava from "../../assets/avatar.png";
import { ACCOUNT_TYPES } from "../../constants/account-types.js";

export default function Profile() {
    const user = {
        username: "Artem Yablunin",
        avatar: ava,
        accountType: ACCOUNT_TYPES.FREE,
        email: "test@gmail.com",
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                    <div className="profile-info">
                        <h2 className="profile-username">{user.username}</h2>
                        <p className="profile-email">{user.email}</p>
                        <span className="profile-account">{user.accountType} Account</span>
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="profile-button logout-button">Log Out</button>
                    <button className="profile-button delete-button">Delete Account</button>
                </div>
            </div>
        </div>
    );
}
