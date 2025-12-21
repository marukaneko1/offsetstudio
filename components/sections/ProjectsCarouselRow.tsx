"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const sliderRef = useRef<HTMLInputElement>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const maxScrollRef = useRef(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollRef.current) {
        maxScrollRef.current = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    // Update state for visual feedback (slider position)
    setSliderValue(value);
    
    // Directly update scroll position immediately for smooth movement
    if (scrollRef.current && maxScrollRef.current > 0) {
      const scrollPosition = (value / 100) * maxScrollRef.current;
      scrollRef.current.scrollLeft = scrollPosition;
    }
  }, []);

  const handleSliderMouseDown = useCallback(() => {
    // Prevent scrolling while dragging slider
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
    }
  }, []);

  const handleSliderMouseUp = useCallback(() => {
    // Re-enable smooth scrolling after dragging
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);


  return (
    <section className="py-20">
      <Container>
        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide mb-6"
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

        {/* Slider Control */}
        <div className="flex items-center justify-center gap-4">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseDown={handleSliderMouseDown}
            onMouseUp={handleSliderMouseUp}
            onTouchStart={handleSliderMouseDown}
            onTouchEnd={handleSliderMouseUp}
            className="flex-1 max-w-md h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${sliderValue}%, rgba(255,255,255,0.1) ${sliderValue}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
        </div>
      </Container>
    </section>
  );
}

