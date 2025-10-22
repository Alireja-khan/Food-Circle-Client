import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Register user in backend when component mounts
  useEffect(() => {
    if (user) {
      registerUser();
    }
  }, [user]);

  const registerUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/register-user', {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        userImage: user.photoURL
      });
      console.log('User registered for chat system');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
        transports: ['websocket', 'polling']
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('✅ Connected to server');
        
        // Join the application with consistent user ID
        newSocket.emit('user_joined', {
          userId: user.uid, // Always use Firebase UID
          userName: user.displayName || 'Anonymous',
          userEmail: user.email,
          userImage: user.photoURL
        });
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('❌ Disconnected from server');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setIsConnected(false);
      });

      // Active users management
      newSocket.on('active_users', (users) => {
        setActiveUsers(users);
      });

      newSocket.on('user_online', (userData) => {
        setActiveUsers(prev => {
          const exists = prev.find(u => u.userId === userData.userId);
          if (!exists) {
            return [...prev, userData];
          }
          return prev;
        });
      });

      newSocket.on('user_offline', (userData) => {
        setActiveUsers(prev => prev.filter(u => u.userId !== userData.userId));
      });

      // Message handling
      newSocket.on('receive_message', (message) => {
        // This will be handled in individual chat components
        console.log('Received message:', message);
      });

      // Notification system
      newSocket.on('new_message_notification', (notification) => {
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification(`New message from ${notification.senderName}`, {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      });

      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setActiveUsers([]);
        setNotifications([]);
        setUnreadCount(0);
      }
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    socket,
    isConnected,
    activeUsers,
    notifications,
    unreadCount,
    clearNotifications,
    connect: () => socket?.connect(),
    disconnect: () => socket?.disconnect()
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};