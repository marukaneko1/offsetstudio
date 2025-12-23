import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  className?: string;
}

export default function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[10px] border border-white/10 bg-white/4 px-3 py-1.5 text-sm text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white/90 ${className}`}
    >
      {children}
    </span>
  );
}



