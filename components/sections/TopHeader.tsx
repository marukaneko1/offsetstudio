"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import GooeyNav from "@/components/ui/GooeyNav";

const items = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function TopHeader() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const marker = window.innerHeight * 0.3; // 30% from top
      let nextIndex: number | null = null;

      // Check each section in order
      for (let i = 0; i < items.length; i++) {
        const href = items[i].href;
        if (!href.startsWith("#")) continue;
        
        const sectionId = href.substring(1); // Remove #
        const el = document.getElementById(sectionId);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();

        // Section covers the marker line
        if (rect.top <= marker && rect.bottom >= marker) {
          nextIndex = i;
          break;
        }
      }

      // Fallback: if none covers marker, pick the last section above it
      if (nextIndex === null) {
        for (let i = items.length - 1; i >= 0; i--) {
          const href = items[i].href;
          if (!href.startsWith("#")) continue;
          
          const sectionId = href.substring(1);
          const el = document.getElementById(sectionId);
          if (!el) continue;
          
          const rect = el.getBoundingClientRect();
          if (rect.top < marker) {
            nextIndex = i;
            break;
          }
        }
      }

      // Default to first item if at top
      if (nextIndex === null) {
        nextIndex = 0;
      }

      if (nextIndex !== null && nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateActive();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2 z-40 sm:top-4">
      <Container className="flex justify-center px-2 sm:px-6">
        <div className="pointer-events-auto inline-flex items-center rounded-full border border-white/15 bg-white/5/80 px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.65)] max-w-full overflow-hidden">
          <GooeyNav items={items} activeIndex={activeIndex} />
        </div>
      </Container>
    </header>
  );
}




