"use client";

import Container from "@/components/ui/Container";
import GooeyNav from "@/components/ui/GooeyNav";

const items = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function TopHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40">
      <Container className="flex justify-center">
        <div className="pointer-events-auto inline-flex items-center rounded-full border border-white/15 bg-white/5/80 px-3 py-1.5 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
          <GooeyNav items={items} />
        </div>
      </Container>
    </header>
  );
}




