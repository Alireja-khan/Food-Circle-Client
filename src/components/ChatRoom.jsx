import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext/SocketContext';
import useAuth from '../hooks/UseAuth';
import axios from 'axios';

const ChatRoom = ({ room, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    joinRoom();

    // Listen for incoming messages
    socket?.on('receive_message', handleNewMessage);
    socket?.on('user_typing', handleTyping);

    return () => {
      socket?.off('receive_message', handleNewMessage);
      socket?.off('user_typing', handleTyping);
    };
  }, [socket, room.roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${room.roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const joinRoom = () => {
    socket?.emit('join_chat', {
      userId: user.uid,
      otherUserId: room.otherUserId
    });
  };

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
    
    // Mark as read if it's from other user
    if (message.senderId !== user.uid) {
      socket?.emit('mark_messages_read', {
        roomId: room.roomId,
        userId: user.uid
      });
    }
  };

  const handleTyping = (data) => {
    setIsTyping(data.isTyping);
    setTypingUser(data.userName);
    
    if (data.isTyping) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId: room.roomId,
      senderId: user.uid,
      senderName: user.displayName,
      senderImage: user.photoURL,
      message: newMessage.trim()
    };

    socket?.emit('send_message', messageData);
    setNewMessage('');
    
    // Stop typing indicator
    socket?.emit('typing_stop', { roomId: room.roomId, userName: user.displayName });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Start typing indicator
    if (!typingTimeoutRef.current) {
      socket?.emit('typing_start', { roomId: room.roomId, userName: user.displayName });
    }

    // Clear existing timeout
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit('typing_stop', { roomId: room.roomId, userName: user.displayName });
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-3">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          ←
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {room.otherUserId?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="font-semibold text-sm">User {room.otherUserId?.substring(0, 8)}</p>
          {isTyping && (
            <p className="text-xs text-gray-500">{typingUser} is typing...</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 ${
                message.senderId === user.uid
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;