"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Cubes, { CubesRef } from "@/components/ui/Cubes";
import ButtonPill from "@/components/ui/ButtonPill";
import Link from "next/link";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

export default function HeroCollage() {
  const cubeRefs = useRef<(CubesRef | null)[]>([]);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const scheduleNextRipple = () => {
      const timeoutId = setTimeout(() => {
        // Pick a random cube (0-5)
        const randomCubeIndex = Math.floor(Math.random() * 6);
        const cubeRef = cubeRefs.current[randomCubeIndex];
        
        if (cubeRef) {
          // Trigger ripple at random location (no params = random location)
          cubeRef.triggerRipple();
        }
        
        // Schedule the next ripple
        scheduleNextRipple();
      }, 5000); // Every 5 seconds

      return timeoutId;
    };

    const timeoutId = scheduleNextRipple();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="py-20">
      <Container>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* 6 Cubes arranged in 3 columns, 2 rows */}
          {/* Row 1 */}
          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[0] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[1] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[2] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          {/* Row 2 */}
          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[3] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[4] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          <div className="md:col-span-1 relative h-[200px] rounded-2xl overflow-hidden">
            <Cubes
              ref={(ref) => {
                cubeRefs.current[5] = ref;
              }}
              gridSize={8}
              maxAngle={60}
              radius={4}
              borderStyle="2px dashed #5227FF"
              faceColor="#1a1a2e"
              rippleColor="#ff6b6b"
              rippleSpeed={1.5}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

          {/* Centered text overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Don&apos;t settle for less
            </h2>
          </div>
        </div>

        {/* CTAs below cubes */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8 mt-8">
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


