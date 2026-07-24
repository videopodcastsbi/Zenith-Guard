"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 relative z-10 bg-[#0a0a0f] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1a1a24] to-[#111118] border border-white/10 rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Secure Your Games?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers using Zenith-Guard to protect their communities and maintain fair gameplay.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">No credit card required. Free tier available.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
