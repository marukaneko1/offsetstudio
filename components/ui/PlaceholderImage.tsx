interface PlaceholderImageProps {
  aspectRatio?: "1/1" | "4/3" | "3/4" | "16/9" | "9/16";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  className?: string;
  overlay?: React.ReactNode;
}

export default function PlaceholderImage({
  aspectRatio = "4/3",
  rounded = "xl",
  className = "",
  overlay,
}: PlaceholderImageProps) {
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
    none: "",
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 ${roundedClasses[rounded]} ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      {overlay && (
        <div className="absolute inset-0 flex items-end justify-center p-4">
          {overlay}
        </div>
      )}
    </div>
  );
}

