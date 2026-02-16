import { createContext } from "react";
import type { NotificationType } from "../../types/notification.types";

export interface NotificationContextValue {
  notify: (message: string, type: NotificationType) => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);
