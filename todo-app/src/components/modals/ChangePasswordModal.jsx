import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

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
        <div style={styles.container}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <p style={styles.title}>Change Password</p>
                    <button style={styles.closeButton} onClick={onClose}>
                        <i className="hgi-stroke hgi-cancel-01" style={styles.closeIcon}></i>
                    </button>
                </div>
                <div style={styles.content}>
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
                    {error && <p style={styles.error}>{error}</p>}
                    {success && <p style={styles.success}>{success}</p>}
                </div>
                <div style={styles.footer}>
                    <button
                        style={styles.addButton}
                        className="add-related-note-button"
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

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: 1000,
    },
    modal: {
        position: "relative",
        width: "60%",
        maxWidth: "500px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1001,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
    },
    content: {
        padding: "24px",
    },
    footer: {
        padding: "16px 24px",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "center",
    },
    addButton: {
        backgroundColor: "#7437ff",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "10px 20px",
        cursor: "pointer",
        transition: "background 0.3s ease-in-out",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "10px",
    },
    success: {
        color: "green",
        fontSize: "14px",
        marginTop: "10px",
    }
};
