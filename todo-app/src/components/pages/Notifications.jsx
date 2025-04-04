import "../../styles/Notifications.css";
import { useListsContext } from "../../contexts/ListsContext.jsx";
import NotificationComponent from "../layout/notifications/NotificationComponent.jsx";
import {useNotificationsContext} from "../../contexts/NotificationsContext.jsx";

export default function Notifications() {
    const { notifications, removeNotification, removeAllNotifications } = useNotificationsContext();
    const { taskLists } = useListsContext();

    const tasks = taskLists.flatMap((list) => list.tasks || []);

    const notificationsToShow = notifications
        .map((notification) => {
            const task = tasks.find((t) => t._id === notification.taskId);
            return task ? { ...task, timestamp: notification.timestamp, type: notification.type } : null;
        })
        .filter((task) => task !== null)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="page-container">
            <div className="notifications-header">
                <div>
                    <p className="n-header-title">Notifications</p>
                    <p className="n-header-subtitle">
                        Here you can manage your notifications
                    </p>
                </div>
                <button className="clear-all-btn" onClick={removeAllNotifications}>Clear All</button>
            </div>

            <div className="notifications-body">
                {notificationsToShow.length > 0 ? (
                    notificationsToShow.map((task) => (
                        <NotificationComponent key={task._id} task={task} removeNotification={removeNotification}/>
                    ))
                ) : (
                    <p>No notifications available</p>
                )}
            </div>
        </div>
    );
}