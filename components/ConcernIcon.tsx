"use client";

import { ConcernIcon as IconType } from "@/lib/types";

interface Props {
  icon: IconType;
  size?: number;
  className?: string;
}

export default function ConcernIcon({ icon, size = 28, className = "" }: Props) {
  const stroke = "currentColor";
  const sw = 1.5;

  const icons: Record<IconType, React.ReactNode> = {
    wrinkles: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M5 8c3-2 6 2 9 0s6-2 9 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M5 14c3-2 6 2 9 0s6-2 9 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M5 20c3-2 6 2 9 0s6-2 9 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    texture: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <circle cx="8" cy="8" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="20" cy="8" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="14" cy="14" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="8" cy="20" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="20" cy="20" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="14" cy="7" r="0.8" fill={stroke} />
        <circle cx="14" cy="21" r="0.8" fill={stroke} />
        <circle cx="7" cy="14" r="0.8" fill={stroke} />
        <circle cx="21" cy="14" r="0.8" fill={stroke} />
      </svg>
    ),
    pigmentation: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <circle cx="14" cy="6" r="3" stroke={stroke} strokeWidth={sw} />
        <path d="M14 3v-1M18 6h1M14 9v1M10 6H9M17 3.5l.7-.7M17 8.5l.7.7M11 8.5l-.7.7M11 3.5l-.7-.7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="8" cy="18" r="2" stroke={stroke} strokeWidth={sw} opacity="0.7" />
        <circle cx="18" cy="16" r="1.5" stroke={stroke} strokeWidth={sw} opacity="0.5" />
        <circle cx="14" cy="22" r="2.5" stroke={stroke} strokeWidth={sw} opacity="0.6" />
        <circle cx="21" cy="21" r="1" stroke={stroke} strokeWidth={sw} opacity="0.4" />
      </svg>
    ),
    acne: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="4" y="4" width="20" height="20" rx="4" stroke={stroke} strokeWidth={sw} />
        <circle cx="10" cy="10" r="1.5" stroke={stroke} strokeWidth={sw} />
        <circle cx="18" cy="12" r="2" stroke={stroke} strokeWidth={sw} />
        <circle cx="12" cy="18" r="1.8" stroke={stroke} strokeWidth={sw} />
        <path d="M9 10.5c0 0 .5-1 1-1s1 1 1 1" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <path d="M16.5 12.5c0 0 .8-1.2 1.5-1.2s1.5 1.2 1.5 1.2" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    laxity: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M8 18c0 4 2.5 6 6 6s6-2 6-6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M8 14c0 4 2.5 6 6 6s6-2 6-6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 10v-5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M11 8l3-3 3 3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    redness: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M14 4v6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 10c-2 2-5 3-7 6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 10c2 2 5 3 7 6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M10 13c-1 2-3 2-4 5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M18 13c1 2 3 2 4 5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 10c0 3-1 5-2 8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 10c0 3 1 5 2 8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    undereye: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M6 14c0 0 3.5-5 8-5s8 5 8 5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M6 14c0 0 3.5 5 8 5s8-5 8-5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.5" stroke={stroke} strokeWidth={sw} />
        <path d="M8 19c1 2 3 3.5 6 3.5s5-1.5 6-3.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M9.5 20.5c.8 1.2 2.2 2 4.5 2s3.7-.8 4.5-2" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    quality: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
        <ellipse cx="14" cy="15" rx="7" ry="9" stroke={stroke} strokeWidth={sw} />
        <path d="M10 12c0 0 1.5-1 4-1s4 1 4 1" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <circle cx="11" cy="14" r="0.8" fill={stroke} />
        <circle cx="17" cy="14" r="0.8" fill={stroke} />
        <path d="M7 8l-2-3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M21 8l2-3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M14 6V3" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M10 7L8.5 4.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <path d="M18 7l1.5-2.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
  };

  return <>{icons[icon]}</>;
}
