import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useSocket } from '../contexts/SocketContext/SocketContext';
import useAuth from '../hooks/UseAuth';

const NewChat = ({ onBack, onChatStarted, selectedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { activeUsers } = useSocket();

  useEffect(() => {
    if (selectedUser) {
      startChat(selectedUser);
    }
  }, [selectedUser]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const results = activeUsers.filter(activeUser => 
        activeUser.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activeUser.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const startChat = (otherUser) => {
    const roomId = [user.uid, otherUser.userId].sort().join('_');
    
    const room = {
      roomId,
      otherUserId: otherUser.userId,
      otherUserName: otherUser.userName
    };
    
    onChatStarted(room);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Selected donor info */}
      {selectedUser && (
        <div className="p-4 bg-lime-50 border-b border-lime-100">
          <p className="text-sm text-lime-700 font-medium">
            Starting chat with: {selectedUser.userName}
          </p>
        </div>
      )}

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search users..."
            disabled={!!selectedUser}
            className="w-full pl-9 pr-3 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!!selectedUser}
          className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-white py-2.5 px-4 rounded-lg hover:from-lime-500 hover:to-lime-600 transition-all font-medium text-sm disabled:opacity-50 shadow-md"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {selectedUser ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="loading loading-spinner loading-lg text-lime-500 mb-4"></div>
            <p className="text-sm text-gray-600">Starting chat with {selectedUser.userName}...</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-20">
            <div className="loading loading-spinner loading-md text-lime-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map(searchUser => (
            <div
              key={searchUser.userId}
              onClick={() => startChat(searchUser)}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  {searchUser.userName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{searchUser.userName}</p>
                  <p className="text-xs text-gray-500 truncate">{searchUser.userEmail}</p>
                </div>
                <span className="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
          ))
        ) : searchTerm ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4 text-center">
            <FaUserCircle size={48} className="mb-3 text-gray-300" />
            <p className="text-sm">No users found</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4 text-center">
            <FaSearch size={48} className="mb-3 text-gray-300" />
            <p className="text-sm">Search for users to start a chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewChat;