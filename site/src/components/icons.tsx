import type { SVGProps } from "react";

/* Hand-drawn inline icon set — 1.6px strokes, round joins, no icon library. */

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number) =>
  ({
    width: size ?? 22,
    height: size ?? 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }) as const;

export const PulseIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 12h4l2.2-5.5 3 11 2.6-8 1.7 2.5h5.5" />
  </svg>
);

export const CompassIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const BookIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 6.5C10 4.8 6.8 4.5 3.5 5v13c3.3-.5 6.5-.2 8.5 1.5 2-1.7 5.2-2 8.5-1.5V5c-3.3-.5-6.5-.2-8.5 1.5Z" />
    <path d="M12 6.5v13" />
    <path d="M6.5 9c1.6 0 2.8.2 4 .6M6.5 12.5c1.6 0 2.8.2 4 .6" />
  </svg>
);

export const NetworkIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="5.5" cy="12" r="2.3" />
    <circle cx="17" cy="5.5" r="2.3" />
    <circle cx="17" cy="18.5" r="2.3" />
    <path d="m7.6 10.8 7.3-4M7.6 13.2l7.3 4" />
    <path d="M17 7.8v8.4" strokeDasharray="1.5 2.4" />
  </svg>
);

export const ChartIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4v16h16" />
    <path d="M7.5 15.5 11 11l3 2.5 5-6" />
    <circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const PersonIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="7.2" r="3.2" />
    <path d="M5.5 20c.8-4 3.4-6 6.5-6s5.7 2 6.5 6" />
    <path d="M12 10.4v2.8" />
  </svg>
);

export const FamilyIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="8" cy="7.5" r="2.6" />
    <circle cx="16.5" cy="9" r="2" />
    <path d="M3.5 19.5c.6-3.4 2.4-5.2 4.5-5.2s3.9 1.8 4.5 5.2" />
    <path d="M13.8 19.5c.4-2.5 1.4-3.9 2.7-3.9 1.4 0 2.6 1.4 3 3.9" />
  </svg>
);

export const CommunityIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="6.5" r="2.2" />
    <circle cx="5.5" cy="10.5" r="2.2" />
    <circle cx="18.5" cy="10.5" r="2.2" />
    <path d="M9 20c.4-2.6 1.6-4 3-4s2.6 1.4 3 4" />
    <path d="M2.5 17.5c.4-2.2 1.5-3.4 3-3.4s2.6 1.2 3 3.4M15.5 17.5c.4-2.2 1.5-3.4 3-3.4s2.6 1.2 3 3.4" />
  </svg>
);

export const BuildingIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 20V5.5L12 3.5l7.5 2V20" />
    <path d="M2.5 20h19" />
    <path d="M8.5 8.5h2m3 0h2m-7 3.5h2m3 0h2m-7 3.5h2m3 0h2" />
    <path d="M10.5 20v-2.5h3V20" />
  </svg>
);

export const LeafIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 19C4 9 10 4 20 4c0 10-5 16-15 15Z" />
    <path d="M5 19c3-5 7-9 11-11" />
  </svg>
);

export const SunRiseIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 17h16M7 20.5h10" />
    <path d="M7.5 13.5a4.5 4.5 0 0 1 9 0" />
    <path d="M12 5.5V3.5M5.5 8l-1.4-1.4M18.5 8l1.4-1.4" />
  </svg>
);

export const MindIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M9 4.5A4.5 4.5 0 0 0 4.5 9c0 1.6.4 2.4-0.5 3.7-.6 1 .1 2.1 1.2 2.2.3 2.6 2 4.6 4.8 4.6 1 0 1.6-.3 2-.6V6.4A4.4 4.4 0 0 0 9 4.5Z" />
    <path d="M15 4.5A4.5 4.5 0 0 1 19.5 9c0 1.6-.4 2.4.5 3.7.6 1-.1 2.1-1.2 2.2-.3 2.6-2 4.6-4.8 4.6-1 0-1.6-.3-2-.6" />
    <path d="M9.5 9.5c1 .3 1.6 1 1.8 2M14.5 9.5c-1 .3-1.6 1-1.8 2" />
  </svg>
);

export const AppleIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 8c-3.5-2-7 .5-7 4.5 0 4 2.5 7.5 5 7.5 1 0 1.3-.5 2-.5s1 .5 2 .5c2.5 0 5-3.5 5-7.5 0-4-3.5-6.5-7-4.5Z" />
    <path d="M12 8c0-2 1-3.5 3-4.5" />
    <path d="M12 8c-.3-1.6-1.4-2.6-3-3" />
  </svg>
);

export const MoveIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="14.5" cy="5" r="2" />
    <path d="m9 21 2.5-5L9 13.5 10.5 8l4-1.5 2.5 3.5 3 1" />
    <path d="M10.5 8 6.5 9.5 5 13M9 13.5l-2.5 1.5L5.5 19" />
  </svg>
);

export const MoonIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5Z" />
    <path d="m16 4.5.5 1.5L18 6.5l-1.5.5L16 8.5 15.5 7 14 6.5l1.5-.5L16 4.5Z" />
  </svg>
);

export const DropIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2 2.4" />
  </svg>
);

export const LinkIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="7" cy="12" r="3.4" />
    <circle cx="17" cy="12" r="3.4" />
    <path d="M10.4 12h3.2" />
  </svg>
);

export const HeartHandIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 8.8C11 6.5 7.5 6.5 7 9c-.4 2 1.6 3.8 5 6.5 3.4-2.7 5.4-4.5 5-6.5-.5-2.5-4-2.5-5-.2Z" />
    <path d="M3.5 18.5c2.5 1.3 5 2 8.5 2s6-.7 8.5-2" />
  </svg>
);

export const ShieldIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3 5 5.5v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9v-6L12 3Z" />
    <path d="m9 11.5 2.2 2.2L15.5 9" />
  </svg>
);

export const LockIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const EyeIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

export const SparkIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5c.6 3.8 2.7 5.9 6.5 6.5-3.8.6-5.9 2.7-6.5 6.5-.6-3.8-2.7-5.9-6.5-6.5 3.8-.6 5.9-2.7 6.5-6.5Z" />
    <path d="M18.5 15.5c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
  </svg>
);

export const ArrowIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const ClipboardIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
    <path d="M9 4.5V3h6v1.5" />
    <path d="M9 10h6M9 13.5h6M9 17h3.5" />
  </svg>
);
