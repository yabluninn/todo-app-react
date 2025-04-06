import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

import "../../styles/modals/ChangeModal.css"

export default function ChangeUsernameModal({ user, onClose, onUpdateUser }) {
    const root = document.getElementById("root");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangeUsername = async () => {
        setError("");
        setSuccess("");

        if (!user || !user._id) {
            setError("User not found. Please log in again.");
            return;
        }

        try {
            // Verify current password
            const response = await axios.post("http://localhost:5000/api/user/verify-password", {
                userId: user._id,
                currentPassword,
            });

            if (!response.data.success) {
                setError("Current password is incorrect.");
                return;
            }

            // Update username if password is verified
            await axios.put("http://localhost:5000/api/user/change-username", {
                userId: user._id,
                newUsername,
            });

            setSuccess("Username changed successfully!");
            onUpdateUser();
            setCurrentPassword("");
            setNewUsername("");
        } catch (err) {
            setError("Failed to change username. Please try again.");
        }
    };

    return createPortal(
        <div className="change-container">
            <div className="change-modal">
                <div className="change-header">
                    <p className="change-title">Change Username</p>
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
                        type="text"
                        placeholder="Enter new username"
                        label="New username"
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
                        Change Username
                    </button>
                </div>
            </div>
        </div>,
        root
    );
}