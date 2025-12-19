import Container from "@/components/ui/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Divider from "@/components/ui/Divider";

const works = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];

export default function RecentWorks() {
  return (
    <section id="recent-works" className="py-20">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Recent Works
          </h2>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
            aria-label="Scroll down"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <Divider className="mb-12" />

        {/* Works row */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
          {works.map((work) => (
            <div
              key={work.id}
              className="group min-w-[250px] flex-shrink-0 cursor-pointer transition-transform duration-200 hover:-translate-y-1 md:min-w-0"
            >
              <PlaceholderImage
                aspectRatio="4/3"
                rounded="xl"
                className="transition-all duration-200 group-hover:border-white/20"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

