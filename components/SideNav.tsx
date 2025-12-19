"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SectionId =
  | "hero"
  | "projects"
  | "about"
  | "recent-works"
  | "process"
  | "services"
  | "reviews"
  | "stats"
  | "faq"
  | "contact";

const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Top" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "recent-works", label: "Works" },
  { id: "process", label: "Process" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "stats", label: "Stats" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<SectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const id = visible[0].target.id as SectionId;
          if (sections.some((s) => s.id === id)) {
            setActiveId(id);
          }
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <nav className="pointer-events-auto flex flex-col items-center gap-4 rounded-full border border-white/10 bg-black/10 px-2 py-4 backdrop-blur-md">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center justify-center"
              scroll={true}
            >
              <span
                className={`flex h-3 w-3 items-center justify-center rounded-full border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none ${
                  isActive
                    ? "scale-110 border-white/60 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : "border-white/15 bg-white/10 group-hover:border-white/40 group-hover:bg-white/40"
                }`}
              />
              <span className="pointer-events-none absolute right-5 rounded-full border border-white/10 bg-black/80 px-3 py-1 text-xs text-white/80 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100">
                {section.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


