import Container from "@/components/ui/Container";
import ButtonPill from "@/components/ui/ButtonPill";
import Link from "next/link";

export default function ProjectsCTA() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <Link
            href="/projects"
            className="text-white/70 transition-colors hover:text-white"
          >
            All Projects →
          </Link>
          <ButtonPill variant="primary">Book a Free Call</ButtonPill>
        </div>
      </Container>
    </section>
  );
}



