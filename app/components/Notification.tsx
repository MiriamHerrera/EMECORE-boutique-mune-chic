import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle
};

const colors = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    icon: 'text-green-400'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-800',
    icon: 'text-red-400'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-800',
    icon: 'text-blue-400'
  }
};

export default function Notification({
  type,
  message,
  onClose,
  duration = 5000
}: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const Icon = icons[type];
  const color = colors[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border ${color.bg} ${color.border}`}
      role="alert"
    >
      <Icon className={`flex-shrink-0 w-5 h-5 mr-2 ${color.icon}`} />
      <span className={`flex-1 text-sm font-medium ${color.text}`}>
        {message}
      </span>
      <button
        type="button"
        className={`ml-4 inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md ${color.text} hover:opacity-75 focus:outline-none`}
        onClick={onClose}
      >
        <span className="sr-only">Cerrar</span>
        <FaTimes className="w-3 h-3" />
      </button>
    </div>
  );
}

// Componente para manejar múltiples notificaciones
interface NotificationsProps {
  notifications: Array<{
    id: string;
    type: NotificationType;
    message: string;
  }>;
  onClose: (id: string) => void;
}

export function Notifications({ notifications, onClose }: NotificationsProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
} 