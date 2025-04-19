
import React, { useState } from 'react';
import { Send, User, Bot, Loader } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Mock production data
const productionData = {
  actors: {
    'Remas': { currentScene: 'Desert Chase Scene', nextScene: 'Market Scene', schedule: '10:30 AM' },
    'Dana': { currentScene: 'Market Scene', nextScene: 'Palace Interior', schedule: '2:00 PM' },
    'Hager': { currentScene: 'Palace Interior', nextScene: 'Final Scene', schedule: '3:30 PM' },
    'Ahmad': { currentScene: 'Desert Chase Scene', nextScene: 'Market Scene', schedule: '10:30 AM' },
    'Mohammed': { currentScene: 'Market Scene', nextScene: 'Final Scene', schedule: '2:00 PM' }
  },
  scenes: {
    'Desert Chase Scene': {
      location: 'Al Qudra Desert',
      time: '10:30 AM',
      status: 'In Progress',
      responsiblePerson: 'Ahmad',
      actors: ['Remas', 'Ahmad']
    },
    'Market Scene': {
      location: 'Old Dubai Market Set',
      time: '2:00 PM',
      status: 'Pending',
      responsiblePerson: 'Mohammed',
      actors: ['Dana', 'Mohammed']
    },
    'Palace Interior': {
      location: 'Studio B',
      time: '3:30 PM',
      status: 'Pending',
      responsiblePerson: 'Hager',
      actors: ['Hager']
    }
  }
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

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Next shoot query
    if (lowerMessage.includes('next shoot') || lowerMessage.includes('next scene')) {
      return "The next shoot is the Desert Chase Scene at Al Qudra Desert at 10:30 AM with Remas and Ahmad.";
    }
    
    // Scene status query
    if (lowerMessage.includes('scene status') || lowerMessage.includes('scenes left')) {
      return "Today's remaining scenes:\n1. Market Scene (2:00 PM) - Pending\n2. Palace Interior (3:30 PM) - Pending\nDesert Chase Scene is currently in progress.";
    }
    
    // Actor responsibility query
    if (lowerMessage.includes('responsible') || lowerMessage.includes('who is in charge')) {
      if (lowerMessage.includes('desert')) return "Ahmad is responsible for the Desert Chase Scene";
      if (lowerMessage.includes('market')) return "Mohammed is responsible for the Market Scene";
      if (lowerMessage.includes('palace')) return "Hager is responsible for the Palace Interior Scene";
      return "Please specify which scene you're asking about.";
    }
    
    // Location query
    if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      if (lowerMessage.includes('next')) return "The next shooting location is Al Qudra Desert for the Desert Chase Scene";
      return "Today's locations:\n- Al Qudra Desert (Desert Chase Scene)\n- Old Dubai Market Set (Market Scene)\n- Studio B (Palace Interior)";
    }
    
    // Schedule query
    if (lowerMessage.includes('schedule') || lowerMessage.includes('timing')) {
      return "Today's Schedule:\n10:30 AM - Desert Chase Scene (Remas, Ahmad)\n2:00 PM - Market Scene (Dana, Mohammed)\n3:30 PM - Palace Interior (Hager)";
    }
    
    // Actor query
    if (lowerMessage.includes('actor') || productionData.actors[message.trim()]) {
      const actorName = Object.keys(productionData.actors).find(name => 
        lowerMessage.includes(name.toLowerCase())
      );
      if (actorName) {
        const actor = productionData.actors[actorName];
        return `${actorName} is currently assigned to ${actor.currentScene} at ${actor.schedule}. Their next scene will be ${actor.nextScene}.`;
      }
    }

    return "I can help you with:\n- Next shoot details\n- Scene status\n- Scene responsibilities\n- Shooting locations\n- Actor schedules\nPlease ask me about any of these topics!";
  };

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

    // Simulate AI response time
    setTimeout(() => {
      const responseText = generateResponse(inputMessage);
      
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsLoading(false);
    }, 1000);
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
