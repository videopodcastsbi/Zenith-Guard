"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Zenith-Guard caught a coordinated exploiting group within minutes of them joining our servers. The automated moderation saved us hours of headache.",
      author: "Alex Morgan",
      role: "Lead Developer, Phantom Forces",
      initials: "AM",
      color: "bg-blue-600"
    },
    {
      quote: "The analytics dashboard gives me insights into player behavior I've never had before. It's completely changed how we handle security patches.",
      author: "Sarah Chen",
      role: "Studio Head, Neon Games",
      initials: "SC",
      color: "bg-purple-600"
    },
    {
      quote: "Integration took less than 10 minutes. The Discord webhook alerts are instant, and the child safety features give us peace of mind.",
      author: "Marcus Johnson",
      role: "Creator, Adopt & Play",
      initials: "MJ",
      color: "bg-cyan-600"
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Trusted by top developers</h2>
          <p className="text-gray-400 text-lg">See what creators are saying about Zenith-Guard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111118] border border-white/5 rounded-2xl p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 flex-grow text-lg italic">&ldquo;{testimonial.quote}&rdquo;</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.author}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
