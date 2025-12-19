import Container from "@/components/ui/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function HeroCollage() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Left small image */}
          <div className="md:col-span-1">
            <PlaceholderImage aspectRatio="3/4" rounded="2xl" />
          </div>

          {/* Center large image */}
          <div className="md:col-span-1">
            <PlaceholderImage aspectRatio="4/3" rounded="2xl" />
          </div>

          {/* Right small image */}
          <div className="md:col-span-1">
            <PlaceholderImage aspectRatio="3/4" rounded="2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}

