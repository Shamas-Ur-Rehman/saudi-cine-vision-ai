
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import type { Database } from '@/integrations/supabase/types';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type ChatMessageResponse = Database['public']['Tables']['chat_messages']['Row'];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial messages
    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('chat-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select()
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      if (data) {
        // Transform the data to match our Message type
        const transformedMessages = data.map(msg => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender as 'user' | 'bot',
          timestamp: new Date(msg.timestamp)
        }));

        setMessages(transformedMessages);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const sendMessage = async (text: string) => {
    setIsLoading(true);
    
    // Add user message to UI immediately
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      // Use the Supabase edge function URL
      const response = await fetch('https://agqixwckqnvbdiqfdgii.supabase.co/functions/v1/ai-chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Use the anon key instead of trying to get an auth token
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncWl4d2NrcW52YmRpcWZkZ2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTQ4NTEsImV4cCI6MjA2MDYzMDg1MX0.C-lw4Uggv3EAsWvguL6uXkQMnmi7tXO0-bed3zfU2d4'
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // The bot message will be added through the subscription
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
