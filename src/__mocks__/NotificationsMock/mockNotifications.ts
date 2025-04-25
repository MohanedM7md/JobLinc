import type { Notification } from "@/types/Notification";

let mockNotifications: Notification[] = [
  {
    id: 1,
    type: "message",
    content: "Hana received a message from Leonie.",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    messagePreview: "Hey Hana, just wanted to say hi! 😊",
    isRead: false,
  },
];

let nextId = 2;

let listeners: ((notification: Notification) => void)[] = [];

export const NotificationService = {
  getAll: (): Promise<Notification[]> =>
    new Promise((resolve) => {
      setTimeout(() => resolve([...mockNotifications]), 300);
    }),

  markAsRead: (id: number): Promise<void> =>
    new Promise((resolve) => {
      mockNotifications = mockNotifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      resolve();
    }),

  /** 🔔 Push new fake notification every X seconds (simulate backend push) */
  pushNewRandom: () => {
    const newNotif: Notification = {
      id: nextId++,
      type: "like",
      content: `User ${nextId} liked your post.`,
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      isRead: false,
    };

    mockNotifications.unshift(newNotif);

    // Trigger all listeners
    listeners.forEach((cb) => cb(newNotif));
  },

  /** 🔄 Subscribe to live push (simulate WebSocket) */
  onNewNotification: (cb: (n: Notification) => void) => {
    listeners.push(cb);
  },
};
