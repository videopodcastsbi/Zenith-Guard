'use client';

import { motion } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  Activity, 
  AlertTriangle,
  Server,
  Database,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { name: 'Total Users', value: '12,489', change: '+12%', icon: Users, trend: 'up' },
  { name: 'Active Subs', value: '3,210', change: '+5%', icon: CreditCard, trend: 'up' },
  { name: 'API Requests (24h)', value: '14.2M', change: '+18%', icon: Activity, trend: 'up' },
  { name: 'Error Rate', value: '0.12%', change: '-0.05%', icon: AlertTriangle, trend: 'down' },
];

const SYSTEM_HEALTH = [
  { service: 'API Gateway', status: 'operational', latency: '24ms', icon: Server },
  { service: 'Database', status: 'operational', latency: '12ms', icon: Database },
  { service: 'Auth Service', status: 'operational', latency: '45ms', icon: Shield },
  { service: 'Webhook Processor', status: 'degraded', latency: '1.2s', icon: Activity },
];

const RECENT_AUDIT_LOGS = [
  { id: 1, action: 'User Suspended', user: 'admin@zenith.com', target: 'player_xyz', time: '10 mins ago', type: 'warning' },
  { id: 2, action: 'API Key Revoked', user: 'admin@zenith.com', target: 'key_prod_992', time: '1 hour ago', type: 'danger' },
  { id: 3, action: 'Plan Upgrade', user: 'system', target: 'studio_alpha', time: '2 hours ago', type: 'info' },
  { id: 4, action: 'System Update', user: 'system', target: 'v2.4.1 deployed', time: '5 hours ago', type: 'info' },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-lg p-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Admin Control Panel
          </h1>
          <p className="text-sm text-slate-400 mt-1">Superuser access only. Actions here affect the global system.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 font-medium">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.trend === 'up' && stat.icon !== AlertTriangle ? 'bg-emerald-500/10 text-emerald-400' : stat.icon === AlertTriangle ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={stat.trend === 'up' && stat.icon !== AlertTriangle ? 'text-emerald-400' : stat.trend === 'down' && stat.icon === AlertTriangle ? 'text-emerald-400' : 'text-red-400'}>
                  {stat.change}
                </span>
                <span className="text-slate-500 ml-2">vs last week</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111118] border border-white/5 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-white">System Health</h3>
            <Link href="/admin/system" className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {SYSTEM_HEALTH.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.service} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1a1a24] rounded-md border border-white/5">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{service.service}</p>
                      <p className="text-xs text-slate-500">Latency: {service.latency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      {service.status === 'operational' && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${service.status === 'operational' ? 'bg-emerald-500' : service.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    </span>
                    <span className="text-xs capitalize text-slate-400">{service.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111118] border border-white/5 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-semibold text-white">Recent Audit Logs</h3>
            <Link href="/admin/logs" className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {RECENT_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    log.type === 'danger' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    log.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {log.action}
                  </span>
                  <span className="text-xs text-slate-500">{log.time}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-slate-300"><span className="text-slate-500">By:</span> {log.user}</p>
                  <p className="text-sm text-slate-300 truncate max-w-[150px]"><span className="text-slate-500">Target:</span> {log.target}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
