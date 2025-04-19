
import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import ScriptManager from '../components/Scripts/ScriptManager';

const Scripts = () => {
  const [activeScriptsCount, setActiveScriptsCount] = useState(4);
  
  useEffect(() => {
    // In a real application, this would come from a context or API
    // For now, we'll just use a static count
    setActiveScriptsCount(4);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Script Management</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-cinema-teal"></span>
            <span>{activeScriptsCount} Active Scripts</span>
          </div>
        </div>
        <ScriptManager />
      </div>
    </AppLayout>
  );
};

export default Scripts;
