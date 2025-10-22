import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useSocket } from '../contexts/SocketContext/SocketContext';
import useAuth from '../hooks/UseAuth';
import axios from 'axios';

const ChatList = ({ onOpenChat, onStartNewChat }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { activeUsers } = useSocket();

  useEffect(() => {
    fetchChatRooms();
  }, [user]);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat-rooms/${user.uid}`);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
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
      return 'Now';
    }
  };

  const filteredChats = chatRooms.filter(room =>
    room.otherUserId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loading loading-spinner loading-md text-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <button
          onClick={onStartNewChat}
          className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-white py-2.5 px-4 rounded-lg hover:from-lime-500 hover:to-lime-600 transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <FaPlus size={12} />
          New Chat
        </button>
      </div>

      {/* Chat Rooms List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FaSearch size={24} className="text-gray-300" />
            </div>
            <p className="text-sm mb-2">No conversations yet</p>
            <button 
              onClick={onStartNewChat}
              className="text-lime-500 hover:text-lime-600 text-sm font-medium"
            >
              Start chatting
            </button>
          </div>
        ) : (
          filteredChats.map(room => (
            <div
              key={room.roomId}
              onClick={() => onOpenChat(room)}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {room.otherUserId?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  {activeUsers.some(u => u.userId === room.otherUserId) && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      User {room.otherUserId?.substring(0, 8)}
                    </p>
                    {room.lastMessage && (
                      <span className="text-xs text-gray-400 ml-2">
                        {formatTime(room.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    {room.lastMessage ? (
                      <p className="text-xs text-gray-500 truncate">
                        {room.lastMessage.message}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No messages</p>
                    )}
                    {room.unreadCount > 0 && (
                      <span className="bg-lime-500 text-white text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center font-semibold ml-2">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;