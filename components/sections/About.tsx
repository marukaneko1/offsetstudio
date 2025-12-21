 "use client";

import Container from "@/components/ui/Container";
import Chip from "@/components/ui/Chip";
import Lanyard from "@/components/ui/Lanyard";

const skills = [
  "Brand Design",
  "UI/UX",
  "Packaging",
  "Web Design",
  "Illustration",
];

const experience = [
  { role: "Senior Designer", company: "Creative Studio", years: "2020-2024" },
  { role: "Design Lead", company: "Digital Agency", years: "2018-2020" },
  { role: "Designer", company: "Startup Inc", years: "2015-2018" },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <div>
            <h2 className="mb-6 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
              Meet Meily
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-white/70">
              I&apos;m a passionate designer with over 15 years of experience creating
              memorable brand experiences. I specialize in transforming complex ideas
              into elegant, user-centered designs.
            </p>

            {/* Chips */}
            <div className="mb-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>

            {/* Experience table */}
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <div>
                    <div className="font-medium text-white">{exp.role}</div>
                    <div className="text-sm text-white/60">{exp.company}</div>
                  </div>
                  <div className="text-sm text-white/60">{exp.years}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Lanyard */}
          <div className="flex items-center justify-center">
            <Lanyard />
          </div>
        </div>
      </Container>
    </section>
  );
}

