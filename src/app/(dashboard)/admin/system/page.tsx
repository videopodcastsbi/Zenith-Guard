'use client';

import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Server, Database, Shield, Activity, Cpu, HardDrive, Clock, CheckCircle2 } from 'lucide-react';

const REQUESTS_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 5000) + 10000,
}));

const ERROR_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  errors: Math.floor(Math.random() * 50) + 5,
}));

const SERVICES = [
  { name: 'API Gateway', status: 'operational', latency: '24ms', uptime: '99.99%', icon: Server },
  { name: 'Primary Database', status: 'operational', latency: '12ms', uptime: '99.95%', icon: Database },
  { name: 'Auth Service', status: 'operational', latency: '45ms', uptime: '99.99%', icon: Shield },
  { name: 'Event Processor', status: 'operational', latency: '8ms', uptime: '99.90%', icon: Activity },
  { name: 'Webhook Dispatcher', status: 'operational', latency: '120ms', uptime: '99.85%', icon: Activity },
  { name: 'Cache Layer', status: 'operational', latency: '2ms', uptime: '99.99%', icon: Database },
];

export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Health</h1>
        <p className="text-slate-400 mt-1">Real-time infrastructure monitoring and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">CPU Usage</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-white">42%</h3>
              <span className="text-xs text-emerald-400 mb-1">Normal</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Memory</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-white">68%</h3>
              <span className="text-xs text-emerald-400 mb-1">16.4GB</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Database Load</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-white">24%</h3>
              <span className="text-xs text-emerald-400 mb-1">Stable</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">System Uptime</p>
            <div className="flex items-end gap-2">
              <h3 className="text-xl font-bold text-white">45d 12h</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-white mb-6">API Requests (24h)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REQUESTS_DATA} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', borderColor: '#ffffff20', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-white mb-6">Error Rate (24h)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ERROR_DATA} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', borderColor: '#ffffff20', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="font-semibold text-white">Services Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 border-b border-white/5 last:border-0 flex-wrap">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 lg:border-b-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1a1a24] rounded-md border border-white/5">
                      <Icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <h4 className="font-medium text-slate-200">{service.name}</h4>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Latency</p>
                    <p className="text-sm font-medium text-slate-300">{service.latency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Uptime</p>
                    <p className="text-sm font-medium text-emerald-400">{service.uptime}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
