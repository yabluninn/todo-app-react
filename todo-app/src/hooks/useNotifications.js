import { useEffect, useState } from "react";

export function useNotifications() {
    const [permission, setPermission] = useState(Notification.permission);

    useEffect(() => {
        if (permission === "default") {
            Notification.requestPermission().then((perm) => {
                setPermission(perm);
            });
        }
    }, [permission]);

    const showNotification = (title, options) => {
        if (permission === "granted") {
            new Notification(title, options);
        }
    };

    return { showNotification, permission };
}