"use client";

import { motion } from "motion/react";
import { Shield, Bell, Gavel, BarChart3, Heart, Code } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Real-Time Detection",
      description: "Monitor suspicious behavior as it happens with our advanced detection algorithms.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Live Alerts",
      description: "Instant notifications via Discord, email, or custom webhooks when threats are detected.",
      icon: Bell,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Game Moderation",
      description: "Automated response recommendations and one-click player moderation actions.",
      icon: Gavel,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Advanced Analytics",
      description: "Deep insights into security events, player behavior, and threat trends.",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Child Safety",
      description: "Content rating and safety assessments to ensure a safe environment for all players.",
      icon: Heart,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "REST API",
      description: "Simple, powerful integration with your Roblox games and external services.",
      icon: Code,
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">secure your game</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed specifically for Roblox developers to monitor, detect, and respond to threats in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl z-0" />
              <div className="relative h-full bg-card/90 backdrop-blur-sm rounded-2xl p-8 z-10 flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
