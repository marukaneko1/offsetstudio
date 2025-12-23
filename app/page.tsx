import TopHeader from "@/components/sections/TopHeader";
import Hero from "@/components/sections/Hero";
import HeroCollage from "@/components/sections/HeroCollage";
import ProjectsMosaic from "@/components/sections/ProjectsMosaic";
import ProjectsCarouselRow from "@/components/sections/ProjectsCarouselRow";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Reviews from "@/components/sections/Reviews";
import Stats from "@/components/sections/Stats";
import FAQ from "@/components/sections/FAQ";
import FooterCTA from "@/components/sections/FooterCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <TopHeader />
      <Hero />
      <ProjectsMosaic />
      <HeroCollage />
      <ProjectsCarouselRow />
      <About />
      <Process />
      <Services />
      <Reviews />
      <Stats />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  );
}

