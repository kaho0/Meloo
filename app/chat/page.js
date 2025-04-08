'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';

function ChatContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const initialQuery = searchParams.get('query');

  return (
    <ChatInterface 
      category={category} 
      initialQuery={initialQuery}
    />
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading chat...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
} 