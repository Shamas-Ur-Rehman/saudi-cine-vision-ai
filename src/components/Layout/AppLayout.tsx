
import React, { useState } from 'react';
import Sidebar from '../Navigation/Sidebar';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-background to-cinema-blue/5">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
        <header className="h-16 flex items-center justify-between px-4 border-b border-cinema-blue/20 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-md hover:bg-cinema-blue/20 transition-colors md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/4ee004ca-ef74-4593-9461-0696910937a6.png"
                alt="SACB Logo"
                className="h-12 w-auto md:block"
              />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-cinema-blue via-cinema-highlight to-cinema-light-blue bg-clip-text text-transparent">
                Saudi Cine Brain
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-cinema-blue/20 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden md:flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-cinema-blue/10 text-cinema-blue border border-cinema-blue/20">
              <span className="h-2 w-2 rounded-full bg-cinema-highlight"></span>
              AI Assistant Active
            </div>
            
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cinema-blue/20 to-cinema-light-blue/20 border border-cinema-blue/30 flex items-center justify-center text-cinema-blue font-medium transition-transform hover:scale-105">
              SC
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-background via-background to-cinema-blue/5">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
