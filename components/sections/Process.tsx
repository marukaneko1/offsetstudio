"use client";

import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import BounceCards from "@/components/ui/BounceCards";
import Divider from "@/components/ui/Divider";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

interface Step {
  step: number;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Define Your Vision",
    body: "We start by understanding your goals, target audience, and brand identity to create a clear roadmap.",
  },
  {
    step: 2,
    title: "Submit Your Request",
    body: "Share your project details and requirements. We'll review and provide a detailed proposal.",
  },
  {
    step: 3,
    title: "Project Delivered",
    body: "Receive your completed design with revisions and support to ensure everything meets your vision.",
  },
];

export default function Process() {
  const { openModal } = useBookingModal();

  return (
    <section id="process" className="py-20">
      <Container>
        <SectionShell>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: BounceCards */}
            <div className="flex items-center justify-center">
              <BounceCards
                className="custom-bounceCards"
                images={[
                  "https://picsum.photos/400/400?grayscale",
                  "https://picsum.photos/500/500?grayscale",
                  "https://picsum.photos/600/600?grayscale",
                  "https://picsum.photos/700/700?grayscale",
                  "https://picsum.photos/300/300?grayscale",
                ]}
                containerWidth={500}
                containerHeight={250}
                animationDelay={1}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={[
                  "rotate(5deg) translate(-150px)",
                  "rotate(0deg) translate(-70px)",
                  "rotate(-5deg)",
                  "rotate(5deg) translate(70px)",
                  "rotate(-5deg) translate(150px)",
                ]}
                enableHover={true}
              />
            </div>

            {/* Right: Content */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="mb-4">
                  <Pill>Design process</Pill>
                </div>
                <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                  Process
                </h2>
                <p className="mb-8 text-lg text-white/70">
                  A streamlined approach to bringing your vision to life
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <ButtonPill variant="primary" onClick={openModal}>
                    Book a Free Call
                  </ButtonPill>
                </div>
              </div>

              {/* Step cards */}
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.step}
                    className="group relative rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white/8"
                  >
                    <div className="absolute right-6 top-6 text-2xl font-light text-white/30">
                      {step.step}
                    </div>
                    <h3 className="mb-3 text-xl font-medium text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      {step.title}
                    </h3>
                    <Divider className="mb-4" />
                    <p className="text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

