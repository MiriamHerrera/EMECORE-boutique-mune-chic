import { useEffect, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const colors = {
  danger: {
    icon: 'text-red-600',
    button: 'bg-red-600 hover:bg-red-700',
    title: 'text-red-900'
  },
  warning: {
    icon: 'text-yellow-600',
    button: 'bg-yellow-600 hover:bg-yellow-700',
    title: 'text-yellow-900'
  },
  info: {
    icon: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    title: 'text-blue-900'
  }
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'danger'
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const color = colors[type];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="relative z-50 rounded-lg shadow-xl p-0 backdrop:bg-black backdrop:bg-opacity-50"
      onClose={onCancel}
    >
      <div className="w-full max-w-lg bg-white rounded-lg">
        <div className="p-6">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${color.icon}`}>
              <FaExclamationTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className={`text-lg font-medium leading-6 ${color.title}`}>
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${color.button}`}
            onClick={() => {
              onConfirm();
              dialogRef.current?.close();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
} 