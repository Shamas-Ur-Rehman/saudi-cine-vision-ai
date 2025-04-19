
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { BarChart } from 'lucide-react';

const Analytics = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Production Analytics</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-cinema-teal"></span>
            <span>Processing Data</span>
          </div>
        </div>
        
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <BarChart className="w-16 h-16 mx-auto text-muted-foreground/40" />
            <h2 className="text-xl font-semibold">Analytics Coming Soon</h2>
            <p className="text-muted-foreground">
              Track efficiency and visualize your production workflow
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
