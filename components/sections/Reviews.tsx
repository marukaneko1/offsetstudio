import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import Divider from "@/components/ui/Divider";

interface Review {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "June Lee",
    role: "CEO",
    company: "GreenRoots",
    quote: "Outstanding work! The design perfectly captured our brand vision and exceeded all expectations.",
    rating: 5.0,
  },
  {
    name: "Jona Carter",
    role: "Founder",
    company: "EcoLux",
    quote: "Professional, creative, and incredibly responsive. The final deliverables were exactly what we needed.",
    rating: 5.0,
  },
  {
    name: "Sofia Toms",
    role: "Founder",
    company: "GreenK Studios",
    quote: "Working with this team was a game-changer. The attention to detail and creative solutions were impressive.",
    rating: 5.0,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-medium text-white">{rating}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-yellow-400"
          >
            <path d="M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20">
      <Container>
        <SectionShell>
          {/* Header */}
          <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image */}
            <div>
              <PlaceholderImage aspectRatio="4/3" rounded="2xl" />
            </div>

            {/* Right: Content */}
            <div>
              <div className="mb-4">
                <Pill>Reviews</Pill>
              </div>
              <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                Client Reviews
              </h2>
              <p className="mb-8 text-lg text-white/70">
                What our clients say about working with us
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonPill variant="primary">Book a Free Call</ButtonPill>
                <ButtonPill variant="secondary">See Services</ButtonPill>
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-200 hover:border-white/15"
              >
                {/* Avatar */}
                <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-white/20 to-white/10" />

                {/* Name and role */}
                <div className="mb-2">
                  <div className="font-medium text-white">{review.name}</div>
                  <div className="text-sm text-white/60">
                    {review.role} of {review.company}
                  </div>
                </div>

                <Divider className="mb-4" />

                {/* Quote */}
                <p className="mb-4 text-white/70">{review.quote}</p>

                {/* Rating */}
                <StarRating rating={review.rating} />
              </div>
            ))}
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

