"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileWarningModal() {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only check on client side and only for mobile devices
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768;
      const isMobile = isMobileDevice || isSmallScreen;
      
      // Only show on mobile, never on desktop
      if (isMobile && window.innerWidth < 768) {
        const hasSeenWarning = localStorage.getItem("mobile-warning-dismissed");
        if (!hasSeenWarning) {
          setShowModal(true);
          document.body.style.overflow = "hidden";
        }
      }
    };
    
    checkMobile();
    
    // Re-check on resize to handle window resizing
    const handleResize = () => {
      if (typeof window === "undefined") return;
      
      if (window.innerWidth >= 768) {
        // If resized to desktop, hide modal
        setShowModal(false);
        document.body.style.overflow = "";
      } else if (window.innerWidth < 768) {
        checkMobile();
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDismiss = () => {
    setShowModal(false);
    localStorage.setItem("mobile-warning-dismissed", "true");
    document.body.style.overflow = "";
  };

  // Only render on mobile screens
  if (!mounted || !showModal) return null;
  
  // Double check screen size before rendering
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm md:hidden">
      <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-black/95 p-8 shadow-2xl backdrop-blur-xl">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto text-white/80"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
          </div>
          
          <h2 className="mb-4 text-2xl font-light text-white">
            Best Experience on Desktop
          </h2>
          
          <p className="mb-6 text-white/70 leading-relaxed">
            For the best experience viewing our portfolio, we recommend using a laptop or desktop computer. The site is optimized for larger screens to showcase our work properly.
          </p>
          
          <button
            onClick={handleDismiss}
            className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white transition-all hover:bg-white/20 hover:border-white/40"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
