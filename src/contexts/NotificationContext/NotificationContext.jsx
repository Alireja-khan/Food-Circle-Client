import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from '../SocketContext/SocketContext';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // Listen for food notifications
      socket.on('food_notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification('New Food Added! 🍔', {
            body: notification.message,
            icon: notification.foodImage || '/favicon.ico',
            tag: 'food-notification'
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('food_notification');
      }
    };
  }, [socket]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.foodId !== id));
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    markAsRead();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const value = {
    notifications,
    unreadCount,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    clearNotifications,
    removeNotification,
    markAsRead
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};