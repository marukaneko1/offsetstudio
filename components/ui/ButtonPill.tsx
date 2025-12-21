import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ButtonPill({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonPillProps) {
  const baseClasses =
    "rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none";
  
  const variantClasses =
    variant === "primary"
      ? "border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.20),0_10px_30px_rgba(255,255,255,0.06)] hover:scale-[1.02]"
      : "border-white/15 bg-transparent text-white/70 hover:border-white/25 hover:text-white hover:scale-[1.02]";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}



