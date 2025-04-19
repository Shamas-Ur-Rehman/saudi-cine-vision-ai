
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader } from 'lucide-react';
import { useChat } from '@/hooks/use-chat';
import { useToast } from '@/hooks/use-toast';

const Chatbot = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    sendMessage(inputMessage);
    setInputMessage('');
    
    toast({
      title: "Message sent",
      description: "Your message is being processed by the AI assistant.",
      duration: 2000,
    });
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
              <div className="flex items-center gap-2 mt-1">
                <Loader size={14} className="animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-border/30">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about schedules, scripts, scenes, or crew..."
            className="flex-grow rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          />
          <button 
            className="p-2 rounded-md bg-cinema-highlight text-white hover:bg-cinema-highlight/80 transition disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === '' || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button 
            onClick={() => setInputMessage("When is the next shoot?")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
          >
            When is the next shoot?
          </button>
          <button 
            onClick={() => setInputMessage("Show me today's schedule")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
          >
            Show me today's schedule
          </button>
          <button 
            onClick={() => setInputMessage("Who's responsible for the Desert Chase scene?")}
            className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition"
          >
            Find Desert Chase details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
