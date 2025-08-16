"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Gift, Server } from "lucide-react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({
  from,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = { number: from };
      const increment = (to - from) / (duration * 60); // 60 FPS approximation

      const timer = setInterval(() => {
        controls.number += increment;
        if (controls.number >= to) {
          controls.number = to;
          clearInterval(timer);
        }
        setCount(Math.floor(controls.number));
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

function StatCard({
  icon,
  value,
  label,
  prefix = "",
  suffix = "",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </motion.div>

      <motion.div
        className="text-3xl md:text-4xl font-bold text-white mb-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
        viewport={{ once: true }}
      >
        <AnimatedCounter from={0} to={value} prefix={prefix} suffix={suffix} />
      </motion.div>

      <p className="text-blue-200 font-medium">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <motion.section
      className="py-20 px-4 bg-gradient-to-r from-indigo-800 to-purple-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Un moment historique ! 🎊
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<Users className="w-8 h-8 text-white" />}
            value={100}
            label="Abonnés atteints"
            delay={0.1}
          />

          <StatCard
            icon={<Gift className="w-8 h-8 text-white" />}
            value={1}
            label="Surprise spéciale"
            delay={0.3}
          />

          <StatCard
            icon={<Server className="w-8 h-8 text-white" />}
            value={1}
            label="Serveur exclusif"
            delay={0.5}
          />
        </div>
      </div>
    </motion.section>
  );
}

export default StatsSection;
