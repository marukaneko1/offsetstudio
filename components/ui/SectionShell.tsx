import { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
}

export default function SectionShell({ children, className = "" }: SectionShellProps) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/5 p-8 md:p-12 lg:p-16 ${className}`}
    >
      {children}
    </div>
  );
}



