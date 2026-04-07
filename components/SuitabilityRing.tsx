"use client";

import { motion } from "framer-motion";
import { SuitabilityTier } from "@/lib/types";

interface Props {
  score: number;
  tier: SuitabilityTier;
}

const TIER_COLORS: Record<SuitabilityTier, string> = {
  "Excellent Candidate": "#D4764E",
  "Good Candidate": "#82C0C7",
  "Moderate Candidate": "#999999",
};

export default function SuitabilityRing({ score, tier }: Props) {
  const color = TIER_COLORS[tier];
  const angle = (score / 100) * 360;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-48 h-48"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${color} ${angle}deg, rgba(0,0,0,0.06) ${angle}deg)`,
            mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #fff calc(100% - 9px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #fff calc(100% - 9px))",
          }}
        />
        <div className="absolute inset-[10px] rounded-full bg-surface-warm flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <span className="font-serif text-6xl font-normal" style={{ color }}>
              {score}
            </span>
            <span className="font-sans text-lg text-text-muted">%</span>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-5 py-2 rounded-full"
        style={{
          backgroundColor: `${color}12`,
          border: `1.5px solid ${color}40`,
        }}
      >
        <span
          className="font-sans text-xs font-semibold uppercase tracking-wider"
          style={{ color }}
        >
          {tier}
        </span>
      </motion.div>
    </div>
  );
}
