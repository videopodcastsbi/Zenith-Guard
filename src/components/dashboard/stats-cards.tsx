"use client";

import { motion } from "motion/react";
import { Shield, Users, AlertTriangle, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";

// Simple animated counter component
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count.toLocaleString()}</>;
}

export function StatsCards({ gamesCount = 0 }: { gamesCount?: number }) {
  const statsData = [
    {
      label: "Protected Games",
      value: gamesCount,
      trend: "+0 this month",
      trendType: "positive",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
  {
    label: "Online Players",
    value: 45281,
    trend: "+12.5%",
    trendType: "positive",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Detection Events (24h)",
    value: 8439,
    trend: "-5.2%",
    trendType: "positive",
    icon: Activity,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Suspicious Activity (24h)",
    value: 127,
    trend: "+14.1%",
    trendType: "negative",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
  },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {statsData.map((stat, i) => (
        <motion.div
          key={i}
          variants={item}
          className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-5 relative overflow-hidden group hover:border-primary/20 transition-colors"
        >
          {/* Subtle background glow */}
          <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-[64px] opacity-10 group-hover:opacity-20 transition-opacity`} />
          
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-lg bg-background/50 border border-border">
              <stat.icon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br ${stat.color} fill-current`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-background/50 border border-border ${stat.trendType === 'positive' ? 'text-emerald-500' : 'text-red-500'}`}>
              {stat.trendType === 'positive' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.trend}
            </div>
          </div>
          
          <div>
            <h4 className="text-3xl font-bold text-card-foreground font-mono tracking-tight">
              <AnimatedCounter value={stat.value} />
            </h4>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
