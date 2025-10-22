import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPaperPlane, FaSmile, FaPaperclip, FaImage, FaTimes, FaArrowLeft } from 'react-icons/fa';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import NewChat from './NewChat';
import useAuth from '../hooks/UseAuth';

const ChatWindow = ({ onClose }) => {
  const [activeView, setActiveView] = useState('list');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const selectedDonor = localStorage.getItem('selectedDonorForChat');
    if (selectedDonor) {
      const donor = JSON.parse(selectedDonor);
      setSelectedUser(donor);
      setActiveView('new');
      localStorage.removeItem('selectedDonorForChat');
    }
  }, []);

  const handleStartNewChat = (user) => {
    setSelectedUser(user);
    setActiveView('new');
  };

  const handleOpenChat = (room) => {
    setCurrentRoom(room);
    setActiveView('room');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setCurrentRoom(null);
    setSelectedUser(null);
  };

  const handleChatStarted = (room) => {
    setCurrentRoom(room);
    setActiveView('room');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
      style={{ height: '600px' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-400 to-lime-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {activeView !== 'list' && (
            <button
              onClick={handleBackToList}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <FaArrowLeft size={16} />
            </button>
          )}
          <h3 className="font-semibold text-base">
            {activeView === 'list' && 'Messages'}
            {activeView === 'room' && 'Chat'}
            {activeView === 'new' && 'New Message'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {activeView === 'list' && (
          <ChatList 
            onOpenChat={handleOpenChat}
            onStartNewChat={() => setActiveView('new')}
          />
        )}
        
        {activeView === 'room' && currentRoom && (
          <ChatRoom 
            room={currentRoom}
            onBack={handleBackToList}
          />
        )}
        
        {activeView === 'new' && (
          <NewChat 
            selectedUser={selectedUser}
            onBack={handleBackToList}
            onChatStarted={handleChatStarted}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ChatWindow;