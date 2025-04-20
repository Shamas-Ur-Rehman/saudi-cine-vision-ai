
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Users, Calendar, MessageSquare, Settings, BarChart, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo Section - Made bigger */}
      <div className="flex items-center justify-center h-24 border-b border-sidebar-border bg-sidebar-accent/5">
        <Link to="/" className="flex items-center gap-3 px-3">
          <img 
            src="/lovable-uploads/4ee004ca-ef74-4593-9461-0696910937a6.png"
            alt="SACB Logo"
            className="h-16 w-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-none">
        <div className="px-3 pb-2">
          <h3 className="text-xs font-medium text-sidebar-foreground/80 tracking-wider uppercase">
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
          <h3 className="text-xs font-medium text-sidebar-foreground/80 tracking-wider uppercase">
            Reports
          </h3>
        </div>
        
        <NavItem to="/analytics" icon={<BarChart size={18} />} label="Analytics" active={location.pathname === '/analytics'} />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === '/settings'} />
      </nav>

      {/* Pro Feature Teaser */}
      <div className="p-4">
        <div className="p-3 rounded-lg bg-sidebar-accent/20 backdrop-blur-sm border border-sidebar-border/30">
          <p className="text-xs font-medium mb-2 text-white">Upgrade to SACB Pro</p>
          <p className="text-xs text-sidebar-foreground/70 mb-3">
            Get advanced AI features and analytics
          </p>
          <button className="w-full px-3 py-1.5 text-xs font-medium rounded-md bg-white text-sidebar-accent hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02]">
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
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
      }`}
    >
      <span className="text-sidebar-foreground/90">{icon}</span>
      <span className="text-sm">{label}</span>
      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white"></span>
      )}
    </Link>
  );
};

export default Sidebar;
