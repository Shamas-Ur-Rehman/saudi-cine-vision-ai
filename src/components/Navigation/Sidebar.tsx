
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Users, Calendar, MessageSquare, Settings, BarChart, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-sidebar via-sidebar to-cinema-highlight/10 text-sidebar-foreground">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-cinema-highlight/30 bg-cinema-highlight/5">
        <Link to="/" className="flex items-center gap-3 px-3 animate-float">
          <img 
            src="/lovable-uploads/4ee004ca-ef74-4593-9461-0696910937a6.png"
            alt="SACB Logo"
            className="h-8 w-auto transition-transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-none">
        <div className="px-3 pb-2">
          <h3 className="text-xs font-medium text-sidebar-foreground/60 tracking-wider uppercase">
            Main
          </h3>
        </div>
        
        <NavItem to="/" icon={<Home size={18} />} label="Dashboard" active={location.pathname === '/'} />
        <NavItem to="/visualization" icon={<Film size={18} />} label="Scene Visualization" active={location.pathname === '/visualization'} />
        <NavItem to="/scripts" icon={<FileText size={18} />} label="Scripts" active={location.pathname === '/scripts'} />
        <NavItem to="/schedule" icon={<Calendar size={18} />} label="Schedule" active={location.pathname === '/schedule'} />
        <NavItem to="/crew" icon={<Users size={18} />} label="Crew" active={location.pathname === '/crew'} />
        <NavItem to="/ai-assistant" icon={<MessageSquare size={18} />} label="AI Assistant" active={location.pathname === '/ai-assistant'} />
        
        <div className="px-3 py-2 mt-4">
          <h3 className="text-xs font-medium text-sidebar-foreground/60 tracking-wider uppercase">
            Reports
          </h3>
        </div>
        
        <NavItem to="/analytics" icon={<BarChart size={18} />} label="Analytics" active={location.pathname === '/analytics'} />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === '/settings'} />
      </nav>

      {/* Pro Feature Teaser */}
      {/* Removed Upgrade to SACB Pro section as requested */}
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-md transition-colors ${
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
      }`}
    >
      <span className="text-sidebar-foreground/70">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cinema-highlight"></span>
      )}
    </Link>
  );
};

export default Sidebar;

