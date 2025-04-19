
import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { Users, Search, UserPlus, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Unavailable';
}

interface AddMemberForm {
  name: string;
  role: string;
  email: string;
  phone: string;
}

const Crew = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const form = useForm<AddMemberForm>();
  
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

  const handleAddMember = (data: AddMemberForm) => {
    const newMember: CrewMember = {
      id: crewMembers.length + 1,
      ...data,
      status: 'Active'
    };

    setCrewMembers([...crewMembers, newMember]);
    setIsDialogOpen(false);
    form.reset();
    
    toast({
      title: "Success",
      description: "New crew member has been added successfully.",
    });
  };

  const handleStatusChange = (memberId: number, newStatus: CrewMember['status']) => {
    setCrewMembers(members => 
      members.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );

    toast({
      title: "Status Updated",
      description: "Crew member status has been updated successfully.",
    });
  };

  const filteredCrew = crewMembers.filter(member => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.phone.toLowerCase().includes(query)
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-cinema-highlight hover:bg-cinema-highlight/80">
                    <UserPlus size={16} />
                    <span>Add Member</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Crew Member</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter role" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email" type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Add Member</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="p-4 border-b border-border/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search crew members by name, role, email, or phone..."
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(member.status)}`}>
                        {member.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Active')}>
                        Set as Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'On Leave')}>
                        Set as On Leave
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Unavailable')}>
                        Set as Unavailable
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

