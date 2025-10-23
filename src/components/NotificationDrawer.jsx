import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext/NotificationContext';
import { FiX, FiTrash2, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import { IoFastFoodOutline } from 'react-icons/io5';

const NotificationDrawer = () => {
  const {
    notifications,
    isDrawerOpen,
    closeDrawer,
    clearNotifications,
    removeNotification
  } = useNotification();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-[2000]"
            onClick={closeDrawer}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-xl z-[2001] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="btn btn-ghost btn-sm text-gray-500 hover:text-red-500"
                    title="Clear all"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={closeDrawer}
                  className="btn btn-ghost btn-sm text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                  <IoFastFoodOutline className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-center">No notifications yet</p>
                  <p className="text-sm text-center mt-2">
                    You'll get notified when new foods are added
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {notifications.map((notification) => (
                    <motion.div
                      key={`${notification.foodId}-${notification.timestamp}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-green-200 transition-colors"
                    >
                      <div className="flex gap-3">
                        {/* Food Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={notification.foodImage}
                            alt={notification.foodName}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48?text=Food';
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {notification.foodName}
                            </h3>
                            <button
                              onClick={() => removeNotification(notification.foodId)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FiUser className="w-3 h-3" />
                              <span className="truncate">{notification.donorName}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <IoFastFoodOutline className="w-3 h-3" />
                              <span>Quantity: {notification.quantity}</span>
                              <span className="mx-1">•</span>
                              <span className="capitalize">{notification.category}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <FiMapPin className="w-3 h-3" />
                              <span className="truncate">{notification.pickupLocation}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <FiClock className="w-3 h-3" />
                              <span>{formatTime(notification.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={clearNotifications}
                  className="w-full btn btn-outline btn-sm text-gray-600 hover:text-red-600"
                >
                  Clear All Notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;