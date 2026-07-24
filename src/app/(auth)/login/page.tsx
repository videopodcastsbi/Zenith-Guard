'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Mail, Lock, Code2, Disc, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login, signInWithProvider } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
        <p className="text-sm text-slate-400">Enter your credentials to access your account</p>
      </div>

      <form className="space-y-4" action={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 bg-[#1a1a24] border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 bg-[#1a1a24] border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 h-11 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all group"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#111118] text-slate-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => startTransition(async () => { await signInWithProvider('github'); })}
          className="bg-[#1a1a24] border-white/10 text-white hover:bg-white/5 hover:text-white" 
          disabled={isPending}
        >
          <Code2 className="w-5 h-5 mr-2" />
          GitHub
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => startTransition(async () => { await signInWithProvider('discord'); })}
          className="bg-[#1a1a24] border-white/10 text-white hover:bg-[#5865F2]/20 hover:text-[#5865F2] hover:border-[#5865F2]/50 transition-colors" 
          disabled={isPending}
        >
          <Disc className="w-5 h-5 mr-2" />
          Discord
        </Button>
      </div>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
