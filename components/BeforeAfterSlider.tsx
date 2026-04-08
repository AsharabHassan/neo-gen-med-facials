"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import ConcernIcon from "@/components/ConcernIcon";
import { ConcernIcon as IconType } from "@/lib/types";

const BENEFITS: {
  title: string;
  before: string;
  after: string;
  icon: IconType;
  beforeImg: string;
  afterImg: string;
}[] = [
  {
    title: "Skin Tightening",
    before: "Loose, sagging skin",
    after: "Firmer, lifted contours",
    icon: "laxity",
    beforeImg: "/before-after/Sagging Skin Before.png",
    afterImg: "/before-after/Sagging Skin After.png",
  },
  {
    title: "Wrinkle Reduction",
    before: "Fine lines & wrinkles",
    after: "Smoother, younger-looking skin",
    icon: "wrinkles",
    beforeImg: "/before-after/Wrinkle Before.png",
    afterImg: "/before-after/Wrinkle After.png",
  },
  {
    title: "Scar Improvement",
    before: "Acne scars & blemishes",
    after: "Refined, even texture",
    icon: "acne",
    beforeImg: "/before-after/Scar Before.png",
    afterImg: "/before-after/Scar After.png",
  },
  {
    title: "Pigmentation",
    before: "Sun damage & age spots",
    after: "Clearer, more even tone",
    icon: "pigmentation",
    beforeImg: "/before-after/Pigmentation Before.png",
    afterImg: "/before-after/Pigmentation After.png",
  },
];

function SliderCard({
  title,
  before,
  after,
  icon,
  beforeImg,
  afterImg,
}: {
  title: string;
  before: string;
  after: string;
  icon: IconType;
  beforeImg: string;
  afterImg: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="card flex flex-col gap-3 overflow-hidden p-4">
      {/* Title row */}
      <div className="flex items-center gap-2.5">
        <span className="text-brand-orange">
          <ConcernIcon icon={icon} size={22} />
        </span>
        <span className="font-sans text-[12px] font-semibold text-text-primary tracking-wide">
          {title}
        </span>
      </div>

      {/* Before/After image slider */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden cursor-ew-resize select-none touch-none"
        style={{ aspectRatio: "4 / 3" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After image (full background) */}
        <Image
          src={afterImg}
          alt={`${title} after NeoGen treatment`}
          fill
          className="object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={beforeImg}
            alt={`${title} before NeoGen treatment`}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-10"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-white shadow-md" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L2 8l3 5" stroke="#D4764E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 3l3 5-3 5" stroke="#D4764E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-2 left-3 z-10 bg-black/50 rounded-full px-2.5 py-0.5">
          <span className="font-sans text-[9px] font-semibold text-white tracking-wider uppercase">Before</span>
        </div>
        <div className="absolute bottom-2 right-3 z-10 bg-brand-teal/80 rounded-full px-2.5 py-0.5">
          <span className="font-sans text-[9px] font-semibold text-white tracking-wider uppercase">After</span>
        </div>
      </div>

      {/* Text labels */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="label-xs mb-0.5">Before</p>
          <p className="font-sans text-[11px] text-text-muted leading-snug">{before}</p>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <path
            d="M3 9h12M11 5l4 4-4 4"
            stroke="#D4764E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex-1 min-w-0 text-right">
          <p className="label-xs mb-0.5 text-brand-teal">After</p>
          <p className="font-sans text-[11px] text-brand-teal leading-snug font-medium">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  return (
    <div className="w-full space-y-3">
      <p className="label-xs">What NeoGen Can Achieve</p>
      <div className="grid grid-cols-1 gap-3">
        {BENEFITS.map((b) => (
          <SliderCard key={b.title} {...b} />
        ))}
      </div>
    </div>
  );
}
