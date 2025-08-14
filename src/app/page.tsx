import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Advantages } from '@/components/advantages';
import CoreValues from '@/components/core-values';
import { Services } from '@/components/services';
import Portfolio from '@/components/portfolio';
import { Faq } from '@/components/faq';


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Advantages />
        <Services />
        <CoreValues />
        <Portfolio />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
