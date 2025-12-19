import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import Chip from "@/components/ui/Chip";
import Divider from "@/components/ui/Divider";

interface ServiceCard {
  title: string;
  body: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "Brand Identity",
    body: "Complete brand identity systems that tell your story",
  },
  {
    title: "Brand Design",
    body: "Comprehensive design solutions for your brand",
  },
  {
    title: "Package Design",
    body: "Eye-catching packaging that stands out on shelves",
  },
  {
    title: "Mockup Design",
    body: "Realistic mockups to showcase your products",
  },
];

const serviceChips = [
  "Brand Strategy",
  "Logo Design",
  "Visual Identity",
  "Brand Guidelines",
];

const capabilities = [
  "Copywriting",
  "Brand Graphics",
  "Brand Migration",
  "Packaging Design",
  "Branding",
  "Slide Decks",
  "Social Media",
  "Icons",
  "Brand Landing Pages",
  "Optimization",
  "Brand Integrations",
  "Brand Visibility",
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <Container>
        <SectionShell>
          {/* Header */}
          <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              <div className="mb-4">
                <Pill>Design services</Pill>
              </div>
              <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                Services
              </h2>
              <p className="mb-6 text-lg text-white/70">
                Comprehensive design solutions tailored to your needs
              </p>

              {/* Service chips */}
              <div className="mb-8 flex flex-wrap gap-3">
                {serviceChips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>

              <Divider className="mb-8" />

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonPill variant="primary">Book a Free Call</ButtonPill>
                <ButtonPill variant="secondary">See Projects</ButtonPill>
              </div>
            </div>

            {/* Right: Image */}
            <div>
              <PlaceholderImage aspectRatio="4/3" rounded="2xl" />
            </div>
          </div>

          {/* Service cards grid */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-200 hover:border-white/15"
              >
                <h3 className="mb-3 text-xl font-medium text-white">
                  {card.title}
                </h3>
                <p className="text-white/70">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Capability tags scroller */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {capabilities.map((capability) => (
              <Chip key={capability} className="flex-shrink-0">
                {capability}
              </Chip>
            ))}
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

