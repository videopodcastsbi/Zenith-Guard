"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, Menu, User, Settings, LogOut, CreditCard } from "lucide-react";
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

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
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
    <header className="h-20 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white" />}>
              <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-[#111118] border-r-white/10">
            <div className="h-full w-full block md:hidden">
               <div className="p-6 text-xl font-bold text-white flex items-center gap-2">
                 <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">Z</div>
                 Zenith-Guard
               </div>
               <div className="px-4 text-slate-400">Mobile Navigation items...</div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex flex-col">
          <span className="text-xs text-slate-500 font-medium">Pages / {title}</span>
          <h1 className="text-xl font-bold text-slate-100">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center" onClick={() => setSearchOpen(true)}>
          <Search className="absolute left-3 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            readOnly
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-[#1a1a24] border border-white/5 rounded-full text-sm text-slate-200 placeholder:text-slate-500 hover:border-white/20 cursor-pointer focus:outline-none w-64 transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <span className="text-[10px] font-medium text-slate-500 border border-white/10 rounded px-1.5 py-0.5 bg-black/20">⌘K</span>
          </div>
        </div>

        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="bg-[#111118] border-white/10 sm:max-w-[425px] p-0 overflow-hidden">
            <div className="flex items-center border-b border-white/10 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input 
                autoFocus
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
                placeholder="Type a command or search..."
              />
            </div>
            <div className="p-4 text-center text-sm text-slate-500">
              No recent searches.
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white rounded-full" />}>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0f]"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-[#1a1a24] border-white/10 text-slate-200 p-0" align="end">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <span className="font-semibold text-white">Notifications</span>
              <span className="text-xs text-blue-400 cursor-pointer">Mark all read</span>
            </div>
            <div className="p-4 text-center text-sm text-slate-500 h-32 flex items-center justify-center">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-10 w-10 rounded-full" />}>
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-400 text-white font-semibold">ZG</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#1a1a24] border-white/10 text-slate-200" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Developer</p>
                  <p className="text-xs leading-none text-slate-400">dev@zenith-guard.com</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer" onClick={() => router.push('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer" onClick={() => router.push('/billing')}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
