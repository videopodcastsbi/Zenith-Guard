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
      className="relative flex flex-col h-full bg-sidebar/80 backdrop-blur-xl border-r border-border z-20 hidden md:flex"
    >
      <div className="flex items-center p-6 h-20">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-foreground font-bold text-xl">
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
        className="absolute -right-3 top-7 bg-card border border-border rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <ScrollArea className="flex-1 py-4 px-3">
        <TooltipProvider delay={0}>
          {NAV_ITEMS.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider">
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
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                          />
                        }
                      >
                          {isActive && (
                            <motion.div
                              layoutId="activeNavIndicator"
                              className="absolute left-0 w-1 h-full bg-primary rounded-r-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <item.icon
                            size={20}
                            className={cn(
                              "shrink-0 transition-colors",
                              isActive ? "text-primary" : "group-hover:text-foreground"
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
                        <TooltipContent side="right" className="bg-popover border-border text-popover-foreground">
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

      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">ZG</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-foreground truncate">Developer</span>
              <span className="text-xs text-primary truncate">Pro Tier</span>
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
