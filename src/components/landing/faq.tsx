"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Zenith-Guard detect suspicious activity?",
      answer: "We use a combination of heuristic analysis, behavioral patterns, and known exploit signatures. Our system analyzes events in real-time, looking for anomalies like impossible movement speeds, unauthorized remote event firing, or injected UI elements."
    },
    {
      question: "Is Zenith-Guard easy to integrate with my Roblox game?",
      answer: "Yes! Integration requires adding a single ModuleScript to your game and configuring your API key. Our comprehensive documentation walks you through the 5-minute setup process, and we provide robust SDKs for custom implementations."
    },
    {
      question: "What happens when suspicious activity is detected?",
      answer: "Depending on your settings, Zenith-Guard can automatically kick/ban the user, log the event for manual review, or send instant alerts to your Discord server via webhooks. You have full control over the automated response thresholds."
    },
    {
      question: "Does Zenith-Guard guarantee protection against all exploiters?",
      answer: "No security system is 100% foolproof. While we catch the vast majority of common exploits and automated attacks, dedicated bad actors may find workarounds. We continuously update our detection rules to stay ahead of new exploit methods."
    },
    {
      question: "How does the Child Safety system work?",
      answer: "Our Child Safety system scans in-game chat, user-generated content, and behavioral patterns for inappropriate material or predatory behavior, alerting moderators immediately and logging context for compliance with safety standards."
    },
    {
      question: "Can I use Zenith-Guard for free?",
      answer: "Yes, we offer a robust Free tier suitable for small games or developers just starting out. It includes basic detection rules, email alerts, and a 7-day data history for up to 1,000 events per day."
    }
  ];

  return (
    <section id="faq" className="py-24 relative z-10 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about the product and billing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 rounded-xl overflow-hidden bg-[#111118]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
