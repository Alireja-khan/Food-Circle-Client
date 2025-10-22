import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import { PiChatCircleTextLight } from "react-icons/pi";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:from-lime-500 hover:to-lime-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PiChatCircleTextLight size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <ChatWindow onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;