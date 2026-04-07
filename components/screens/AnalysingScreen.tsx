"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const CONCERNS = [
  { id: "01", name: "WRINKLES & FINE LINES" },
  { id: "02", name: "SKIN TEXTURE & PORES" },
  { id: "03", name: "PIGMENTATION" },
  { id: "04", name: "ACNE & SCARRING" },
  { id: "05", name: "SKIN LAXITY" },
  { id: "06", name: "REDNESS & VASCULAR" },
  { id: "07", name: "UNDER EYE AREA" },
  { id: "08", name: "OVERALL SKIN QUALITY" },
];

export default function AnalysingScreen() {
  const { state, dispatch } = useApp();
  const [activeConcern, setActiveConcern] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!state.imageDataUrl) {
      dispatch({ type: "SET_SCREEN", screen: "capture" });
      return;
    }

    let unmounted = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000);

    async function analyze() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDataUrl: state.imageDataUrl }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (unmounted) return;
        const data = await res.json();
        if (data.result) {
          dispatch({ type: "SET_ANALYSIS", result: data.result });
          dispatch({ type: "SET_SCREEN", screen: "gate" });
        } else {
          dispatch({ type: "SET_SCREEN", screen: "capture" });
        }
      } catch {
        clearTimeout(timeout);
        if (unmounted) return;
        dispatch({ type: "SET_SCREEN", screen: "capture" });
      }
    }

    analyze();
    return () => {
      unmounted = true;
      clearTimeout(timeout);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const concernInterval = setInterval(() => {
      setActiveConcern((p) => (p + 1) % CONCERNS.length);
    }, 700);
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 400);
    return () => {
      clearInterval(concernInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="screen items-stretch justify-between relative overflow-hidden py-10">
      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #FAF7F4 0%, rgba(250,247,244,0.8) 50%, #FAF7F4 100%)",
            }}
          />
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,118,78,0.5), transparent)",
            }}
            animate={{ top: ["10%", "90%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col justify-between h-full flex-1 gap-8"
      >
        <div className="flex items-center justify-between">
          <span className="label-xs">MEDfacials Analysis</span>
          <span className="font-sans text-[9px] text-brand-orange/50 tracking-widest">
            Processing{dots}
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <h2 className="font-serif text-[2.8rem] italic text-text-primary leading-none tracking-tight">
              Analysing
            </h2>
            <p className="font-sans text-xs text-text-muted tracking-wider uppercase">
              Assessing your skin{dots}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="font-sans text-[9px] text-brand-orange/40 tracking-widest uppercase mb-3">
            Concern Scan Status
          </div>
          {CONCERNS.map((concern, i) => {
            const isDone = i < activeConcern;
            const isActive = i === activeConcern;
            return (
              <motion.div
                key={concern.id}
                className="flex items-center gap-3"
                animate={{ opacity: isDone ? 0.4 : isActive ? 1 : 0.15 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-sans text-[10px] font-semibold text-brand-orange/50 w-5">
                  {concern.id}
                </span>
                <span
                  className="font-sans text-[10px] tracking-wider"
                  style={{
                    color: isActive ? "#D4764E" : isDone ? "#666666" : "#CCCCCC",
                  }}
                >
                  {concern.name}
                </span>
                <span className="flex-1 text-[9px] text-black/10">
                  {"...............".slice(0, 14)}
                </span>
                <span
                  className="font-sans text-[9px] font-semibold w-12 text-right"
                  style={{
                    color: isDone ? "#82C0C7" : isActive ? "#D4764E" : "#DDDDDD",
                  }}
                >
                  {isDone ? "DONE" : isActive ? "SCAN" : "WAIT"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
