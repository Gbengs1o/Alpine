import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServicesDetailed } from '@/components/services-detailed';
import { Faq } from '@/components/faq';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServicesDetailed />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
