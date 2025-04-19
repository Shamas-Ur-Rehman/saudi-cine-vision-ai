
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Film, Users, Calendar, MessageSquare, Settings, BarChart, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border/30">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-cinema-highlight" />
          <span className="font-bold text-lg">SACB</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4">
        <div className="px-3 pb-2">
          <h3 className="text-xs font-medium text-sidebar-foreground/60 tracking-wider uppercase">
            Main
          </h3>
        </div>
        
        <NavItem to="/" icon={<Home size={18} />} label="Dashboard" active />
        <NavItem to="/visualization" icon={<Film size={18} />} label="Scene Visualization" />
        <NavItem to="/scripts" icon={<FileText size={18} />} label="Scripts" />
        <NavItem to="/schedule" icon={<Calendar size={18} />} label="Schedule" />
        <NavItem to="/crew" icon={<Users size={18} />} label="Crew" />
        <NavItem to="/ai-assistant" icon={<MessageSquare size={18} />} label="AI Assistant" />
        
        <div className="px-3 py-2 mt-4">
          <h3 className="text-xs font-medium text-sidebar-foreground/60 tracking-wider uppercase">
            Reports
          </h3>
        </div>
        
        <NavItem to="/analytics" icon={<BarChart size={18} />} label="Analytics" />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>

      {/* Pro Feature Teaser */}
      <div className="p-4">
        <div className="p-3 rounded-lg bg-sidebar-accent/50 backdrop-blur-sm border border-sidebar-border/50">
          <p className="text-xs font-medium mb-2">Upgrade to SACB Pro</p>
          <p className="text-xs text-sidebar-foreground/70 mb-3">
            Get advanced AI features and analytics
          </p>
          <button className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-cinema-highlight/80 text-white hover:bg-cinema-highlight transition">
            Upgrade Now
          </button>
        </div>
      </div>
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
