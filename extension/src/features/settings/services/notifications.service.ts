import { storageService } from '../../profile/services/storage.service';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
}

const STORAGE_KEY = 'visakit_notifications';

export const notificationsService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    const list = await storageService.get<NotificationItem[]>(STORAGE_KEY);
    return list || [];
  },

  addNotification: async (
    title: string,
    message: string,
    type: 'info' | 'warning' | 'success' = 'info'
  ): Promise<void> => {
    const list = await notificationsService.getNotifications();
    const newNotif: NotificationItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };
    await storageService.set(STORAGE_KEY, [newNotif, ...list]);
  },

  markAsRead: async (id: string): Promise<void> => {
    const list = await notificationsService.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    await storageService.set(STORAGE_KEY, updated);
  },

  clearNotifications: async (): Promise<void> => {
    await storageService.remove(STORAGE_KEY);
  },
};
