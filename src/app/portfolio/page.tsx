import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Portfolio from '@/components/portfolio';
import { Faq } from '@/components/faq';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Portfolio />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
