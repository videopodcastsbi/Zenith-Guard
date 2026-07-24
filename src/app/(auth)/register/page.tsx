'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Mail, Lock, User, Code2, Disc, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signup, signInWithProvider } from '../actions';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Basic password strength calculation
  const strength = Math.min(
    100,
    ((password.length > 7 ? 25 : 0) +
    (/[A-Z]/.test(password) ? 25 : 0) +
    (/[0-9]/.test(password) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 25 : 0))
  );

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signup(formData);
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
        <h2 className="text-2xl font-bold text-white tracking-tight">Create an account</h2>
        <p className="text-sm text-slate-400">Start securing your Roblox experiences today</p>
      </div>

      <form className="space-y-4" action={handleSubmit}>
        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 bg-[#1a1a24] border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#1a1a24] border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-[#1a1a24] border-white/10 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
              disabled={isPending}
            />
          </div>
          
          {password && (
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Password strength</span>
                <span className={`${strength < 50 ? 'text-red-400' : strength < 100 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                  {strength < 50 ? 'Weak' : strength < 100 ? 'Good' : 'Strong'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${strength < 50 ? 'bg-red-500' : strength < 100 ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="terms" 
            className="w-4 h-4 rounded bg-[#1a1a24] border-white/10 text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0 focus:ring-offset-transparent"
            required 
            disabled={isPending}
          />
          <Label htmlFor="terms" className="text-sm font-normal text-slate-400">
            I agree to the <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
          </Label>
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
              Create Account
              <ShieldCheck className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#111118] text-slate-500">Or sign up with</span>
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
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
