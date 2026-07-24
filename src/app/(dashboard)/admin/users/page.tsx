'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle,
  XCircle,
  Edit2,
  Ban,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_USERS = [
  { id: '1', name: 'Alex Developer', email: 'alex@studio.com', role: 'admin', plan: 'enterprise', status: 'active', created: '2023-11-12' },
  { id: '2', name: 'Sarah Studio', email: 'sarah@roblox.com', role: 'user', plan: 'pro', status: 'active', created: '2024-01-05' },
  { id: '3', name: 'Mike Builder', email: 'mike@dev.io', role: 'user', plan: 'free', status: 'suspended', created: '2024-02-20' },
  { id: '4', name: 'Team Alpha', email: 'team@alpha.gg', role: 'moderator', plan: 'pro', status: 'active', created: '2024-03-15' },
  { id: '5', name: 'David Games', email: 'david@games.net', role: 'user', plan: 'free', status: 'active', created: '2024-04-02' },
  { id: '6', name: 'Emma Creator', email: 'emma@creator.co', role: 'user', plan: 'enterprise', status: 'active', created: '2024-05-11' },
  { id: '7', name: 'James Script', email: 'james@script.io', role: 'user', plan: 'free', status: 'active', created: '2024-06-01' },
  { id: '8', name: 'Olivia Dev', email: 'olivia@dev.net', role: 'moderator', plan: 'pro', status: 'suspended', created: '2024-06-25' },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">User Management</h1>
        <p className="text-slate-400 mt-1">Manage platform users, roles, and access.</p>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg flex flex-col">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[#1a1a24] border-white/10 text-white w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-[#1a1a24] border-white/10 text-slate-300 hover:text-white hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              Add User
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a24] text-slate-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                      user.role === 'admin' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      user.role === 'moderator' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {user.role === 'admin' && <ShieldAlert className="w-3 h-3 mr-1" />}
                      {user.role === 'moderator' && <Shield className="w-3 h-3 mr-1" />}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                      user.plan === 'enterprise' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                      user.plan === 'pro' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={user.status === 'active' ? 'text-emerald-400' : 'text-red-400'}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStatus(user.id)}
                        className={`h-8 w-8 ${user.status === 'active' ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'}`}
                        title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400">
          <div>Showing 1 to {filteredUsers.length} of {users.length} entries</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-[#1a1a24] border-white/10" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-[#1a1a24] border-white/10">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
