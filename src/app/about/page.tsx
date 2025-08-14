import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { About } from '@/components/about';
import { Advantages } from '@/components/advantages';
import CoreValues from '@/components/core-values';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <About />
        <Advantages />
        <CoreValues />
      </main>
      <Footer />
    </div>
  );
}
