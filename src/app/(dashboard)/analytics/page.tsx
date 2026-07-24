"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon, ShieldAlert, Activity, Target, Zap } from "lucide-react";

// Generate proper mock data for charts
const generateChartData = () => {
  return Array.from({ length: 7 }).map((_, i) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return {
      name: days[i],
      detections: Math.floor(Math.random() * 500) + 100,
      alerts: Math.floor(Math.random() * 50) + 10,
      score: Math.floor(Math.random() * 20) + 80,
    };
  });
};

const chartData = generateChartData();

const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#f43f5e'];
const pieData = [
  { name: 'Speed Hack', value: 400 },
  { name: 'Fly Hack', value: 300 },
  { name: 'Chat Spam', value: 250 },
  { name: 'Hitbox', value: 150 },
];

const StatCard = ({ title, value, trend, isPositive, icon: Icon, delay }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {isPositive ? (
            <ArrowUpIcon className="w-4 h-4 mr-1 text-emerald-400" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1 text-red-400" />
          )}
          <span className={isPositive ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
            {trend}
          </span>
          <span className="text-slate-500 ml-2">vs last week</span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function AnalyticsPage() {
  const [range, setRange] = useState("7d");

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Security Analytics
          </h1>
          <p className="text-gray-400 mt-2">Comprehensive overview of your game network security.</p>
        </div>
        <Select defaultValue={range} onValueChange={setRange}>
          <SelectTrigger className="w-[180px] bg-[#1a1a24] border-gray-800 text-white">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a24] border-gray-800 text-white">
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Detections" value="12,492" trend="+14.2%" isPositive={false} icon={ShieldAlert} delay={0.1} />
        <StatCard title="Active Threats" value="143" trend="-5.4%" isPositive={true} icon={Activity} delay={0.2} />
        <StatCard title="Avg Response Time" value="1.2s" trend="-12.5%" isPositive={true} icon={Zap} delay={0.3} />
        <StatCard title="False Positives" value="0.8%" trend="-2.1%" isPositive={true} icon={Target} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Detection Volume</CardTitle>
              <CardDescription className="text-gray-400">Total flagged events over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#888" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#2d2d3d', color: '#fff', borderRadius: '8px' }} 
                      itemStyle={{ color: '#fff' }}
                      cursor={{fill: '#2d2d3d', opacity: 0.4}}
                    />
                    <Bar dataKey="detections" fill="url(#colorDetections)" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Critical Alerts</CardTitle>
              <CardDescription className="text-gray-400">High severity alerts triggered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" axisLine={false} tickLine={false} />
                    <YAxis stroke="#888" axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#2d2d3d', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="alerts" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#111118' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Most Common Event Types</CardTitle>
              <CardDescription className="text-gray-400">Distribution of exploit categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#2d2d3d', borderRadius: '8px', color: '#fff' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Legend to the side */}
                <div className="flex flex-col justify-center space-y-4 pr-4">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center text-sm text-slate-300 whitespace-nowrap">
                      <div className="w-3 h-3 rounded-full mr-3 shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="flex-1">{entry.name}</span>
                      <span className="ml-4 font-semibold text-white">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Security Score Trend</CardTitle>
              <CardDescription className="text-gray-400">Average system health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" axisLine={false} tickLine={false} />
                    <YAxis stroke="#888" domain={[0, 100]} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#2d2d3d', borderRadius: '8px' }} 
                    />
                    <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
