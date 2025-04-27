import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    useEffect(() => {
        fetchNotifications();
        fetchUserSettings();
    }, []);

    const fetchNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await axios.get(`https://booxee-server.onrender.com/api/notifications?userId=${user.id}`);
            setNotifications(response.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    const fetchUserSettings = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        try {
            const response = await axios.get(`https://booxee-server.onrender.com/api/user/${user.id}`);
            setIsNotificationsEnabled(response.data.isNotificationsEnabled);
        } catch (err) {
            console.error("Error fetching user settings:", err);
        }
    };

    const addNotification = async (notification) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("https://booxee-server.onrender.com/api/notifications", {
                userId: user.id,
                ...notification,
            });

            console.log("Notification to add: ", notification);

            setNotifications((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Error adding notification:", err);
        }
    };

    const removeNotification = async (id) => {
        try {
            await axios.delete(`https://booxee-server.onrender.com/api/notifications/${id}`);
            setNotifications((prev) => prev.filter((notif) => notif._id !== id));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    const removeAllNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            await axios.delete(`https://booxee-server.onrender.com/api/notifications?userId=${user.id}`);
            setNotifications([]);
        } catch (err) {
            console.error("Error deleting all notifications:", err);
        }
    };

    const showNotification = (title, options) => {
        if (Notification.permission === "granted" && isNotificationsEnabled) {
            new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((perm) => {
                if (perm === "granted" && isNotificationsEnabled) {
                    new Notification(title, options);
                }
            });
        }
    };

    const toggleNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const updatedStatus = !isNotificationsEnabled;
            await axios.put(`https://booxee-server.onrender.com/api/user/${user.id}/notifications`, {
                isNotificationsEnabled: updatedStatus,
            });

            setIsNotificationsEnabled(updatedStatus);
        } catch (err) {
            console.error("Error updating notifications:", err);
        }
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification, removeAllNotifications, showNotification, toggleNotifications, isNotificationsEnabled, setIsNotificationsEnabled  }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => useContext(NotificationsContext);
export default NotificationsContext;