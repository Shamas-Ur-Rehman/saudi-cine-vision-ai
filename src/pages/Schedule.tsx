
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Scheduler from '../components/Communication/Scheduler';

const Schedule = () => {
  const [nextSceneTime, setNextSceneTime] = useState('2h');
  const [upcomingScene, setUpcomingScene] = useState({
    title: 'Desert Chase Scene',
    time: '2h',
    location: 'Al Qudra Desert'
  });
  
  useEffect(() => {
    // In a real app, this would be calculated based on the schedule data
    setNextSceneTime('2h');
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Production Schedule</h1>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
              <span className="h-2 w-2 rounded-full bg-cinema-gold animate-pulse"></span>
              <div className="flex flex-col">
                <span className="font-medium">Next: {upcomingScene.title}</span>
                <span className="text-xs text-muted-foreground">
                  In {nextSceneTime} at {upcomingScene.location}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Scheduler />
      </div>
    </AppLayout>
  );
};

export default Schedule;
