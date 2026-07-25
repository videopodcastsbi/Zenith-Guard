"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Search, Bell, Menu, User, Settings, LogOut, CreditCard,
  Shield, LayoutDashboard, Gamepad2, Users, Activity, BellRing, ShieldAlert, Baby, Key, Lock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

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
  }
];

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  
  // Create breadcrumb from pathname
  const paths = pathname.split('/').filter(Boolean);
  const currentPath = paths[paths.length - 1] || 'Dashboard';
  const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground" />}>
              <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r-border overflow-y-auto">
            <div className="h-full w-full block md:hidden">
               <div className="p-6 text-xl font-bold text-foreground flex items-center gap-2">
                 <Shield className="w-8 h-8 text-blue-500 shrink-0" />
                 Zenith-Guard
               </div>
               <div className="px-3 pb-6">
                 {NAV_ITEMS.map((section, idx) => (
                   <div key={idx} className="mb-6">
                     <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider">
                       {section.section}
                     </div>
                     <div className="space-y-1">
                       {section.items.map((item) => {
                         const isActive = pathname === item.href;
                         return (
                           <Link
                             key={item.href}
                             href={item.href}
                             onClick={() => setMobileMenuOpen(false)}
                             className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                               isActive
                                 ? "bg-primary/10 text-primary"
                                 : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                             }`}
                           >
                             <item.icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                             <span>{item.name}</span>
                           </Link>
                         );
                       })}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">Pages / {title}</span>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center" onClick={() => setSearchOpen(true)}>
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            readOnly
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground hover:border-primary/50 cursor-pointer focus:outline-none w-64 transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <span className="text-[10px] font-medium text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-background">⌘K</span>
          </div>
        </div>

        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="bg-background border-border sm:max-w-[425px] p-0 overflow-hidden">
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input 
                autoFocus
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
                placeholder="Type a command or search..."
              />
            </div>
            <div className="p-4 text-center text-sm text-muted-foreground">
              No recent searches.
            </div>
          </DialogContent>
        </Dialog>

        <ThemeToggle />

        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full" />}>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-popover border-border text-popover-foreground p-0" align="end">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <span className="font-semibold">Notifications</span>
              <span className="text-xs text-primary cursor-pointer">Mark all read</span>
            </div>
            <div className="p-4 text-center text-sm text-muted-foreground h-32 flex items-center justify-center">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-10 w-10 rounded-full" />}>
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">ZG</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border-border text-popover-foreground" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Developer</p>
                  <p className="text-xs leading-none text-muted-foreground">dev@zenith-guard.com</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="focus:bg-muted focus:text-foreground cursor-pointer" onClick={() => router.push('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-muted focus:text-foreground cursor-pointer" onClick={() => router.push('/billing')}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-500/20 focus:text-red-500 text-red-500 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
