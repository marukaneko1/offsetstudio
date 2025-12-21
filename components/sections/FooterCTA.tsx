import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";

export default function FooterCTA() {
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
            <ButtonPill variant="primary" className="mx-auto">
              Book a Free Call
            </ButtonPill>

            {/* Social icons */}
            <div className="mt-12 flex justify-center gap-6">
              {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/60 transition-colors hover:text-white"
                  aria-label={social}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-current"
                  >
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

