import { useState, useCallback, type ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import type { Notification } from "../../types/notification.types";
import { NotificationContainer } from "../../components/ui/notification/NotificationContainer";

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: Notification["type"]) => {
      const id = crypto.randomUUID();

      setNotifications((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeNotification(id);
      }, 2000);
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};
