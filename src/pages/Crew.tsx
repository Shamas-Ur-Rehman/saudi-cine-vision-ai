
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Users } from 'lucide-react';

const Crew = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Crew Management</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            <span>12 Active Members</span>
          </div>
        </div>
        
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Users className="w-16 h-16 mx-auto text-muted-foreground/40" />
            <h2 className="text-xl font-semibold">Crew Management Coming Soon</h2>
            <p className="text-muted-foreground">
              Organize and communicate with your production team efficiently
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Crew;
