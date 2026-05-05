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
  aspectRatio: string;
}[] = [
  {
    title: "Pigmentation & Sun Damage",
    before: "Sun spots, lentigines & uneven tone",
    after: "Brighter, more uniform complexion",
    icon: "pigmentation",
    beforeImg: "/before-after/Pigmentation Before.jpg",
    afterImg: "/before-after/Pigmentation After.jpg",
    aspectRatio: "1472 / 2838",
  },
  {
    title: "Wrinkles & Crow's Feet",
    before: "Periorbital lines & crepey lid skin",
    after: "Softer lines, tighter eyelid skin",
    icon: "wrinkles",
    beforeImg: "/before-after/Periorbital Before.jpg",
    afterImg: "/before-after/Periorbital After.jpg",
    aspectRatio: "2874 / 1472",
  },
  {
    title: "Under Eye Area",
    before: "Lower-lid crepiness & fine lines",
    after: "Smoother, refreshed under-eyes",
    icon: "undereye",
    beforeImg: "/before-after/Under Eye Before.jpg",
    afterImg: "/before-after/Under Eye After.jpg",
    aspectRatio: "2688 / 1568",
  },
  {
    title: "Active Acne & Inflammation",
    before: "Active breakouts & post-inflammatory redness",
    after: "Calmer skin & refined pores",
    icon: "acne",
    beforeImg: "/before-after/Acne Before.jpg",
    afterImg: "/before-after/Acne After.jpg",
    aspectRatio: "1888 / 2256",
  },
  {
    title: "Acne Scarring & Texture",
    before: "Atrophic scars, enlarged pores & redness",
    after: "Smoother texture & even tone",
    icon: "texture",
    beforeImg: "/before-after/Acne Scarring Before.jpg",
    afterImg: "/before-after/Acne Scarring After.jpg",
    aspectRatio: "1792 / 2400",
  },
  {
    title: "Skin Laxity & Lower Face",
    before: "Jowling, marionette lines & laxity",
    after: "Lifted contour & firmer skin",
    icon: "laxity",
    beforeImg: "/before-after/Skin Laxity After.jpg",
    afterImg: "/before-after/Skin Laxity Before.jpg",
    aspectRatio: "1694 / 2528",
  },
];

function SliderCard({
  title,
  before,
  after,
  icon,
  beforeImg,
  afterImg,
  aspectRatio,
}: {
  title: string;
  before: string;
  after: string;
  icon: IconType;
  beforeImg: string;
  afterImg: string;
  aspectRatio: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const [ratioW, ratioH] = aspectRatio.split("/").map((s) => parseFloat(s.trim()));
  const isPortrait = ratioH > ratioW;
  const maxHeightPx = isPortrait ? 1080 : 800;
  const maxWidthPx = Math.round(maxHeightPx * (ratioW / ratioH));

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
        className="relative w-full mx-auto rounded-xl overflow-hidden cursor-ew-resize select-none touch-none bg-surface-cream"
        style={{
          aspectRatio,
          maxHeight: `${maxHeightPx}px`,
          maxWidth: `${maxWidthPx}px`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After image (full background) */}
        <Image
          src={afterImg}
          alt={`${title} after NeoGen treatment`}
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover object-center"
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
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover object-center"
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
