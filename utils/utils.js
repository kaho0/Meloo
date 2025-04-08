import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Chat history utilities
export function saveChatToHistory(chat) {
  try {
    const history = getChatHistory();
    const updatedHistory = [chat, ...history].slice(0, 50); // Keep only the last 50 chats
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error saving chat to history:', error);
    return false;
  }
}

export function getChatHistory() {
  try {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
}

export function clearChatHistory() {
  try {
    localStorage.removeItem('chatHistory');
    return true;
  } catch (error) {
    console.error('Error clearing chat history:', error);
    return false;
  }
}

export function deleteChatFromHistory(chatId) {
  try {
    const history = getChatHistory();
    const updatedHistory = history.filter(chat => chat.id !== chatId);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error deleting chat from history:', error);
    return false;
  }
}

// Other utility functions
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}
