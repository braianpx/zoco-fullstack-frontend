import type { Notification } from "../../../types/notification.types";

interface Props {
  notification: Notification;
  onClose: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onClose,
}: Props) => {
  const isSuccess = notification.type === "success";

  return (
    <div
      className={`
        relative
        w-full
        p-4 pr-8
        rounded-xl
        border
        shadow-md
        text-sm
        transition-all duration-200
        animate-slide-in
        ${
          isSuccess
            ? "bg-emerald-600/65 border-emerald-600/65"
            : "bg-red-600/65 border-red-600/65"
        }
      `}
    >
      {/* Botón cerrar */}
      <button
        onClick={() => onClose(notification.id)}
        className="
          absolute top-2 right-2
          text-gray-100 hover:text-gray-300
          text-md
          transition-colors
          border-0
          bg-transparent
        "
      >
        ×
      </button>

      <p className="leading-relaxed text-white text-center font-medium">
        {notification.message}
      </p>
      
    </div>
  );
};
