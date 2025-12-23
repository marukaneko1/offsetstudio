"use client";

import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import CircularGallery from "@/components/ui/CircularGallery";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import Chip from "@/components/ui/Chip";
import Divider from "@/components/ui/Divider";
import {
  useBookingModal,
  useServicesListModal,
} from "@/components/providers/BookingModalProvider";

interface ServiceCard {
  title: string;
  body: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "Brand Identity",
    body: "Complete brand identity systems that tell your story",
  },
  {
    title: "Brand Design",
    body: "Comprehensive design solutions for your brand",
  },
  {
    title: "Package Design",
    body: "Eye-catching packaging that stands out on shelves",
  },
  {
    title: "Mockup Design",
    body: "Realistic mockups to showcase your products",
  },
];

const serviceChips = [
  "Brand Strategy",
  "Logo Design",
  "Visual Identity",
  "Brand Guidelines",
];

const capabilities = [
  "Copywriting",
  "Brand Graphics",
  "Brand Migration",
  "Packaging Design",
  "Branding",
  "Slide Decks",
  "Social Media",
  "Icons",
  "Brand Landing Pages",
  "Optimization",
  "Brand Integrations",
  "Brand Visibility",
];

export default function Services() {
  const { openModal } = useBookingModal();
  const { openServicesModal } = useServicesListModal();

  return (
    <section id="services" className="py-12 md:py-20">
      <Container>
        <SectionShell className="relative overflow-hidden">
          {/* CircularGallery Background - spans entire section */}
          <div className="absolute inset-0 -z-10">
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
            {/* Dark overlay to make gallery darker */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Content - positioned on top */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-12 rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="mb-4">
                <Pill>Design services</Pill>
              </div>
              <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-6xl">
                Services
              </h2>
              <p className="mb-6 text-lg text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Comprehensive design solutions tailored to your needs
              </p>

              {/* Service chips */}
              <div className="mb-8 flex flex-wrap gap-3">
                {serviceChips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

              <Divider className="mb-8" />

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonPill variant="primary" onClick={openModal}>
                  Book a Free Call
                </ButtonPill>
                <ButtonPill variant="secondary" onClick={openServicesModal}>
                  See Services
                </ButtonPill>
              </div>
            </div>

            {/* Service cards grid */}
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {serviceCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-200 hover:border-white/30 hover:bg-white/8"
                >
                  <h3 className="mb-3 text-xl font-medium text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    {card.title}
                  </h3>
                  <p className="text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Capability tags scroller */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {capabilities.map((capability) => (
                  <Chip key={capability} className="flex-shrink-0">
                    {capability}
                  </Chip>
                ))}
              </div>
              <button
                onClick={openServicesModal}
                className="text-left text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
              >
                View full services list →
              </button>
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

