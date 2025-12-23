"use client";

import Container from "@/components/ui/Container";
import ButtonPill from "@/components/ui/ButtonPill";
import Link from "next/link";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

export default function ProjectsCTA() {
  const { openModal } = useBookingModal();

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link
            href="/projects"
            className="text-white/70 transition-colors hover:text-white"
          >
            All Projects →
          </Link>
          <ButtonPill variant="primary" onClick={openModal}>
            Book a Free Call
          </ButtonPill>
        </div>
      </Container>
    </section>
  );
}



