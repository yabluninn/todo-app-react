import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export default function NotificationComponent ({ task, removeNotification }) {
    if (!task) return null;

    const { t } = useTranslation();

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

            setTimeAgo(result.length > 0 ? result.join(" ") : t("just_now"));
        };

        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 60000);

        return () => clearInterval(interval);
    }, [task.timestamp, t]);

    return (
        <div className="notification-item">
            <div className="notification-info">
                <p className="notification-title">{task.type === "start" ? t("notification_start") : t("notification_end")}</p>
                <p className="notification-time">{t("notification_task", { name: task.name })}</p>
                <p className="notification-received">{t("notification_ago", { time: timeAgo })}</p>
            </div>
            <button className="notification-remove-btn" onClick={() => removeNotification(task._id)}>
                <i className="hgi-stroke hgi-delete-02"></i>
            </button>
        </div>
    );
};
