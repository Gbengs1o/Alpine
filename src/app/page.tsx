import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { HvacEstimator } from '@/components/hvac-estimator';
import { Portfolio } from '@/components/portfolio';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <HvacEstimator />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
