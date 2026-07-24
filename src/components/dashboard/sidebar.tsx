"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Shield,
  LayoutDashboard,
  Gamepad2,
  Users,
  Activity,
  BellRing,
  ShieldAlert,
  Baby,
  Key,
  Settings,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_ITEMS = [
  {
    section: "MAIN",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Games", href: "/games", icon: Gamepad2 },
      { name: "Players", href: "/players", icon: Users },
      { name: "Analytics", href: "/analytics", icon: Activity },
    ],
  },
  {
    section: "SECURITY",
    items: [
      { name: "Alerts", href: "/alerts", icon: BellRing },
      { name: "Moderation", href: "/moderation", icon: ShieldAlert },
      { name: "Child Safety", href: "/child-safety", icon: Baby },
    ],
  },
  {
    section: "DEVELOPER",
    items: [
      { name: "API Keys", href: "/api-keys", icon: Key },
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Billing", href: "/billing", icon: Lock },
    ],
  },
  {
    section: "ADMIN",
    items: [
      { name: "Admin Panel", href: "/admin", icon: Lock },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative flex flex-col h-full bg-[#111118]/80 backdrop-blur-xl border-r border-white/5 z-20 hidden md:flex"
    >
      <div className="flex items-center p-6 h-20">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold text-xl">
          <Shield className="w-8 h-8 text-blue-500 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                Zenith-Guard
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 bg-slate-800 border border-white/10 rounded-full p-1 text-slate-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <ScrollArea className="flex-1 py-4 px-3">
        <TooltipProvider delay={0}>
          {NAV_ITEMS.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <div className="px-3 mb-2 text-xs font-semibold text-slate-500 tracking-wider">
                  {section.section}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger
                        render={
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                              isActive
                                ? "bg-blue-500/10 text-blue-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                            )}
                          />
                        }
                      >
                          {isActive && (
                            <motion.div
                              layoutId="activeNavIndicator"
                              className="absolute left-0 w-1 h-full bg-blue-500 rounded-r-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <item.icon
                            size={20}
                            className={cn(
                              "shrink-0 transition-colors",
                              isActive ? "text-blue-400" : "group-hover:text-slate-200"
                            )}
                          />
                          <AnimatePresence>
                            {!collapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden"
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right" className="bg-[#1a1a24] border-white/10 text-slate-200">
                          {item.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </ScrollArea>

      <div className="p-4 border-t border-white/5">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <Avatar className="h-10 w-10 border border-white/10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">ZG</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-slate-200 truncate">Developer</span>
              <span className="text-xs text-blue-400 truncate">Pro Tier</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

// Dummy ScrollArea component for now if shadcn's isn't there
const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("overflow-y-auto", className)}>{children}</div>
);
