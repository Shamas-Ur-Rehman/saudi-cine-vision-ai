
import React, { useState } from 'react';
import Sidebar from '../Navigation/Sidebar';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
          <button
            className="p-2 rounded-md md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <h1 className="text-xl font-semibold cinema-text-gradient hidden md:block">
            Saudi Cine Brain
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-cinema-navy/10 text-cinema-teal border border-cinema-teal/20">
              <span className="h-2 w-2 rounded-full bg-cinema-teal animate-pulse"></span>
              AI Assistant Active
            </div>
            
            <div className="h-9 w-9 rounded-full bg-cinema-highlight/20 border border-cinema-highlight/30 flex items-center justify-center text-cinema-highlight font-medium">
              SC
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
