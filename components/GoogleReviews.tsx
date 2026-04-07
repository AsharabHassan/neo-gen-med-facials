"use client";

import { useRef } from "react";

const REVIEWS = [
  {
    name: "Belinda Hearn",
    date: "Mar 2026",
    text: "Had a consultation - how refreshing to sit and have time to ask questions to a very knowledgeable consultant. I felt at ease throughout.",
  },
  {
    name: "Clare Karen Earle",
    date: "Mar 2026",
    text: "Amazing experience with Nurse Jane. I had several treatments and as always, I felt relaxed, looked after, treated with care.",
  },
  {
    name: "Jenna Miners",
    date: "Mar 2026",
    text: "Great treatment from Leva! Professional and put me at ease. Great service from Med Facials.",
  },
  {
    name: "Jojo Willcox",
    date: "Feb 2026",
    text: "Excellent service with highly trained professionals. Very happy with the results of my treatments. Would highly recommend.",
  },
  {
    name: "Henry Davies",
    date: "Dec 2025",
    text: "Over the last 6 months I've been to medfacials for a series of treatments. The team are delightful and really know their stuff.",
  },
  {
    name: "Stacey Jackson",
    date: "Aug 2025",
    text: "I had treatment on deep acne scarring, Dr Joe and Tracy were great throughout my treatment, so happy with the results.",
  },
  {
    name: "Karis Hunt",
    date: "Jan 2025",
    text: "Cannot rate Jane or Medfacials high enough. Jane is brilliant - a lovely person and a highly skilled aesthetic practitioner.",
  },
  {
    name: "Vicki Rose",
    date: "Nov 2024",
    text: "WOW was blown away at how young I feel and look after treatment... very professional, Dr Stolte took his time. Highly recommend.",
  },
];

function GoogleGLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
      <path
        fill="#EA4335"
        d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.4 6.3 14.7z"
      />
      <path
        fill="#FBBC05"
        d="M24 46c5.6 0 10.6-1.9 14.5-5.1l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-10.7-3.1-11.8-8.5l-7 5.4C8.6 42.3 15.7 46 24 46z"
      />
      <path
        fill="#34A853"
        d="M44.5 20H24v8.5h11.8c-.6 2.8-2.3 5.2-4.8 6.9l6.7 5.5C41.7 37.3 45 31.1 45 24c0-1.3-.2-2.7-.5-4z"
      />
    </svg>
  );
}

function StarIcon({ size = 12, color = "#FBBC05" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <path d="M10 1l2.39 6.26L18.5 7.64l-4.88 4.51 1.56 6.35L10 15.27 4.82 18.5l1.56-6.35L1.5 7.64l6.11-.38z" />
    </svg>
  );
}

function Stars({ count = 5, size = 12 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} size={size} />
      ))}
    </div>
  );
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "...";
}

function ReviewCard({ name, date, text }: { name: string; date: string; text: string }) {
  return (
    <div
      className="flex-shrink-0 w-64 bg-white rounded-2xl p-4 shadow-sm border border-black/5 snap-start flex flex-col gap-2.5"
      style={{ minHeight: 140 }}
    >
      <Stars size={12} />
      <p className="font-sans text-[12px] text-text-body leading-relaxed flex-1">
        &ldquo;{truncate(text, 120)}&rdquo;
      </p>
      <p className="font-sans text-[10px] text-text-muted font-semibold">
        {name}
        <span className="font-normal text-text-light"> &middot; {date}</span>
      </p>
    </div>
  );
}

export default function GoogleReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <GoogleGLogo size={22} />
        <div>
          <p className="font-sans text-[11px] font-semibold text-text-primary tracking-wide">
            Google Reviews
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Stars size={11} />
            <span className="font-sans text-[11px] font-semibold text-text-primary">4.9</span>
            <span className="font-sans text-[10px] text-text-muted">&nbsp;&middot;&nbsp;450+ reviews</span>
          </div>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </div>
    </div>
  );
}
