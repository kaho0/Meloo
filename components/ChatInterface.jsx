import { useState, useEffect } from 'react';
import { getGeminiResponse } from '../utils/geminiApi';
import LoadingDots from './LoadingDots';
import { saveChatToHistory, getChatHistory, deleteChatFromHistory, generateId } from '../utils/utils';
// Icons for UI elements
import { FiUser, FiCpu, FiPlus, FiTrash2, FiChevronLeft, FiChevronRight, FiSend } from 'react-icons/fi';
import { BiCode } from 'react-icons/bi';
import { MdContentCopy } from 'react-icons/md';

// Predefined suggestions for quick access
const suggestions = {
  'Web Development': [
    'Explain React Hooks',
    'What is CSS Grid?',
    'How to use async/await?',
  ],
  'AI & Machine Learning': [
    'What is overfitting in ML?',
    'Explain neural networks',
    'What is transfer learning?',
  ],
  'Data Science': [
    'What is pandas?',
    'Explain data visualization',
    'What is feature engineering?',
  ],
  'General Science': [
    'What is quantum computing?',
    'Explain blockchain technology',
    'What is cloud computing?',
  ],
  'Programming': [
    'How to reverse a string in JavaScript?',
    'What is recursion?',
    'Explain object-oriented programming',
  ],
};

// Format message text with markdown-like syntax
function formatMessage(text) {
  // Format code blocks
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<div class="relative my-4 rounded-lg overflow-hidden shadow-lg">
      <div class="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div class="flex items-center gap-2">
          <BiCode class="w-4 h-4" />
          <span class="text-sm text-gray-300">${lang || 'code'}</span>
        </div>
        <button class="copy-button text-gray-400 hover:text-white transition-colors" data-code="${code.trim()}">
          <MdContentCopy class="w-4 h-4" />
        </button>
      </div>
      <pre class="bg-gray-900 p-4 overflow-x-auto"><code class="text-sm font-mono">${code.trim()}</code></pre>
    </div>`;
  });

  // Format inline code
  text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

  // Format bold text
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  
  // Format bullet points
  text = text.replace(/^\*(.*)/gm, '<li class="flex items-start gap-2 ml-4"><span class="mt-1.5">•</span><span>$1</span></li>');
  
  // Wrap lists in ul tags
  text = text.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="space-y-2 my-4">$1</ul>');
  
  return text;
}

export default function ChatInterface({ initialQuery, category }) {
  // State Management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Chat History Management
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load chat history on component mount
  useEffect(() => {
    const history = getChatHistory();
    setChatHistory(history || []);
  }, []);

  // Handle initial query if provided
  useEffect(() => {
    if (initialQuery) {
      handleSubmit(null, initialQuery);
    }

    // Setup code copy functionality
    const handleCopyClick = async (e) => {
      const button = e.target.closest('.copy-button');
      if (!button) return;

      const code = button.dataset.code;
      await navigator.clipboard.writeText(code);
      
      const index = Array.from(document.querySelectorAll('.copy-button')).indexOf(button);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, [initialQuery]);

  // Start a new chat
  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput('');
  };

  // Handle message submission
  const handleSubmit = async (e, query = input) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query.trim();
    setInput('');
    
    // Create new chat history entry if needed
    let chatId = currentChatId;
    if (!chatId) {
      chatId = generateId();
      const newChat = {
        id: chatId,
        title: userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : ''),
        timestamp: new Date().toISOString(),
        messages: []
      };
      
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(chatId);
    }

    // Add user message and get AI response
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMessage, isSimpleMode);
      const finalMessages = [...updatedMessages, { role: 'assistant', content: response }];
      setMessages(finalMessages);
      
      // Save chat to history
      const chatToSave = {
        id: chatId,
        title: userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : ''),
        timestamp: new Date().toISOString(),
        messages: finalMessages
      };
      
      saveChatToHistory(chatToSave);
      setChatHistory(getChatHistory() || []);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages([...updatedMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a chat from history
  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    if (deleteChatFromHistory(chatId)) {
      setChatHistory(getChatHistory() || []);
      if (currentChatId === chatId) {
        startNewChat();
      }
    }
  };

  // Get current category suggestions
  const currentSuggestions = category ? suggestions[category] || [] : [];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-900">
      {/* Sidebar Toggle Button */}
      <div 
        className="absolute top-4 left-0 z-10 transform transition-transform duration-300"
        style={{
          left: isSidebarOpen ? '260px' : '16px',
        }}
      >
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        >
          {isSidebarOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
        </button>
      </div>

      {/* Sidebar for Chat History */}
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden flex flex-col border-r border-gray-700 bg-gray-800"
        style={{ width: isSidebarOpen ? '280px' : '0px' }}
      >
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <FiPlus size={18} /> New Chat
          </button>
        </div>
        
        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto">
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map(chat => {
              // Skip invalid chat entries
              if (!chat || !chat.id) return null;
              
              return (
                <div
                  key={chat.id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                    currentChatId === chat.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => {
                    setCurrentChatId(chat.id);
                    setMessages(chat.messages || []);
                  }}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="text-sm text-gray-200 truncate font-medium">{chat.title}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-600"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-8 px-4">
              No chat history yet. Start a new conversation!
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                <FiCpu className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">AI Technical Assistant</h2>
              <p className="text-gray-400 max-w-md">Ask any technical question to get started.</p>
              
              {/* Quick suggestion buttons */}
              {currentSuggestions.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
                  {currentSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmit(null, suggestion)}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm px-3 py-2 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiCpu className="text-white" size={20} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-4 shadow-md ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-200'
                }`}
                dangerouslySetInnerHTML={{
                  __html: formatMessage(message.content)
                }}
              />
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiUser className="text-white" size={20} />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <FiCpu className="text-white" size={20} />
              </div>
              <div className="bg-gray-800 text-gray-200 rounded-lg p-5 shadow-md">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSimpleMode(!isSimpleMode)}
                className={`px-5 py-2 rounded-lg transition-colors font-medium ${
                  isSimpleMode
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isSimpleMode ? 'Simple Mode On' : 'Expert Mode'}
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a technical question..."
                  className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
              >
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}