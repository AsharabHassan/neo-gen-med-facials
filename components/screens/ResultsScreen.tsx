"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import SuitabilityRing from "@/components/SuitabilityRing";
import ConcernCard from "@/components/ConcernCard";

export default function ResultsScreen() {
  const { state, dispatch } = useApp();
  const { analysisResult, leadData } = state;

  if (!analysisResult) {
    dispatch({ type: "SET_SCREEN", screen: "landing" });
    return null;
  }

  const concernsWithIssues = analysisResult.concerns.filter(
    (c) => c.severity !== "none"
  ).length;

  return (
    <div className="screen pb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full space-y-8"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="label-xs">NeoGen Suitability Report</span>
            <span className="font-sans text-[9px] text-text-light tracking-wider uppercase">
              {concernsWithIssues} of 8 areas identified
            </span>
          </div>
          <div className="w-full h-px bg-brand-orange/10" />
          <h2 className="font-serif text-[2.4rem] font-normal italic text-text-primary leading-[1.05]">
            {leadData?.firstName ? `${leadData.firstName}'s` : "Your"}
            <br />
            Assessment.
          </h2>
        </div>

        <div className="py-4">
          <SuitabilityRing
            score={analysisResult.suitabilityScore}
            tier={analysisResult.suitabilityTier}
          />
        </div>

        <div className="border-l-2 border-brand-orange/30 pl-4 py-1 space-y-1.5">
          <p className="label-xs">Specialist Assessment</p>
          <p className="font-serif text-[1.05rem] italic text-text-body leading-relaxed">
            {analysisResult.overallSummary}
          </p>
        </div>

        <div className="space-y-2.5">
          <p className="label-xs mb-2">Skin Concern Breakdown</p>
          {analysisResult.concerns.map((concern) => (
            <ConcernCard key={concern.id} concern={concern} />
          ))}
        </div>

        <div className="card-teal px-4 py-3.5 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5 text-brand-teal-dark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6.5 10l2.5 2.5L13.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-brand-teal-dark">
              Safe for all skin types &amp; tones
            </p>
            <p className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
              NeoGen Plasma is clinically proven safe across all Fitzpatrick skin types (I-VI),
              using nitrogen plasma technology that does not target melanin.
            </p>
          </div>
        </div>

        <p className="font-sans text-[9px] text-text-light text-center leading-relaxed tracking-wide uppercase">
          AI-Generated Assessment . For Informational Purposes Only
          <br />
          Treatment Plans Confirmed at Consultation
        </p>

        <button
          className="btn-primary w-full"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "booking" })}
        >
          Book Your Free NeoGen Consultation
        </button>
      </motion.div>
    </div>
  );
}
