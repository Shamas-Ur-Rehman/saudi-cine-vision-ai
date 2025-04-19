
import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Users, Search, UserPlus, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Unavailable';
}

const Crew = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock crew data with Saudi names
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([
    {
      id: 1,
      name: 'Ahmad',
      role: 'Director',
      email: 'ahmad@saudicinebrain.com',
      phone: '+966 50 123 4567',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Remas',
      role: 'Lead Actor',
      email: 'remas@saudicinebrain.com',
      phone: '+966 55 234 5678',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Dana',
      role: 'Script Supervisor',
      email: 'dana@saudicinebrain.com',
      phone: '+966 54 345 6789',
      status: 'On Leave'
    },
    {
      id: 4,
      name: 'Mohammed',
      role: 'Cinematographer',
      email: 'mohammed@saudicinebrain.com',
      phone: '+966 56 456 7890',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Hager',
      role: 'Production Manager',
      email: 'hager@saudicinebrain.com',
      phone: '+966 59 567 8901',
      status: 'Active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'On Leave':
        return 'bg-cinema-gold/10 text-cinema-gold border-cinema-gold/20';
      case 'Unavailable':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filteredCrew = crewMembers.filter(member => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query)
    );
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Crew Management</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            <span>{crewMembers.filter(m => m.status === 'Active').length} Active Members</span>
          </div>
        </div>

        <div className="cinema-card">
          <div className="p-4 border-b border-border/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Crew Directory</h3>
                <p className="text-sm text-muted-foreground">Manage your production team members</p>
              </div>
              <button 
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "The ability to add new crew members will be available soon.",
                  });
                }}
                className="flex items-center gap-2 bg-cinema-highlight text-white px-4 py-2 rounded-md hover:bg-cinema-highlight/80 transition"
              >
                <UserPlus size={16} />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-border/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search crew members by name or role..."
                className="w-full pl-9 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {filteredCrew.map((member) => (
              <div key={member.id} className="p-4 hover:bg-muted/30 transition">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-cinema-navy/10 text-cinema-highlight flex items-center justify-center">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={12} />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Crew;
