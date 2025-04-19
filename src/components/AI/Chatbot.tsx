
import React, { useState } from 'react';
import { Send, User, Bot, Loader } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Saudi Cine Brain assistant. How can I help you with your production today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Mock AI response - in a real app, this would call an AI API
    setTimeout(() => {
      let responseText = '';
      
      if (inputMessage.toLowerCase().includes('next shoot') || inputMessage.toLowerCase().includes('shooting')) {
        responseText = "Your next shoot is scheduled for today at 10:30 AM - Desert Chase Scene at Al Qudra Desert. 12 crew members are expected to attend. Would you like me to send you the detailed shot list?";
      } else if (inputMessage.toLowerCase().includes('script') || inputMessage.toLowerCase().includes('scene')) {
        responseText = "I found 4 scripts in the system. The most recently updated is 'Desert Chase Scene' (Scene 12), last modified 2 hours ago. Would you like me to send you the script or suggest some optimizations based on AI analysis?";
      } else if (inputMessage.toLowerCase().includes('schedule') || inputMessage.toLowerCase().includes('timing')) {
        responseText = "Today you have 3 scheduled events: Market Scene Setup (8:00 AM), Desert Chase Scene Filming (10:30 AM), and Actor Rehearsal (3:30 PM). Would you like to add a new event or modify an existing one?";
      } else {
        responseText = "I'm here to help with your production needs. You can ask me about shooting schedules, scene status, scripts, or crew coordination. How else can I assist you?";
      }

      const newBotMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsLoading(false);
    }, 1500);
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
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
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
            className="p-2 rounded-md bg-cinema-highlight text-white hover:bg-cinema-highlight/80 transition"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === '' || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition">
            When is the next shoot?
          </button>
          <button className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition">
            Show me today's schedule
          </button>
          <button className="text-xs px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal hover:bg-cinema-navy/20 transition">
            Find Desert Chase script
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
