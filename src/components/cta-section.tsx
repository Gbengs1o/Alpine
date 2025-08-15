import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mountain, Phone } from 'lucide-react';

export function CtaSection() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=35+Aladelola+Street%2C+Ikosi%2C+Ketu%2C+LAGOS";

  const videoId = "6NANDnG-Z_I";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0&modestbranding=1`;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background YouTube Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <iframe
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.77vh', // 100 * (16/9)
            height: '56.25vw', // 100 * (9/16)
            minWidth: '100%',
            minHeight: '100%',
          }}
          src={youtubeEmbedUrl}
          title="YouTube video player background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Foreground Trees */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-20 bg-[url('/images/foreground-trees.png')] bg-bottom bg-repeat-x pointer-events-none"
      ></div>

      {/* Header / Navigation */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4">
        <div className="container mx-auto flex items-center justify-between text-white">
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Mountain className="h-7 w-7" />
            <span className="text-xl font-bold">Alpine</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <div className="flex items-center bg-black/20 rounded-full p-1 text-sm">
              <button className="px-3 py-1 rounded-full bg-white text-black">EN</button>
              <button className="px-3 py-1 rounded-full">FR</button>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+234 909 090 4363</span>
            </div>
            <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 rounded-full">
              <Link href="/contact">Book a Repair</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {/* CHANGE 1: Adjusted bottom padding for mobile */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16 sm:pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 items-end">
          {/* Left Side: Main Headline */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Breathe Easy —{/* Spacing is added here for natural wrap */}
              {/* CHANGE 2: Responsive line break */}
              <br className="hidden md:block" />
              We've Got This
            </h1>
          </div>

          {/* Right Side: Subtext and Buttons */}
          <div className="flex flex-col items-start gap-6">
            <p className="text-base md:text-lg text-neutral-200 max-w-md">
              Serving homes and small businesses with same-day AC repairs, installations, and maintenance. Trusted local service. Guaranteed results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base w-full sm:w-auto">
                <Link href="/contact">
                  Book a Repair
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base w-full sm:w-auto">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Our Location
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}