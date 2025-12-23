"use client";

import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

export default function FooterCTA() {
  const { openModal } = useBookingModal();

  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionShell>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Pill
                showDot
                className="border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.55)]"
                dotClassName="bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
              >
                Available for Work
              </Pill>
            </div>
            <h2 className="mb-6 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              Let&apos;s Work Together
            </h2>
            <p className="mb-8 mx-auto max-w-2xl text-lg text-white/70">
              Ready to bring your vision to life? Get in touch and let&apos;s create something amazing.
            </p>
            <ButtonPill variant="primary" className="mx-auto" onClick={openModal}>
              Book a Free Call
            </ButtonPill>

            {/* Social icons */}
            <div className="mt-12 flex justify-center gap-6">
              {/* LinkedIn */}
              <div
                className="text-white/60 transition-colors hover:text-white cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-current"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>

              {/* Website */}
              <div
                className="text-white/60 transition-colors hover:text-white cursor-pointer"
                aria-label="Website"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-current"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>

              {/* Gmail */}
              <div
                className="text-white/60 transition-colors hover:text-white cursor-pointer"
                aria-label="Email"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-current"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </div>

              {/* X (Twitter) */}
              <div
                className="text-white/60 transition-colors hover:text-white cursor-pointer"
                aria-label="X (Twitter)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

