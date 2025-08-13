import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Advantages } from '@/components/advantages';
import { Services } from '@/components/services';
import { Portfolio } from '@/components/portfolio';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Advantages />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
