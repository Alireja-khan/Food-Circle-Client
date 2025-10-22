import React from 'react';
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext/NotificationContext';

const NotificationIcon = () => {
  const { unreadCount, openDrawer } = useNotification();

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openDrawer}
        className="btn btn-ghost btn-circle relative"
      >
        <FaBell className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default NotificationIcon;