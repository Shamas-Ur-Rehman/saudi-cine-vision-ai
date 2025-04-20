
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader, AlertCircle } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Chatbot = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    setError(null);
    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      await sendMessage(messageToSend);
      
      toast({
        title: "Message sent",
        description: "Your message is being processed by the AI assistant.",
        duration: 2000,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again.");
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="cinema-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-cinema-highlight/20 border border-cinema-highlight/30 flex items-center justify-center text-cinema-highlight">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold">Saudi Cine Brain Assistant</h3>
            <p className="text-xs text-muted-foreground">Intelligent production assistant</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-3 space-y-3">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Bot size={40} className="mx-auto mb-2 opacity-50" />
              <p>No messages yet. Start a conversation!</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center p-3 mb-3 bg-destructive/10 text-destructive rounded-md">
            <AlertCircle size={16} className="mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-cinema-highlight text-white' 
                  : 'bg-muted border border-border/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'user' ? (
                  <User size={14} />
                ) : (
                  <Bot size={14} />
                )}
                <span className="text-xs opacity-80">
                  {message.sender === 'user' ? 'You' : 'SACB Assistant'}
                </span>
                <span className="text-xs opacity-60 ml-auto">
                  {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted border border-border/50">
              <div className="flex items-center gap-2">
                <Bot size={14} />
                <span className="text-xs opacity-80">SACB Assistant</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                </div>
                <p className="text-sm text-gray-400">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-border/30">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Ask about schedules, scripts, scenes, or crew..."
            className="flex-grow rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            disabled={isLoading}
          />
          <button 
            className="p-2 rounded-md bg-cinema-highlight text-white hover:bg-cinema-highlight/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === '' || isLoading}
            aria-label="Send message"
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button 
            onClick={() => setInputMessage("When is the next shoot?")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
            disabled={isLoading}
          >
            When is the next shoot?
          </button>
          <button 
            onClick={() => setInputMessage("Show me today's schedule")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
            disabled={isLoading}
          >
            Show me today's schedule
          </button>
          <button 
            onClick={() => setInputMessage("Who's responsible for the Desert Chase scene?")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
            disabled={isLoading}
          >
            Find Desert Chase details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
