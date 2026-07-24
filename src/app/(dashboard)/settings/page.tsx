"use client";

import { motion } from "motion/react";
import { User, Bell, Shield, Trash2, Mail, Lock, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and security configurations.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-400" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20 border-2 border-gray-700">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold">
                    ZG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="border-gray-700 bg-gray-900">Change Avatar</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <Input defaultValue="Admin User" className="bg-[#1a1a24] border-gray-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <Input defaultValue="admin@zenith-guard.com" type="email" className="bg-[#1a1a24] border-gray-800" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-gray-200 flex items-center"><Mail className="mr-2 h-4 w-4" /> Email Alerts</h4>
                  <p className="text-sm text-gray-500">Receive email for critical security events.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-gray-200 flex items-center"><Webhook className="mr-2 h-4 w-4" /> Discord Webhook</h4>
                  <p className="text-sm text-gray-500">Send alerts to a Discord channel.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2 pt-2">
                <Input placeholder="https://discord.com/api/webhooks/..." className="bg-[#1a1a24] border-gray-800 text-sm" defaultValue="https://discord.com/api/webhooks/123/abc" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-[#111118]/50 backdrop-blur border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-gray-200">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" className="border-gray-700">Enable 2FA</Button>
              </div>
              <Separator className="bg-gray-800" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-200 flex items-center"><Lock className="mr-2 h-4 w-4" /> Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Current Password" className="bg-[#1a1a24] border-gray-800" />
                  <Input type="password" placeholder="New Password" className="bg-[#1a1a24] border-gray-800" />
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-red-950/10 border-red-900/50">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center">
                <Trash2 className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-400/70">Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Account</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
