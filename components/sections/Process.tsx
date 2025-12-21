import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import BounceCards from "@/components/ui/BounceCards";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import Divider from "@/components/ui/Divider";

interface Step {
  step: number;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Define Your Vision",
    body: "We start by understanding your goals, target audience, and brand identity to create a clear roadmap.",
  },
  {
    step: 2,
    title: "Submit Your Request",
    body: "Share your project details and requirements. We'll review and provide a detailed proposal.",
  },
  {
    step: 3,
    title: "Project Delivered",
    body: "Receive your completed design with revisions and support to ensure everything meets your vision.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20">
      <Container>
        <SectionShell>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: BounceCards */}
            <div className="flex items-center justify-center">
              <BounceCards
                className="custom-bounceCards"
                images={[
                  "https://picsum.photos/400/400?grayscale",
                  "https://picsum.photos/500/500?grayscale",
                  "https://picsum.photos/600/600?grayscale",
                  "https://picsum.photos/700/700?grayscale",
                  "https://picsum.photos/300/300?grayscale",
                ]}
                containerWidth={500}
                containerHeight={250}
                animationDelay={1}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={[
                  "rotate(5deg) translate(-150px)",
                  "rotate(0deg) translate(-70px)",
                  "rotate(-5deg)",
                  "rotate(5deg) translate(70px)",
                  "rotate(-5deg) translate(150px)",
                ]}
                enableHover={true}
              />
            </div>

            {/* Right: Content */}
            <div>
              <div className="mb-4">
                <Pill>Design process</Pill>
              </div>
              <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                Process
              </h2>
              <p className="mb-8 text-lg text-white/70">
                A streamlined approach to bringing your vision to life
              </p>

              {/* CTAs */}
              <div className="mb-12 flex flex-col gap-4 sm:flex-row">
                <ButtonPill variant="primary">Book a Free Call</ButtonPill>
                <ButtonPill variant="secondary">See Projects</ButtonPill>
              </div>

              {/* Step cards */}
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.step}
                    className="group relative rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-white/15"
                  >
                    <div className="absolute right-6 top-6 text-2xl font-light text-white/30">
                      {step.step}
                    </div>
                    <h3 className="mb-3 text-xl font-medium text-white">
                      {step.title}
                    </h3>
                    <Divider className="mb-4" />
                    <p className="text-white/70">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

