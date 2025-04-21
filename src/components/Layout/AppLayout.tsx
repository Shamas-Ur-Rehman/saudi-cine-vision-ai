import React, { useState } from 'react';
import Sidebar from '../Navigation/Sidebar';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AppLayoutProps {
  children: React.ReactNode;
}

const sidebarBgLight = "bg-[#212442]"; // deep purple/blue from screenshot
const sidebarBgDark = "bg-[#181826]"; // dark version for night
const mainBgLight = "bg-[#F4F8FB]"; // light background from screenshot
const mainBgDark = "bg-[#0f1122]"; // dark main/background from screenshot

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Make topbar stick and ensure background uses your color
  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? mainBgDark : mainBgLight} transition-colors duration-150`}>
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${theme === "dark" ? sidebarBgDark : sidebarBgLight} border-r border-[#292B4B]
      `}>
        <div className="flex flex-col h-full justify-between">
          {/* Sidebar Logo (BIG, no animation) */}
          <div className="pt-10 pb-4 flex flex-col items-center">
            <img
              src="/lovable-uploads/4ee004ca-ef74-4593-9461-0696910937a6.png"
              alt="SACB Logo"
              className="h-24 w-auto" // Bigger logo
              style={{ filter: theme === "dark" ? "brightness(1.2)" : undefined }}
            />
            <h1 className="mt-3 text-2xl font-bold text-white tracking-wider">Saudi Cine Brain</h1>
          </div>
          {/* Sidebar content (menu) */}
          <Sidebar />
          <div className="mb-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className={`h-16 flex items-center justify-between px-6 border-b border-[#292B4B] ${theme === "dark" ? "bg-[#181826]" : "bg-[#212442]"} transition-colors`}>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-md hover:bg-[#292B4B] text-white transition-colors md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              {/* No logo in topbar, only in sidebar */}
              <h1 className="text-2xl font-extrabold text-white tracking-wider">
                Saudi Cine Brain
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-[#292B4B] text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0A8ED8] to-[#64E6FB] border border-[#292B4B] flex items-center justify-center text-[#0A8ED8] font-extrabold text-xl">
              SC
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-0 md:p-10 ${theme === "dark" ? mainBgDark : mainBgLight} min-h-0`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
