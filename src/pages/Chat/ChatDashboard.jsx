import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaUserPlus, FaExclamationTriangle, FaEllipsisV, FaImage, FaFile, FaChartBar } from 'react-icons/fa';
import { useSocket } from '../../contexts/SocketContext/SocketContext';
import useAuth from '../../hooks/UseAuth';
import axios from 'axios';
import { PiChatCircleTextLight } from "react-icons/pi";

const ChatDashboard = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const { socket, activeUsers } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchChatRooms();
      fetchUnreadCount();
    }

    socket?.on('new_message_notification', () => {
      fetchChatRooms();
      fetchUnreadCount();
    });

    return () => {
      socket?.off('new_message_notification');
    };
  }, [socket, user]);

  const fetchChatRooms = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/chat-rooms/${user.uid}`);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      setError(error.response?.data?.error || 'Failed to load chat rooms');
      setChatRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/unread-count/${user.uid}`);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      setUnreadCount(0);
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 24 * 60 * 60 * 1000) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      return 'Just now';
    }
  };

  const startNewChat = () => {
    console.log('Start new chat functionality');
  };

  const filteredChats = chatRooms.filter(room =>
    room.otherUserName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-lime-500 mb-4"></div>
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FaExclamationTriangle className="mx-auto text-red-500 text-4xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Chats</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={fetchChatRooms}
              className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex" style={{ height: '85vh' }}>
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center text-white hover:bg-lime-600 transition-colors">
                    <PiChatCircleTextLight size={18} />
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">Chat</h1>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisV />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>

            {/* Last Chats Header */}
            <div className="px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-600">Last chats</h3>
              <div className="flex gap-2">
                <button
                  onClick={startNewChat}
                  className="w-6 h-6 bg-lime-500 rounded-md flex items-center justify-center text-white hover:bg-lime-600 transition-colors"
                >
                  <span className="text-lg leading-none">+</span>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisV size={12} />
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <PiChatCircleTextLight className="mx-auto text-gray-300 text-4xl mb-3" />
                  <p className="text-gray-500 text-sm mb-4">No conversations yet</p>
                  <button
                    onClick={startNewChat}
                    className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600 transition-colors text-sm"
                  >
                    Start Chatting
                  </button>
                </div>
              ) : (
                filteredChats.map((room) => (
                  <motion.div
                    key={room.roomId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                      room.unreadCount > 0 ? 'border-lime-500 bg-lime-50' : 'border-transparent'
                    }`}
                    onClick={() => navigate(`/chat/${room.roomId}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                          {room.otherUserName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        {activeUsers.some(u => u.userId === room.otherUserId) && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {room.otherUserName}
                          </h3>
                          {room.lastMessage && (
                            <span className="text-xs text-gray-400 ml-2">
                              {formatTime(room.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          {room.lastMessage ? (
                            <p className="text-xs text-gray-500 truncate">
                              {room.lastMessage.senderId === user.uid && 'You: '}
                              {room.lastMessage.message}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 italic">No messages yet</p>
                          )}
                          {room.unreadCount > 0 && (
                            <div className="bg-lime-500 text-white text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center font-semibold ml-2">
                              {room.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Side - Empty State or Instructions */}
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiChatCircleTextLight className="text-lime-500 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a conversation</h3>
              <p className="text-gray-500 text-sm">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;