import { useEffect } from "react";
import { useNotificationsContext } from "../contexts/NotificationsContext";
import { useListsContext } from "../contexts/ListsContext";

export default function NotificationsHandler() {
    const { taskLists } = useListsContext();
    const { showNotification, notifications, addNotification } = useNotificationsContext();

    useEffect(() => {
        if (taskLists.length === 0) return;

        const tasks = taskLists.flatMap(list => list.tasks || []);

        tasks.forEach((task) => {
            if (!task.startTime || notifications.some(n => n.taskId === task._id && n.type === "start")) return;

            const now = new Date();
            let taskStartTime = new Date(task.startTime);

            if (task.startTime.includes(":") && !task.startTime.includes("T")) {
                const today = now.toISOString().split("T")[0];
                taskStartTime = new Date(`${today}T${task.startTime}:00`);
            }

            const delayStart = taskStartTime - now;

            // First Notification Type (Task Start)
            if (delayStart > 0) {
                setTimeout(() => {
                    if (!notifications.some(n => n.taskId === task._id && n.type === "start")) {
                        showNotification(`It's time to complete the task: ${task.name}`, {
                            body: `Start time: ${taskStartTime.toLocaleTimeString()} \nEnd time: ${task.endTime || "No time limit"}`,
                        });

                        addNotification({
                            taskId: task._id,
                            timestamp: new Date().toISOString(),
                            type: "start",
                            name: task.name,
                        });
                    }
                }, delayStart);
            }

            // Second Notification Type (Reminder before End)
            if (task.endTime) {
                let taskEndTime = new Date(task.endTime);

                if (task.endTime.includes(":") && !task.endTime.includes("T")) {
                    const today = now.toISOString().split("T")[0];
                    taskEndTime = new Date(`${today}T${task.endTime}:00`);
                }

                const delayReminder = taskEndTime - now - 5 * 60 * 1000; // 5 minutes before deadline

                if (delayReminder > 0) {
                    setTimeout(() => {
                        if (!notifications.some(n => n.taskId === task._id && n.type === "reminder")) {
                            showNotification(`You have 5 minutes left to complete: ${task.name}`, {
                                body: `End time: ${taskEndTime.toLocaleTimeString()}. Hurry up to finish!`,
                            });

                            addNotification({
                                taskId: task._id,
                                timestamp: new Date().toISOString(),
                                type: "reminder",
                            });
                        }
                    }, delayReminder);
                }
            }
        });
    }, [taskLists, notifications]);

    return null;
}
