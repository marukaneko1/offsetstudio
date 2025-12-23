import Container from "@/components/ui/Container";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "180+", label: "Design projects completed" },
  { value: "96%", label: "Client satisfaction rate" },
  { value: "20+", label: "Years of combined experience" },
];

export default function Stats() {
  return (
    <section id="stats" className="py-12 sm:py-16 md:py-20">
      <Container>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.value}
                className={`text-center transition-all duration-300 hover:scale-105 hover:opacity-100 cursor-default group ${
                  index < stats.length - 1
                    ? "border-b border-white/10 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8"
                    : ""
                }`}
              >
                <div className="mb-2 text-4xl font-light text-white md:text-5xl transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 transition-all duration-300 group-hover:text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

