'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_LOGS = Array.from({ length: 50 }).map((_, i) => {
  const levels = ['info', 'info', 'info', 'warn', 'error', 'debug'];
  const services = ['api-gateway', 'auth-service', 'database', 'webhook-worker'];
  
  const level = levels[Math.floor(Math.random() * levels.length)];
  const service = services[Math.floor(Math.random() * services.length)];
  
  const messages = {
    info: 'Request processed successfully',
    warn: 'Rate limit approaching for client ID 9942',
    error: 'Connection timeout connecting to replica DB-2',
    debug: 'Cache miss for key user:1029:permissions',
  };
  
  const date = new Date(Date.now() - Math.floor(Math.random() * 10000000));
  
  return {
    id: `log_${50-i}`,
    timestamp: date.toISOString(),
    level,
    service,
    message: messages[level as keyof typeof messages] + ` [req_id: req_${Math.random().toString(36).substr(2, 6)}]`
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export default function AdminLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? log.level === filterLevel : true;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-amber-400';
      case 'debug': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Logs</h1>
          <p className="text-slate-400 mt-1">View and search application logs across all services.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#111118] border-white/10 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-[#1a1a24]">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Search logs (e.g., req_id, service name)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[#111118] border-white/10 text-white w-full font-mono text-sm"
            />
          </div>
          <div className="flex gap-2">
            {(['info', 'warn', 'error', 'debug'] as const).map(level => (
              <Button 
                key={level}
                variant="outline" 
                size="sm"
                onClick={() => setFilterLevel(filterLevel === level ? null : level)}
                className={`border-white/10 ${filterLevel === level ? 'bg-white/10 text-white' : 'bg-[#111118] text-slate-400'} uppercase text-xs tracking-wider`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm bg-[#0a0a0f]">
          <div className="space-y-1">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex gap-4 hover:bg-white/[0.03] p-1 rounded px-2">
                <span className="text-slate-500 shrink-0">
                  {new Date(log.timestamp).toISOString().replace('T', ' ').substring(0, 23)}
                </span>
                <span className={`uppercase w-12 shrink-0 ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-slate-400 w-32 shrink-0 truncate">
                  [{log.service}]
                </span>
                <span className="text-slate-300 break-all">
                  {log.message}
                </span>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="text-center text-slate-500 py-10 flex flex-col items-center">
                <Terminal className="w-8 h-8 mb-2 opacity-20" />
                No logs found matching your filters.
              </div>
            )}
          </div>
        </div>
        
        <div className="p-2 border-t border-white/5 bg-[#1a1a24] text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {filteredLogs.length} events</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live tailing enabled
          </span>
        </div>
      </div>
    </div>
  );
}
