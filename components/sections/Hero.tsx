import Container from "@/components/ui/Container";
import Pill from "@/components/ui/Pill";
import ButtonPill from "@/components/ui/ButtonPill";
import LiquidEther from "@/components/ui/LiquidEther";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Liquid background */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          className="h-full w-full"
        />
      </div>

      <Container className="relative z-10 text-center">
        {/* Eyebrow pill */}
        <div className="mb-6 flex justify-center">
          <Pill
            showDot
            className="border-emerald-400/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.55)]"
            dotClassName="bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
          >
            Available for Work
          </Pill>
        </div>

        {/* H1 */}
        <h1 className="mb-6 text-5xl font-extralight leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
          Crafting Digital
          <br />
          Experiences
        </h1>

        {/* Subcopy */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70 md:text-xl">
          Transforming ideas into beautiful, functional designs that resonate with your audience
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ButtonPill variant="primary">Get Started Now</ButtonPill>
          <ButtonPill variant="secondary">See Projects</ButtonPill>
        </div>
      </Container>
    </section>
  );
}

