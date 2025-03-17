import { createPortal } from "react-dom";
import { useState } from "react";
import InputWithLabel from "../ui/InputWithLabel.jsx";
import axios from "axios";

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
        <div style={styles.container}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <p style={styles.title}>Change Username</p>
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
                        type="text"
                        placeholder="Enter new username"
                        label="New username"
                        icon="hgi-stroke hgi-user"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    {success && <p style={styles.success}>{success}</p>}
                </div>
                <div style={styles.footer}>
                    <button
                        style={styles.addButton}
                        className="add-related-note-button"
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
