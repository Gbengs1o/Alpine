import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Faq } from '@/components/faq';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* The CSS parallax container */}
        <div className="relative h-[60vh] min-h-[500px] bg-cover bg-center bg-fixed bg-[url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop')]">
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center p-4">
            <p className="flex items-center justify-center text-sm font-bold tracking-widest text-white/80 uppercase mb-4 animate-fade-in-slide [animation-delay:200ms]">
              <span className="text-lg font-bold text-accent mr-2">•</span>
              Our Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 animate-fade-in-slide [animation-delay:400ms]">
              A Showcase of Our Work
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-slide [animation-delay:600ms]">
              From large-scale commercial VRF systems to custom residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects below.
            </p>
          </div>
        </div>
        
        {/* The portfolio gallery will be added here in a future step */}
        <div className="py-24 bg-background text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Projects Are Coming Soon</h2>
            <p className="text-muted-foreground">We are currently curating a gallery of our best work. Please check back later!</p>
        </div>

        <Faq />
      </main>
      <Footer />
    </div>
  );
}
