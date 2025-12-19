import Hero from "@/components/sections/Hero";
import HeroCollage from "@/components/sections/HeroCollage";
import ProjectsMosaic from "@/components/sections/ProjectsMosaic";
import ProjectsCarouselRow from "@/components/sections/ProjectsCarouselRow";
import ProjectsCTA from "@/components/sections/ProjectsCTA";
import About from "@/components/sections/About";
import RecentWorks from "@/components/sections/RecentWorks";
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
      <Hero />
      <HeroCollage />
      <ProjectsMosaic />
      <ProjectsCarouselRow />
      <ProjectsCTA />
      <About />
      <RecentWorks />
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

