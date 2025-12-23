 "use client";

import Container from "@/components/ui/Container";
import Chip from "@/components/ui/Chip";
import Lanyard from "@/components/ui/Lanyard";

const skills = [
  "Visual Identity",
  "Brand Consistency",
  "Design Systems",
  "Creative Direction",
  "Art Direction",
];

const services = [
  { service: "Brand Identity", category: "Brand & Identity", description: "Complete visual identity systems" },
  { service: "UI/UX Design", category: "Digital Design", description: "User-centered interface design" },
  { service: "Motion & Animation", category: "Creative Services", description: "Dynamic brand experiences" },
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <div>
            <h2 className="mb-6 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              Visuals matter
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-white/70">
              Whether it&apos;s a website, a business proposal, a deck, or ad it should all be one theme continuously and be perfectly executed. Every touchpoint is an opportunity to reinforce your brand identity and create a cohesive experience that resonates with your audience. From the smallest detail to the grandest campaign, visual consistency builds trust, recognition, and lasting impact.
            </p>

            {/* Chips */}
            <div className="mb-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>

          {/* Services table */}
          <div className="space-y-4">
            {services.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-white/10 pb-4"
              >
                <div>
                  <div className="font-medium text-white">{item.service}</div>
                  <div className="text-sm text-white/60">{item.category}</div>
                </div>
                <div className="text-sm text-white/60">{item.description}</div>
              </div>
            ))}
          </div>
          </div>

          {/* Right: Interactive Lanyard */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Lanyard />
            <p className="text-sm text-white/60">Pull on me</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

