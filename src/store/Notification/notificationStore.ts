import { create } from "zustand";
import {
  Notification,
  NotificationService,
} from "../../__mocks__/NotificationsMock/mockNotifications";

// 🔰 Define the shape of the Zustand store
type NotificationStore = {
  notifications: Notification[];
  unseenCount: number;

  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  addNotification: (notif: Notification) => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unseenCount: 0,

  // ✅ Load all notifications (initial + polling)
  fetchNotifications: async () => {
    const data = await NotificationService.getAll();
    set({
      notifications: data,
      unseenCount: data.filter((n) => !n.isRead).length,
    });
  },

  // ✅ Mark notification as read
  markAsRead: async (id) => {
    await NotificationService.markAsRead(id);
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n,
    );

    set({
      notifications: updated,
      unseenCount: updated.filter((n) => !n.isRead).length,
    });
  },

  // ✅ Add new notification (real-time push support)
  addNotification: (notif) => {
    const current = get().notifications;
    const updated = [notif, ...current];

    set({
      notifications: updated,
      unseenCount: updated.filter((n) => !n.isRead).length,
    });
  },
}));
