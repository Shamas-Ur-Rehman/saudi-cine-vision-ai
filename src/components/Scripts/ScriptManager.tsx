
import React from 'react';
import { FileText, Download, Search, User, Clock, Edit2 } from 'lucide-react';

const ScriptManager = () => {
  // Mock script data
  const scripts = [
    {
      id: 1,
      title: 'Desert Chase Scene',
      sceneNumber: 'Scene 12',
      lastUpdated: '2 hours ago',
      assignedTo: 'Ahmed Al-Farsi',
      status: 'Approved'
    },
    {
      id: 2,
      title: 'Market Conversation',
      sceneNumber: 'Scene 15',
      lastUpdated: '5 hours ago',
      assignedTo: 'Layla Hassan',
      status: 'In Review'
    },
    {
      id: 3,
      title: 'Palace Interior',
      sceneNumber: 'Scene 8',
      lastUpdated: 'Yesterday',
      assignedTo: 'Malik Ibrahim',
      status: 'Needs Revisions'
    },
    {
      id: 4,
      title: 'Final Confrontation',
      sceneNumber: 'Scene 24',
      lastUpdated: '3 days ago',
      assignedTo: 'Sarah Al-Mansour',
      status: 'Draft'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'In Review':
        return 'bg-cinema-highlight/10 text-cinema-highlight border-cinema-highlight/20';
      case 'Needs Revisions':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Draft':
        return 'bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="cinema-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">Script Management</h3>
        <p className="text-sm text-muted-foreground">Access and distribute scripts to your crew</p>
      </div>
      
      <div className="p-4 border-b border-border/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search scripts by title, scene number, or crew member..."
            className="w-full pl-9 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <ul className="divide-y divide-border/30">
          {scripts.map((script) => (
            <li key={script.id} className="p-3 hover:bg-muted/30 transition">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-cinema-navy/10 text-cinema-highlight flex items-center justify-center mr-3">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{script.title}</h4>
                      <span className="text-xs text-muted-foreground">{script.sceneNumber}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{script.lastUpdated}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{script.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(script.status)}`}>
                    {script.status}
                  </span>
                  <button className="p-1 rounded hover:bg-muted transition">
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded hover:bg-muted transition">
                    <Edit2 size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-border/30">
        <button className="flex items-center justify-center gap-2 bg-cinema-highlight text-white px-4 py-2 rounded-md hover:bg-cinema-highlight/80 transition w-full">
          <FileText size={16} />
          <span>Create New Script</span>
        </button>
      </div>
    </div>
  );
};

export default ScriptManager;
