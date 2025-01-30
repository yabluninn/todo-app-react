import {useEffect, useState} from "react";

export default function NotificationComponent ({ task }) {
    if (!task) return null;

    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        const updateTimeAgo = () => {
            const now = new Date();
            const timestamp = new Date(task.timestamp);
            const diff = Math.floor((now - timestamp) / 1000);

            let result = "";

            const days = Math.floor(diff / 86400);
            const hours = Math.floor((diff % 86400) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);

            if (days > 0) result += `${days} days `;
            if (hours > 0) result += `${hours} hours `;
            if (minutes > 0) result += `${minutes} minutes `;

            setTimeAgo(result.trim() || "just now");
        };

        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 60000);

        return () => clearInterval(interval);
    }, [task.timestamp]);

    return (
        <div className="notification-item">
            <p className="notification-title">{task.type === "start" ? "It's time to start the task!" : "You have 5 minutes left!"}</p>
            <p className="notification-time">Task: {task.name}</p>
            <p className="notification-received">{timeAgo} ago</p>
        </div>
    );
};
