import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Faq } from '@/components/faq';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] min-h-[400px] bg-cover bg-center text-white flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="relative z-10 text-center px-4 animate-fade-in-slide">
                <p className="flex items-center justify-center text-sm font-bold tracking-widest text-white/80 uppercase mb-4">
                    <span className="text-lg font-bold text-accent mr-2">•</span>Our Portfolio
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">A Showcase of Our Work</h1>
                <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                    From large-scale commercial VRF systems to custom residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects below.
                </p>
            </div>
        </section>
        {/* The portfolio gallery will be added here in a future step */}
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
