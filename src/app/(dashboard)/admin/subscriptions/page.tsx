'use client';

import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DollarSign, Users, ArrowUpRight, TrendingUp, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 12400 },
  { name: 'Feb', revenue: 14200 },
  { name: 'Mar', revenue: 18500 },
  { name: 'Apr', revenue: 22100 },
  { name: 'May', revenue: 26800 },
  { name: 'Jun', revenue: 32400 },
  { name: 'Jul', revenue: 38900 },
];

const SUBSCRIPTION_DATA = [
  { name: 'Free', value: 9240, color: '#94a3b8' },
  { name: 'Pro', value: 2850, color: '#3b82f6' },
  { name: 'Enterprise', value: 399, color: '#8b5cf6' },
];

const RECENT_TRANSACTIONS = [
  { id: 'tx_1', user: 'Studio Alpha', plan: 'Enterprise (Yearly)', amount: '$2,400', date: 'Today, 2:45 PM', status: 'completed' },
  { id: 'tx_2', user: 'Dev Team X', plan: 'Pro (Monthly)', amount: '$29', date: 'Today, 11:20 AM', status: 'completed' },
  { id: 'tx_3', user: 'Builder Pro', plan: 'Pro (Monthly)', amount: '$29', date: 'Yesterday, 4:15 PM', status: 'completed' },
  { id: 'tx_4', user: 'Mega Games', plan: 'Enterprise (Monthly)', amount: '$249', date: 'Yesterday, 9:00 AM', status: 'completed' },
  { id: 'tx_5', user: 'Indie Dev', plan: 'Pro (Monthly)', amount: '$29', date: 'Aug 12, 2:30 PM', status: 'failed' },
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Subscriptions & Revenue</h1>
        <p className="text-slate-400 mt-1">Monitor MRR, plan distribution, and billing events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Monthly Recurring Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-2">$38,900</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +20.1%</span>
            <span className="text-slate-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Active Subscriptions</p>
              <h3 className="text-3xl font-bold text-white mt-2">3,249</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12%</span>
            <span className="text-slate-500 ml-2">new upgrades</span>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Churn Rate (30d)</p>
              <h3 className="text-3xl font-bold text-white mt-2">2.4%</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-400 flex items-center">-0.5%</span>
            <span className="text-slate-500 ml-2">improvement</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white">Revenue Growth</h3>
            <Button variant="outline" size="sm" className="bg-[#1a1a24] border-white/10 text-slate-300">
              Export CSV
            </Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', borderColor: '#ffffff20', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#111118' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg p-5">
          <h3 className="font-semibold text-white mb-6">Plan Distribution</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SUBSCRIPTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {SUBSCRIPTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {SUBSCRIPTION_DATA.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                  <span className="text-sm text-slate-300">{plan.name}</span>
                </div>
                <span className="text-sm font-medium text-white">{plan.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/5 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a24] text-slate-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RECENT_TRANSACTIONS.map((tx, i) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-200">{tx.user}</td>
                  <td className="px-6 py-4 text-slate-300">{tx.plan}</td>
                  <td className="px-6 py-4 text-slate-200">{tx.amount}</td>
                  <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                      tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
