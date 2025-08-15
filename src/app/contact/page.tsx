import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Contact } from '@/components/contact';
import { ContactHero } from '@/components/contact-hero';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactHero />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
