
import React from 'react';

const DashboardStats = () => {
  const stats = [
    {
      label: 'Scenes',
      value: '24',
      subLabel: '8 completed',
      change: '+3 today',
      color: 'bg-cinema-teal/10 text-cinema-teal border-cinema-teal/20'
    },
    {
      label: 'Crew Members',
      value: '35',
      subLabel: '12 active now',
      change: '+2 this week',
      color: 'bg-cinema-highlight/10 text-cinema-highlight border-cinema-highlight/20'
    },
    {
      label: 'AI Analyses',
      value: '158',
      subLabel: '24 emotion insights',
      change: '+14 today',
      color: 'bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20'
    },
    {
      label: 'Scheduled Events',
      value: '18',
      subLabel: '3 today',
      change: 'Next in 2h',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="cinema-card p-4 flex flex-col"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${stat.color} border`}>{stat.change}</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-xs text-muted-foreground ml-2">{stat.subLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
