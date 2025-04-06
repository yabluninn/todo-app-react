import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

import "../../styles/modals/ChangeModal.css";


export default function ChangePasswordModal({ user, onClose }) {
    const root = document.getElementById("root");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (!user || !user._id) {
            setError("User not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/user/verify-password", {
                userId: user._id,
                currentPassword,
            });

            if (!response.data.success) {
                setError("Current password is incorrect.");
                return;
            }

            await axios.put("http://localhost:5000/api/user/change-password", {
                userId: user._id,
                newPassword,
            });

            setSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError("Failed to change password. Please try again.");
        }
    };

    return createPortal(
        <div className="change-container">
            <div className="change-modal">
                <div className="change-header">
                    <p className="change-title">Change Password</p>
                    <button className="change-close-button" onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01 change-close-icon"></i>
                    </button>
                </div>
                <div className="change-content">
                    <InputWithLabel
                        type="password"
                        placeholder="Enter current password"
                        label="Current password"
                        icon="hgi-stroke hgi-lock"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <InputWithLabel
                        type="password"
                        placeholder="Enter new password"
                        label="New password"
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
                        Change Password
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}
