import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
  showDot?: boolean;
  dotClassName?: string;
}

export default function Pill({
  children,
  className = "",
  showDot = false,
  dotClassName,
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm ${className}`}
    >
      {showDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full bg-white/60 ${
            dotClassName ?? ""
          }`}
        />
      )}
      {children}
    </span>
  );
}

