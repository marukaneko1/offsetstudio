"use client";

import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import Divider from "@/components/ui/Divider";
import {
  useBookingModal,
  useServicesListModal,
} from "@/components/providers/BookingModalProvider";

interface Review {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Maru Kaneko",
    role: "Founder",
    company: "Void Asset Management",
    quote: "Exceptional design work that elevated our brand presence and communication.",
    rating: 5.0,
  },
  {
    name: "Efraim Levy",
    role: "CEO",
    company: "Seed Pulse Fund",
    quote: "Outstanding creative solutions that perfectly aligned with our vision and goals.",
    rating: 5.0,
  },
  {
    name: "John Carter",
    role: "CMO",
    company: "JWS",
    quote: "Professional, strategic, and results-driven design that made a significant impact.",
    rating: 5.0,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-medium text-white">{rating}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative">
            {/* Empty star (always visible) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-yellow-400/40"
            >
              <path d="M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z" />
            </svg>
            {/* Filled star (fills on hover with animation) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="text-yellow-400 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"
              style={{
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <path d="M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const { openModal } = useBookingModal();
  const { openServicesModal } = useServicesListModal();

  return (
    <section id="reviews" className="py-20">
      <Container>
        <SectionShell>
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Pill>Reviews</Pill>
            </div>
            <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              Client Reviews
            </h2>
            <p className="mb-8 text-lg text-white/70">
              What our clients say about working with us
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonPill variant="primary" onClick={openModal}>
                Book a Free Call
              </ButtonPill>
              <ButtonPill variant="secondary" onClick={openServicesModal}>
                See Services
              </ButtonPill>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {reviews.map((review) => (
                  <div
                    key={review.name}
                    className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-200 hover:border-white/15"
                  >
                    {/* Name and role */}
                    <div className="mb-2">
                      <div className="font-medium text-white">{review.name}</div>
                      <div className="text-sm text-white/60">
                        {review.role} of {review.company}
                      </div>
                    </div>

                    <Divider className="mb-4" />

                    {/* Quote */}
                    <p className="mb-4 text-white/70">{review.quote}</p>

                    {/* Rating */}
                    <StarRating rating={review.rating} />
                  </div>
                ))}
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

