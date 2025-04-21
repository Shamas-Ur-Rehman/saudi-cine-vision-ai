import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, AlertCircle, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';

const Scheduler = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'today' | 'tomorrow' | 'week'>('today');
  
  // Updated mock schedule data with requested locations
  const allScheduleItems = [
    {
      id: 1,
      title: 'Desert Chase Scene Filming',
      time: '10:30 AM - 2:00 PM',
      location: 'Riyadh',
      participants: 12,
      priority: 'High',
      date: new Date(),
    },
    {
      id: 2,
      title: 'Market Scene Setup',
      time: '8:00 AM - 10:00 AM',
      location: 'Al-Khobar',
      participants: 8,
      priority: 'Medium',
      date: new Date(),
    },
    {
      id: 3,
      title: 'Actor Rehearsal - Palace Scene',
      time: '3:30 PM - 5:30 PM',
      location: 'Jeddah',
      participants: 5,
      priority: 'Medium',
      date: new Date(),
    },
    {
      id: 4,
      title: 'Script Review Meeting',
      time: '9:00 AM - 10:30 AM',
      location: 'Riyadh',
      participants: 6,
      priority: 'Normal',
      date: addDays(new Date(), 1),
    },
    {
      id: 5,
      title: 'Final Scene Filming',
      time: '11:00 AM - 5:00 PM',
      location: 'Jeddah',
      participants: 15,
      priority: 'High',
      date: addDays(new Date(), 1),
    },
    {
      id: 6,
      title: 'Weekly Production Meeting',
      time: '2:00 PM - 3:30 PM',
      location: 'Al-Khobar',
      participants: 10,
      priority: 'Medium',
      date: addDays(new Date(), 2),
    },
    {
      id: 7,
      title: 'Location Scouting',
      time: '9:00 AM - 1:00 PM',
      location: 'Riyadh',
      participants: 4,
      priority: 'Normal',
      date: addDays(new Date(), 3),
    }
  ];

  // Filter items based on view mode
  const scheduleItems = allScheduleItems.filter(item => {
    const itemDate = item.date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = addDays(today, 1);
    
    if (viewMode === 'today') {
      return itemDate.getDate() === today.getDate() && 
             itemDate.getMonth() === today.getMonth() && 
             itemDate.getFullYear() === today.getFullYear();
    } else if (viewMode === 'tomorrow') {
      return itemDate.getDate() === tomorrow.getDate() && 
             itemDate.getMonth() === tomorrow.getMonth() && 
             itemDate.getFullYear() === tomorrow.getFullYear();
    } else {
      // Week view - show all items within next 7 days
      const nextWeek = addDays(today, 7);
      return itemDate >= today && itemDate < nextWeek;
    }
  });

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsCalendarOpen(false);
      // In a real app, you would filter the schedule items based on the selected date
    }
  };

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

  // Get today's schedule
  const todayItems = scheduleItems.filter(item => 
    viewMode === 'today' || (item.date.getDate() === new Date().getDate() && 
    item.date.getMonth() === new Date().getMonth() && 
    item.date.getFullYear() === new Date().getFullYear())
  );

  // Get upcoming schedule (items not today)
  const upcomingItems = scheduleItems.filter(item => 
    viewMode !== 'today' || !(item.date.getDate() === new Date().getDate() && 
    item.date.getMonth() === new Date().getMonth() && 
    item.date.getFullYear() === new Date().getFullYear())
  );

  return (
    <div className="cinema-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">Production Schedule</h3>
        <p className="text-sm text-muted-foreground">Manage filming schedule and crew coordination</p>
      </div>

      <div className="p-4 border-b border-border/30">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'today' ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-muted/50 transition'}`}
              onClick={() => setViewMode('today')}
            >
              Today
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'tomorrow' ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-muted/50 transition'}`}
              onClick={() => setViewMode('tomorrow')}
            >
              Tomorrow
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${viewMode === 'week' ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-muted/50 transition'}`}
              onClick={() => setViewMode('week')}
            >
              This Week
            </button>
          </div>
          <button 
            className="flex items-center justify-center gap-1 px-3 py-1 text-sm rounded-md bg-cinema-highlight text-white hover:bg-cinema-highlight/80 transition"
            onClick={() => setIsCalendarOpen(true)}
          >
            <CalendarIcon size={14} />
            <span>View Calendar</span>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4">
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <AlertCircle size={14} className="text-cinema-highlight" />
          {viewMode === 'today' ? "Today's Schedule" : viewMode === 'tomorrow' ? "Tomorrow's Schedule" : "This Week's Schedule"}
        </h4>
        
        {viewMode === 'today' && (
          <div className="space-y-3 mb-6">
            {todayItems.length > 0 ? (
              todayItems.map((item) => (
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
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">No events scheduled for today</div>
            )}
          </div>
        )}
        
        {(viewMode === 'tomorrow' || viewMode === 'week') && (
          <div className="space-y-3 mb-6">
            {upcomingItems.length > 0 ? (
              upcomingItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition bg-card/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{item.title}</h5>
                      <div className="text-xs text-muted-foreground">
                        {format(item.date, 'EEEE, MMMM d')}
                      </div>
                    </div>
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
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No events scheduled for {viewMode === 'tomorrow' ? 'tomorrow' : 'this week'}
              </div>
            )}
          </div>
        )}
        
        {viewMode === 'today' && upcomingItems.length > 0 && (
          <>
            <h4 className="font-medium text-sm mb-3">Upcoming Schedule</h4>
            <div className="space-y-3">
              {upcomingItems.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition bg-card/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{item.title}</h5>
                      <div className="text-xs text-muted-foreground">
                        {format(item.date, 'EEEE, MMMM d')}
                      </div>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Production Calendar</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleCalendarSelect}
              className={cn("p-3 pointer-events-auto")}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scheduler;
