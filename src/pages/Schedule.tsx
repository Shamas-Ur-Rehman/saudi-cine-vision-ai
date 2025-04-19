
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Scheduler from '../components/Communication/Scheduler';

const Schedule = () => {
  const [nextSceneTime, setNextSceneTime] = useState('2h');
  
  useEffect(() => {
    // In a real app, this would be calculated based on the schedule data
    // For now, we use a static value
    setNextSceneTime('2h');
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Production Schedule</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-cinema-gold"></span>
            <span>Next Scene in {nextSceneTime}</span>
          </div>
        </div>
        <Scheduler />
      </div>
    </AppLayout>
  );
};

export default Schedule;
