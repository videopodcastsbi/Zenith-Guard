"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Essential protection for starting developers.",
      features: [
        "1 game limit",
        "1,000 events/day",
        "Basic detection rules",
        "Email alerts",
        "7-day data history",
        "Community support"
      ],
      notIncluded: ["Discord webhooks", "Custom rules", "API access"],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      description: "Advanced tools for growing game studios.",
      features: [
        "10 games limit",
        "50,000 events/day",
        "Advanced detection",
        "All alert channels",
        "90-day data history",
        "Priority support",
        "API access",
        "Discord integration"
      ],
      notIncluded: [],
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "/mo",
      description: "Maximum scale and dedicated support.",
      features: [
        "Unlimited games",
        "Unlimited events",
        "Custom rule engine",
        "Dedicated account manager",
        "1-year data history",
        "24/7 phone support",
        "Custom SLAs",
        "White-label options"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg">Choose the right plan for your games, from indie developers to enterprise studios.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl ${
                tier.popular 
                  ? "bg-gradient-to-b from-blue-600/20 to-purple-600/5 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] transform md:-translate-y-4" 
                  : "bg-card border border-border"
              } p-8 flex flex-col h-full`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                <p className="text-muted-foreground mt-4 text-sm h-10">{tier.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                  {tier.notIncluded?.map((feature, i) => (
                    <li key={`not-${i}`} className="flex items-center gap-3 text-sm text-gray-500 opacity-60">
                      <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-gray-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/register" className="mt-auto">
                <Button 
                  className={`w-full ${
                    tier.popular 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0" 
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
