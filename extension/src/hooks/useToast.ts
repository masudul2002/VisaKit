import { useState, useEffect, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toastQueue: Toast[] = [];

export const showToast = (
  message: string,
  type: 'success' | 'warning' | 'error' | 'info' = 'success',
  duration?: number
) => {
  const id = Math.random().toString(36).substring(2, 9);
  const dur = duration || (type === 'success' ? 3000 : type === 'warning' ? 5000 : 8000);
  const newToast: Toast = { id, message, type, duration: dur };

  toastQueue = [...toastQueue, newToast].slice(-3); // Limit to maximum 3 visible
  toastListeners.forEach((l) => l(toastQueue));

  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    toastListeners.forEach((l) => l(toastQueue));
  }, dur);
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>(toastQueue);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToasts(newToasts);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    toastListeners.forEach((l) => l(toastQueue));
  }, []);

  return { toasts, dismissToast };
};
