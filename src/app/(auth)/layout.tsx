import { ReactNode } from 'react';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col justify-center relative overflow-hidden text-slate-200 py-12 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen translate-x-1/4 -translate-y-1/4" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-8 group">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Zenith-Guard
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-[#111118]/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-white/5 ring-1 ring-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}
