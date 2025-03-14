import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await axios.get(`http://localhost:5000/api/notifications?userId=${user.id}`);
            setNotifications(response.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    const addNotification = async (notification) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:5000/api/notifications", {
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
            await axios.delete(`http://localhost:5000/api/notifications/${id}`);
            setNotifications((prev) => prev.filter((notif) => notif._id !== id));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    const removeAllNotifications = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            await axios.delete(`http://localhost:5000/api/notifications?userId=${user.id}`);
            setNotifications([]);
        } catch (err) {
            console.error("Error deleting all notifications:", err);
        }
    };

    const showNotification = (title, options) => {
        if (Notification.permission === "granted") {
            new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((perm) => {
                if (perm === "granted") {
                    new Notification(title, options);
                }
            });
        }
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification, removeAllNotifications, showNotification  }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => useContext(NotificationsContext);
export default NotificationsContext;