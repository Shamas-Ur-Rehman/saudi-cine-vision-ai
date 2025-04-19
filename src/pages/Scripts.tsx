
import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import ScriptManager from '../components/Scripts/ScriptManager';

const Scripts = () => {
  // This would normally come from a context or a data fetch
  const activeScriptsCount = 4; // You could make this dynamic based on the ScriptManager data

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
