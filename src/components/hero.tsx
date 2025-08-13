"use client";

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const pinContainer = pinContainerRef.current;
      const heroSection = heroSectionRef.current;
      const heroContent = heroContentRef.current;
      const videoIframe = videoIframeRef.current;

      if (!pinContainer || !heroSection || !heroContent || !videoIframe) {
        return;
      }

      const scrollableHeight = pinContainer.offsetHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      
      let progress = Math.min(1, scrollTop / scrollableHeight);
      if (scrollableHeight <= 0) {
        progress = 1;
      }


      // Fade in entire section
      const fadeInEndProgress = 0.25; 
      if (progress < fadeInEndProgress) {
        heroSection.style.opacity = (progress / fadeInEndProgress).toString();
      } else {
        heroSection.style.opacity = '1';
      }
      
      // Zoom out video
      const startScale = 2.5;
      const endScale = 1;
      const scaleRange = startScale - endScale;
      const currentScale = startScale - (progress * scaleRange); 
      videoIframe.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

      // Fade in text
      const textFadeStartProgress = 0.4;
      if (progress > textFadeStartProgress) {
        const textFadeProgress = (progress - textFadeStartProgress) / (1 - textFadeStartProgress);
        heroContent.style.opacity = textFadeProgress.toString();
      } else {
        heroContent.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set correct initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={pinContainerRef} style={{ height: '250vh', position: 'relative' }}>
      <section 
        ref={heroSectionRef} 
        className="h-screen w-full sticky top-0 overflow-hidden flex items-center justify-center text-center"
        style={{ opacity: 0 }}
      >
        <div className="absolute top-0 left-0 w-full h-full z-[-2]">
          <iframe 
            ref={videoIframeRef}
            src="https://www.youtube.com/embed/gCRNEJxDJKM?autoplay=1&mute=1&loop=1&playlist=gCRNEJxDJKM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-[100vw] h-[56.25vw] min-h-screen border-0 pointer-events-none transition-transform duration-[100ms] ease-linear"
            style={{ transform: 'translate(-50%, -50%) scale(2.5)' }}
          ></iframe>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(40,70,110,0.15)] z-[-1]"></div>

        <div ref={heroContentRef} className="z-10 text-white p-5" style={{ opacity: 0 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
            EXPERIENCE COOLING AT ITS PEAK
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            Premium HVAC Solutions for Every Space – Powered by Alpine Tech
          </p>
          <Button 
            asChild
            size="lg"
            className="mt-8 bg-[rgba(255,255,255,0.4)] text-black border border-[rgba(255,255,255,0.2)] rounded-2xl backdrop-blur-md hover:bg-[rgba(255,255,255,0.6)]"
          >
            <Link href="#services">Explore Our Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
