"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import GoogleReviews from "@/components/GoogleReviews";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function LandingScreen() {
  const { dispatch } = useApp();

  return (
    <div className="screen justify-between relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 w-full pt-2"
      >
        {/* Top bar */}
        <motion.div variants={item} className="flex items-center justify-between w-full">
          <Image src="/logo.svg" alt="MEDfacials" width={120} height={36} priority />
          <span className="label-xs">Truro, Cornwall</span>
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} className="w-full h-px bg-brand-orange/15" />

        {/* Hero headline */}
        <motion.div variants={item} className="space-y-3">
          <p className="label-xs">AI Skin Analysis</p>
          <h1 className="font-serif text-[2.8rem] font-normal leading-[1.05] text-text-primary italic tracking-tight">
            Discover If<br />
            NeoGen Is Right<br />
            For Your Skin.
          </h1>
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-xs">
            AI-powered skin analysis in under 60 seconds.
            Get your personalised NeoGen suitability score.
          </p>
        </motion.div>

        {/* Feature rows */}
        <motion.div variants={item} className="w-full mt-2">
          {[
            { code: "001", label: "7-Point Skin Assessment" },
            { code: "002", label: "NeoGen Suitability Score" },
            { code: "003", label: "Free Expert Consultation" },
          ].map(({ code, label }) => (
            <div
              key={code}
              className="flex items-center gap-4 py-3.5 border-b border-black/5 first:border-t"
            >
              <span className="font-sans text-[10px] font-semibold text-brand-orange/50 w-7 flex-shrink-0">
                {code}
              </span>
              <div className="w-px h-3 bg-brand-orange/15 flex-shrink-0" />
              <span className="font-sans text-[13px] text-text-body tracking-wide">
                {label}
              </span>
              <span className="ml-auto text-brand-orange/30 text-xs">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
              </span>
            </div>
          ))}
        </motion.div>

        {/* Google Reviews */}
        <motion.div variants={item} className="w-full">
          <GoogleReviews />
        </motion.div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full space-y-3 pb-4"
      >
        <button
          className="btn-primary w-full"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "capture" })}
        >
          Start My Free Skin Analysis
        </button>
        <p className="font-sans text-[9px] text-center text-text-light tracking-widest uppercase">
          Private . Secure . Image Not Stored
        </p>
      </motion.div>
    </div>
  );
}
