import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Advantages } from '@/components/advantages';
import CoreValues from '@/components/core-values';
import Portfolio from '@/components/portfolio';
import { Services } from '@/components/services';
import { Faq } from '@/components/faq';
import { HvacEstimator } from '@/components/hvac-estimator';
import { Contact } from '@/components/contact';


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Advantages />
        <CoreValues />
        <Portfolio />
        <Services />
        <Faq />
        <HvacEstimator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
