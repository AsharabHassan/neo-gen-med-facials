"use client";

import { motion } from "framer-motion";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "@/lib/store";
import { leadSchema, LeadFormData } from "@/lib/validation";
import { getMetaParams, generateEventId } from "@/lib/meta";

const isDev = process.env.NODE_ENV !== "production";

function fireMetaLead(eventId: string) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("track", "Lead", {}, { eventID: eventId });
    if (isDev) console.log("[Meta Pixel] Lead fired", { eventId });
  } else if (isDev) {
    console.warn("[Meta Pixel] fbq unavailable — Lead NOT fired (check NEXT_PUBLIC_META_PIXEL_ID)");
  }
}

export default function GateScreen() {
  const { state, dispatch } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  function onSubmit(data: LeadFormData) {
    const metaParams = getMetaParams();
    const eventId = generateEventId();

    fireMetaLead(eventId);

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        marketingConsent: data.marketingConsent,
        analysisResult: state.analysisResult,
        meta: {
          fbp: metaParams.fbp,
          fbc: metaParams.fbc,
          fbclid: metaParams.fbclid,
          eventId,
          eventName: "Lead",
          pageUrl: window.location.href,
        },
      }),
    }).catch((err) => console.error("Lead submission error:", err));

    dispatch({
      type: "SET_LEAD",
      lead: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        marketingConsent: data.marketingConsent,
      },
    });
    dispatch({ type: "SET_SCREEN", screen: "results" });
  }

  function onError(formErrors: FieldErrors<LeadFormData>) {
    if (isDev) {
      console.warn("[Form] Submit blocked by validation:", formErrors);
    }
  }

  return (
    <div className="screen justify-center relative overflow-hidden">
      {state.imageDataUrl && (
        <div className="absolute inset-0">
          <img
            src={state.imageDataUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.04, filter: "grayscale(100%) blur(24px)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #FAF7F4 0%, rgba(250,247,244,0.95) 100%)",
            }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full space-y-8"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-6" stroke="#D4764E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="h-px flex-1 bg-brand-orange/15" />
          </div>
          <h2 className="font-serif text-[2.6rem] font-normal italic text-text-primary leading-[1.05]">
            Your Score<br />Is Ready.
          </h2>
          <p className="font-sans text-xs text-text-muted tracking-wider uppercase">
            Enter details to unlock your NeoGen suitability report
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="label-xs">First Name</label>
              <input {...register("firstName")} placeholder="Sarah" className="input-field" />
              {errors.firstName && (
                <p className="font-sans text-[10px] text-red-500/70 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="label-xs">Last Name</label>
              <input {...register("lastName")} placeholder="Johnson" className="input-field" />
              {errors.lastName && (
                <p className="font-sans text-[10px] text-red-500/70 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="label-xs">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="sarah@example.com"
              className="input-field"
            />
            {errors.email && (
              <p className="font-sans text-[10px] text-red-500/70 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="label-xs">Phone</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+44 7700 000000"
              className="input-field"
            />
            {errors.phone && (
              <p className="font-sans text-[10px] text-red-500/70 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 flex-shrink-0">
              <input {...register("marketingConsent")} type="checkbox" className="sr-only peer" />
              <div className="w-4 h-4 rounded border border-black/15 peer-checked:border-brand-orange peer-checked:bg-brand-orange/10 transition-all duration-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#D4764E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="font-sans text-[11px] text-text-muted leading-relaxed group-hover:text-text-body transition-colors">
              I consent to receive my analysis results and communications from MEDfacials in accordance with UK data protection law.
            </span>
          </label>
          {errors.marketingConsent && (
            <p className="font-sans text-[10px] text-red-500/70">
              {errors.marketingConsent.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Unlock My Results"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
