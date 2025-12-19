import { ReactNode } from "react";
import Link from "next/link";

interface GlassPillLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function GlassPillLink({
  children,
  href,
  className = "",
}: GlassPillLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/14 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/22 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ${className}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          d="M6 12L10 8L6 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

