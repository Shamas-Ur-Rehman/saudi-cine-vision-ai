
import React from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';

const Scheduler = () => {
  // Mock schedule data
  const scheduleItems = [
    {
      id: 1,
      title: 'Desert Chase Scene Filming',
      time: '10:30 AM - 2:00 PM',
      location: 'Al Qudra Desert',
      participants: 12,
      priority: 'High',
      today: true
    },
    {
      id: 2,
      title: 'Market Scene Setup',
      time: '8:00 AM - 10:00 AM',
      location: 'Old Dubai Market Set',
      participants: 8,
      priority: 'Medium',
      today: true
    },
    {
      id: 3,
      title: 'Actor Rehearsal - Palace Scene',
      time: '3:30 PM - 5:30 PM',
      location: 'Studio B',
      participants: 5,
      priority: 'Medium',
      today: true
    },
    {
      id: 4,
      title: 'Script Review Meeting',
      time: '9:00 AM - 10:30 AM',
      location: 'Conference Room',
      participants: 6,
      priority: 'Normal',
      today: false
    },
    {
      id: 5,
      title: 'Final Scene Filming',
      time: '11:00 AM - 5:00 PM',
      location: 'Dubai Marina',
      participants: 15,
      priority: 'High',
      today: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Medium':
        return 'bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20';
      case 'Normal':
        return 'bg-cinema-teal/10 text-cinema-teal border-cinema-teal/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="cinema-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">Production Schedule</h3>
        <p className="text-sm text-muted-foreground">Manage filming schedule and crew coordination</p>
      </div>

      <div className="p-4 border-b border-border/30">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary border border-primary/20">
              Today
            </button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-muted/50 transition">
              Tomorrow
            </button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-muted/50 transition">
              This Week
            </button>
          </div>
          <button className="flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md bg-cinema-highlight text-white hover:bg-cinema-highlight/80 transition">
            <Calendar size={14} />
            <span>View Calendar</span>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4">
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <AlertCircle size={14} className="text-cinema-highlight" />
          Today's Schedule
        </h4>
        
        <div className="space-y-3 mb-6">
          {scheduleItems.filter(item => item.today).map((item) => (
            <div 
              key={item.id}
              className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <h5 className="font-medium">{item.title}</h5>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Users size={12} />
                  <span>{item.participants} crew members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h4 className="font-medium text-sm mb-3">Upcoming Schedule</h4>
        
        <div className="space-y-3">
          {scheduleItems.filter(item => !item.today).map((item) => (
            <div 
              key={item.id}
              className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition bg-card/50"
            >
              <div className="flex justify-between items-start">
                <h5 className="font-medium">{item.title}</h5>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Users size={12} />
                  <span>{item.participants} crew members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
