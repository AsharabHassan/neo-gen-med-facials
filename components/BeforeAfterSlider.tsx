"use client";

import ConcernIcon from "@/components/ConcernIcon";
import { ConcernIcon as IconType } from "@/lib/types";

const BENEFITS: {
  title: string;
  before: string;
  after: string;
  icon: IconType;
}[] = [
  {
    title: "Skin Tightening",
    before: "Loose, sagging skin",
    after: "Firmer, lifted contours",
    icon: "laxity",
  },
  {
    title: "Wrinkle Reduction",
    before: "Fine lines & wrinkles",
    after: "Smoother, younger-looking skin",
    icon: "wrinkles",
  },
  {
    title: "Scar Improvement",
    before: "Acne scars & blemishes",
    after: "Refined, even texture",
    icon: "acne",
  },
  {
    title: "Pigmentation",
    before: "Sun damage & age spots",
    after: "Clearer, more even tone",
    icon: "pigmentation",
  },
];

function ArrowIcon() {
  return (
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
  );
}

function BenefitCard({
  title,
  before,
  after,
  icon,
}: {
  title: string;
  before: string;
  after: string;
  icon: IconType;
}) {
  return (
    <div className="card flex flex-col gap-3">
      {/* Title row */}
      <div className="flex items-center gap-2.5">
        <span className="text-brand-orange">
          <ConcernIcon icon={icon} size={22} />
        </span>
        <span className="font-sans text-[12px] font-semibold text-text-primary tracking-wide">
          {title}
        </span>
      </div>

      {/* Before → After */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="label-xs mb-0.5">Before</p>
          <p className="font-sans text-[11px] text-text-muted leading-snug">{before}</p>
        </div>
        <ArrowIcon />
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
          <BenefitCard key={b.title} {...b} />
        ))}
      </div>
    </div>
  );
}
