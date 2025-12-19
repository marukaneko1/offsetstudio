"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import GlassPillLink from "@/components/ui/GlassPillLink";

interface Project {
  id: string;
}

const projects: Project[] = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];

export default function ProjectsCarouselRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20">
      <Container>
        <div className="flex items-center gap-6">
          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex flex-1 gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative min-w-[300px] flex-shrink-0 cursor-pointer transition-transform duration-200 hover:-translate-y-1 md:min-w-[400px]"
              >
                <PlaceholderImage
                  aspectRatio="4/3"
                  rounded="2xl"
                  className="transition-all duration-200 group-hover:border-white/20"
                  overlay={
                    <GlassPillLink href={`/project/${project.id}`}>
                      View Casestudy
                    </GlassPillLink>
                  }
                />
              </div>
            ))}
          </div>

          {/* Arrow button */}
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
            aria-label="Scroll to next projects"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}

