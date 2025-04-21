
import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, addDays, isSameDay, isWithinInterval } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

type Scene = {
  id: string;
  title: string;
  description?: string | null;
  location: string;
  start_time: string;
  end_time: string;
  priority: string;
  participants: number;
};

const Scheduler = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'today' | 'tomorrow' | 'week'>('today');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch scenes from Supabase
    async function fetchScenes() {
      setLoading(true);
      const { data, error } = await supabase
        .from('scenes')
        .select('*')
        .in('location', ['Riyadh', 'Jeddah', 'Al-Khobar']);
      if (!error && data) {
        setScenes(data as Scene[]);
      }
      setLoading(false);
    }
    fetchScenes();
  }, []);

  // View mode date calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDays(today, 1);

  // Filter scenes based on selected view mode
  const filteredScenes = scenes.filter(scene => {
    const sceneDate = new Date(scene.start_time);
    if (viewMode === 'today') {
      return isSameDay(sceneDate, today);
    }
    if (viewMode === 'tomorrow') {
      return isSameDay(sceneDate, tomorrow);
    }
    // week: include all scenes starting today up to 7 days ahead
    const weekEnd = addDays(today, 7);
    return isWithinInterval(sceneDate, { start: today, end: weekEnd });
  });

  // Today's and upcoming scenes logic
  const todayScenes = filteredScenes.filter(scene => isSameDay(new Date(scene.start_time), today));
  const upcomingScenes = filteredScenes.filter(scene => !isSameDay(new Date(scene.start_time), today));

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsCalendarOpen(false);
      // Optionally, update viewMode or filter by exact date
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
          {viewMode === 'today'
            ? "Today's Schedule"
            : viewMode === 'tomorrow'
            ? "Tomorrow's Schedule"
            : "This Week's Schedule"}
        </h4>

        {loading ? (
          <div className="text-center py-6 text-muted-foreground">Loading schedule...</div>
        ) : viewMode === 'today' ? (
          <div className="space-y-3 mb-6">
            {todayScenes.length > 0 ? (
              todayScenes.map(item => (
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
                      <span>{format(new Date(item.start_time), "h:mm a") + " - " + format(new Date(item.end_time), "h:mm a")}</span>
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
        ) : (
          <div className="space-y-3 mb-6">
            {upcomingScenes.length > 0 ? (
              upcomingScenes.map(item => (
                <div
                  key={item.id}
                  className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition bg-card/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{item.title}</h5>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(item.start_time), 'EEEE, MMMM d')}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock size={12} />
                      <span>{format(new Date(item.start_time), "h:mm a") + " - " + format(new Date(item.end_time), "h:mm a")}</span>
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

        {viewMode === 'today' && upcomingScenes.length > 0 && (
          <>
            <h4 className="font-medium text-sm mb-3">Upcoming Schedule</h4>
            <div className="space-y-3">
              {upcomingScenes.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className="p-3 border border-border/50 rounded-md hover:border-cinema-highlight/30 hover:shadow-sm transition bg-card/50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{item.title}</h5>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(item.start_time), 'EEEE, MMMM d')}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock size={12} />
                      <span>{format(new Date(item.start_time), "h:mm a") + " - " + format(new Date(item.end_time), "h:mm a")}</span>
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
