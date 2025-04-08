'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHistory, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getChatHistory, deleteChatFromHistory, clearChatHistory, truncateText, formatDate } from '@/utils/utils';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // Load chat history on component mount
    const history = getChatHistory();
    setChatHistory(history);
  }, []);

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    if (deleteChatFromHistory(chatId)) {
      setChatHistory(getChatHistory());
    }
  };

  const handleClearHistory = () => {
    if (clearChatHistory()) {
      setChatHistory([]);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-12'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isOpen && <h2 className="text-xl font-bold text-white">Chat History</h2>}
          <button 
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {isOpen && (
          <div className="p-2">
            <button
              onClick={handleClearHistory}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors mb-4"
            >
              <FaTrash />
              <span>Clear History</span>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <FaHistory className="w-8 h-8 mx-auto mb-2" />
              <p>No chat history yet</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {chatHistory.map((chat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat?id=${chat.id}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      pathname === `/chat?id=${chat.id}`
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {truncateText(chat.title || chat.messages[0]?.content || 'New Chat', 30)}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(chat.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 