import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";

export default function RecentWorks() {
  return (
    <section id="recent-works" className="py-20">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Recent Works
          </h2>
        </div>

        <Divider className="mb-12" />

        {/* Works will be added here */}
      </Container>
    </section>
  );
}

