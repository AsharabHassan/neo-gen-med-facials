"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SkinConcern } from "@/lib/types";
import ConcernIcon from "./ConcernIcon";

const SEVERITY_STYLES = {
  none: { bar: "bg-text-light/30", text: "text-text-light", label: "No concern" },
  mild: { bar: "bg-brand-teal", text: "text-brand-teal-dark", label: "Mild" },
  moderate: { bar: "bg-brand-orange", text: "text-brand-orange", label: "Moderate" },
  significant: { bar: "bg-brand-orange-dark", text: "text-brand-orange-dark", label: "Significant" },
};

interface Props {
  concern: SkinConcern;
}

export default function ConcernCard({ concern }: Props) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_STYLES[concern.severity];

  return (
    <motion.div
      layout
      className="card cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-md"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-center gap-3.5 px-4 py-3.5">
        <div className="flex-shrink-0 text-brand-orange">
          <ConcernIcon icon={concern.icon} size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold text-text-primary leading-tight">
            {concern.name}
          </p>
          <p className="font-sans text-xs text-text-muted truncate mt-0.5">
            {concern.finding}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-4 rounded-full ${
                  i <= ["none", "mild", "moderate", "significant"].indexOf(concern.severity)
                    ? sev.bar
                    : "bg-black/5"
                }`}
              />
            ))}
          </div>
          <span className="font-sans text-[10px] text-text-muted w-4 text-center">
            {expanded ? "\u2212" : "+"}
          </span>
        </div>
      </div>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-4 pb-4"
        >
          <div className="border-t border-black/5 pt-3 space-y-2.5">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
                Finding
              </p>
              <p className="font-sans text-sm text-text-body leading-relaxed">
                {concern.finding}
              </p>
            </div>
            <div className="card-teal px-3 py-2.5">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-teal-dark mb-1">
                How NeoGen Helps
              </p>
              <p className="font-sans text-sm text-text-body leading-relaxed">
                {concern.neoGenBenefit}
              </p>
            </div>
            {concern.severity !== "none" && (
              <p className={`font-sans text-[10px] font-semibold uppercase tracking-wider ${sev.text}`}>
                {sev.label} severity
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
