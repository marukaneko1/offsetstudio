"use client";

import Container from "@/components/ui/Container";
import ButtonPill from "@/components/ui/ButtonPill";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

export default function ProjectsCTA() {
  const { openModal } = useBookingModal();

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <ButtonPill variant="primary" onClick={openModal}>
            Book a Free Call
          </ButtonPill>
        </div>
      </Container>
    </section>
  );
}



