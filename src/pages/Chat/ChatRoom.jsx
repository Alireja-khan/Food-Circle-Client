import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaPaperPlane, FaEllipsisV, FaCheck, FaCheckDouble, FaImage, FaSmile, FaPaperclip, FaComments, FaSearch } from 'react-icons/fa';
import { useSocket } from '../../contexts/SocketContext/SocketContext';
import useAuth from '../../hooks/UseAuth';
import axios from 'axios';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { initialMessages, error } = useLoaderData();
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const sentMessageIdsRef = useRef(new Set());

  const { socket, activeUsers } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (error) {
      console.error('Error loading chat:', error);
    }

    joinRoom();
    identifyOtherUser();
    fetchChatRooms();

    socket?.on('receive_message', handleNewMessage);
    socket?.on('user_typing', handleTyping);
    socket?.on('new_message_notification', fetchChatRooms);

    markMessagesAsRead();

    return () => {
      socket?.off('receive_message', handleNewMessage);
      socket?.off('user_typing', handleTyping);
      socket?.off('new_message_notification', fetchChatRooms);
    };
  }, [socket, roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat-rooms/${user.uid}`);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const joinRoom = () => {
    socket?.emit('join_chat', { roomId });
  };

  const identifyOtherUser = () => {
    const users = roomId.split('_');
    const otherUserId = users.find(id => id !== user.uid);

    setOtherUser({
      userId: otherUserId,
      userName: otherUserId,
      userImage: null
    });
  };

  const handleNewMessage = (message) => {
    if (message.roomId === roomId) {
      const isOwnMessage = message.senderId === user.uid;
      const isDuplicate = sentMessageIdsRef.current.has(message._id);
      
      if (isOwnMessage && isDuplicate) {
        setMessages(prev => prev.map(msg => 
          msg.temp && msg.message === message.message && msg.senderId === user.uid
            ? { ...message, status: 'sent' }
            : msg
        ));
        sentMessageIdsRef.current.delete(message._id);
      } else if (!isOwnMessage) {
        setMessages(prev => [...prev, message]);
        markMessagesAsRead();
      }
    }
  };

  const handleTyping = (data) => {
    if (data.roomId === roomId && data.userName !== user.displayName) {
      setIsTyping(data.isTyping);
      setTypingUser(data.userName);

      if (data.isTyping) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/messages/${roomId}/read`, {
        userId: user.uid
      });
      socket?.emit('messages_read', { roomId, userId: user.uid });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    const messageData = {
      roomId,
      senderId: user.uid,
      senderName: user.displayName,
      senderImage: user.photoURL,
      message: newMessage.trim(),
      timestamp: new Date()
    };

    try {
      setIsSending(true);
      
      const tempId = `temp_${Date.now()}`;
      
      const tempMessage = { 
        ...messageData, 
        _id: tempId, 
        temp: true,
        status: 'sending'
      };
      
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      socket?.emit('typing_stop', { roomId, userName: user.displayName });

      socket?.emit('send_message', messageData, (response) => {
        if (response?.success) {
          if (response.message._id) {
            sentMessageIdsRef.current.add(response.message._id);
          }
          setMessages(prev => prev.map(msg => 
            msg._id === tempId 
              ? { ...response.message, status: 'sent' }
              : msg
          ));
        }
      });

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.map(msg => 
        msg._id === tempId ? { ...msg, status: 'error' } : msg
      ));
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    if (value.trim() && !typingTimeoutRef.current) {
      socket?.emit('typing_start', { roomId, userName: user.displayName });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit('typing_stop', { roomId, userName: user.displayName });
      typingTimeoutRef.current = null;
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageStatusIcon = (message) => {
    if (message.temp) {
      if (message.status === 'error') {
        return ' • Failed';
      }
      return '';
    }
    
    if (message.status === 'read') {
      return <FaCheckDouble className="text-blue-400 ml-1" size={12} />;
    } else if (message.status === 'delivered') {
      return <FaCheckDouble className="text-gray-400 ml-1" size={12} />;
    }
    return <FaCheck className="text-gray-400 ml-1" size={12} />;
  };

  const filteredChats = chatRooms.filter(room =>
    room.otherUserName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex" style={{ height: '85vh' }}>
          {/* Left Sidebar - Chat List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate('/chat')}
                    className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center text-white hover:bg-lime-600 transition-colors"
                  >
                    <FaArrowLeft size={16} />
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
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisV size={12} />
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((room) => (
                <div
                  key={room.roomId}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                    room.roomId === roomId ? 'border-lime-500 bg-lime-50' : 'border-transparent'
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
                            {room.lastMessage.message}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No messages yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                      {otherUser?.userName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    {activeUsers.some(u => u.userId === otherUser?.userId) && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-base">
                      {otherUser?.userName || 'User'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {isTyping ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-lime-500"
                        >
                          typing...
                        </motion.span>
                      ) : (
                        activeUsers.some(u => u.userId === otherUser?.userId) ? 'Online' : 'Offline'
                      )}
                    </p>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisV />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => {
                  const isOwn = message.senderId === user.uid;
                  const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId;
                  
                  return (
                    <motion.div
                      key={message._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {!isOwn && (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${showAvatar ? '' : 'invisible'}`}>
                          {message.senderName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                      
                      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                        {showAvatar && !isOwn && (
                          <span className="text-xs text-gray-500 mb-1 ml-1">
                            {message.senderName || 'User'}
                          </span>
                        )}
                        <div
                          className={`max-w-md rounded-2xl px-4 py-3 ${
                            isOwn
                              ? 'bg-gradient-to-br from-lime-400 to-lime-500 text-white shadow-md'
                              : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                          } ${
                            message.status === 'error' 
                              ? 'bg-red-500 text-white' 
                              : message.temp 
                              ? 'opacity-80' 
                              : ''
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          <div className={`flex items-center justify-end mt-1.5 text-xs gap-1 ${
                            isOwn ? 'text-lime-100' : 'text-gray-400'
                          }`}>
                            <span>{formatTime(message.timestamp)}</span>
                            {isOwn && getMessageStatusIcon(message)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && typingUser !== user.displayName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-semibold">
                    {typingUser?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
                    <div className="flex space-x-1.5">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FaPaperclip size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FaImage size={20} />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Write your message..."
                    disabled={isSending}
                    className="w-full bg-gray-100 rounded-xl px-5 py-3.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:opacity-50"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaSmile size={20} />
                  </button>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="bg-gradient-to-br from-lime-400 to-lime-500 text-white rounded-xl w-12 h-12 flex items-center justify-center hover:from-lime-500 hover:to-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  {isSending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <FaPaperPlane size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;