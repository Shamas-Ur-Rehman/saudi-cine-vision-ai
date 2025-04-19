
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-cinema-highlight"></span>
            <span>App Settings</span>
          </div>
        </div>
        
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <SettingsIcon className="w-16 h-16 mx-auto text-muted-foreground/40" />
            <h2 className="text-xl font-semibold">Settings Coming Soon</h2>
            <p className="text-muted-foreground">
              Configure your app preferences and account settings
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
