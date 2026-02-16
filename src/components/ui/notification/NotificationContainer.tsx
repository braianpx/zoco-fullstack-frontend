import type{ Notification } from "../../../types/notification.types";
import { NotificationItem } from "./NotificationItem";

interface Props {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export const NotificationContainer = ({
  notifications,
  onClose,
}: Props) => {
  return (
    <div
      className="
        fixed top-5 right-5
        z-50
        flex flex-col gap-4
        w-full max-w-sm
      "
      aria-live="polite"
      aria-atomic="true"
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
