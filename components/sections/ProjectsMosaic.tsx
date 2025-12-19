import Container from "@/components/ui/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import GlassPillLink from "@/components/ui/GlassPillLink";

interface Project {
  id: string;
  aspectRatio: "1/1" | "4/3" | "3/4";
  height?: "tall" | "normal";
}

const projects: Project[] = [
  { id: "1", aspectRatio: "4/3", height: "normal" },
  { id: "2", aspectRatio: "3/4", height: "tall" },
  { id: "3", aspectRatio: "4/3", height: "normal" },
  { id: "4", aspectRatio: "1/1", height: "normal" },
  { id: "5", aspectRatio: "3/4", height: "tall" },
  { id: "6", aspectRatio: "4/3", height: "normal" },
];

export default function ProjectsMosaic() {
  return (
    <section id="projects" className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 md:grid-rows-[auto_auto_auto]">
          {projects.map((project) => {
            // Create masonry effect: tall items span 2 rows
            const rowSpan = project.height === "tall" ? "md:row-span-2" : "";
            
            return (
              <div
                key={project.id}
                className={`group relative cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${rowSpan}`}
              >
                <PlaceholderImage
                  aspectRatio={project.aspectRatio}
                  rounded="2xl"
                  className="transition-all duration-200 group-hover:border-white/20"
                  overlay={
                    <GlassPillLink href={`/project/${project.id}`}>
                      View Casestudy
                    </GlassPillLink>
                  }
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

