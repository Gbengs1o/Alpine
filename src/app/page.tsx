import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import  Portfolio from '@/components/portfolio';
import { Faq } from '@/components/faq';
import { HvacEstimator } from '@/components/hvac-estimator';
import { Contact } from '@/components/contact';


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Faq />
        <HvacEstimator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
