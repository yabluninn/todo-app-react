import "../../styles/Notifications.css";
import { useListsContext } from "../../contexts/ListsContext.jsx";
import NotificationComponent from "../layout/notifications/NotificationComponent.jsx";

export default function Notifications() {

    const { taskLists, shownNotifications, removeNotification } = useListsContext();

    const tasks = taskLists.flatMap(list => list.tasks || []);

    const notificationsToShow = shownNotifications
        .map(notification => {
            const task = tasks.find(task => task.id === notification.id);
            return task ? { ...task, timestamp: notification.timestamp, type: notification.type } : null;
        })
        .filter(task => task !== null)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div>
                    <p className="n-header-title">Notifications</p>
                    <p className="n-header-subtitle">
                        Here you can manage your notifications
                    </p>
                </div>
            </div>

            <div className="notifications-body">
                {notificationsToShow.length > 0 ? (
                    notificationsToShow.map((task) => (
                        <NotificationComponent
                            key={task.id}
                            task={task}
                            removeNotification={removeNotification}
                        />
                    ))
                ) : (
                    <p>No notifications available</p>
                )}
            </div>
        </div>
    );
}