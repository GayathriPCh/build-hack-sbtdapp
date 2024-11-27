// components/Toast.tsx

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Toast will disappear after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 max-w-xs p-4 rounded-lg shadow-lg text-white ${
        type === 'success'
          ? 'bg-green-500'
          : type === 'error'
          ? 'bg-red-500'
          : 'bg-blue-500'
      }`}
    >
      <div className="flex items-center">
        <div className="flex-1">{message}</div>
        <button
          className="ml-4 p-1"
          onClick={onClose}
          style={{ background: 'transparent', border: 'none' }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
