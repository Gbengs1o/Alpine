import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutHero } from '@/components/about-hero';
import  MissionStatement  from '@/components/mission-statement';
import { OurStory } from '@/components/our-story';
import { Advantages } from '@/components/advantages';
import CoreValues from '@/components/core-values';
import { Faq } from '@/components/faq';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <MissionStatement />
        <OurStory />
        <Advantages />
        <CoreValues />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
