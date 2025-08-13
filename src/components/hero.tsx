
"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Hero() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroViewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const panelContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPanelRef = useRef<HTMLElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect hook translates the user's provided vanilla JS directly into a React hook.
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // For users who prefer reduced motion, make all content visible immediately.
        panelContentsRef.current.forEach(content => content?.classList.add('is-visible'));
        return;
    }
    
    const elements = {
        pinContainer: pinContainerRef.current,
        heroViewport: heroViewportRef.current,
        track: trackRef.current,
        video: videoRef.current,
        panels: panelsRef.current.filter(p => p !== null) as HTMLElement[],
        panelContents: panelContentsRef.current.filter(p => p !== null) as HTMLDivElement[],
        lastPanel: lastPanelRef.current,
        scrollIndicator: scrollIndicatorRef.current,
    };

    if (Object.values(elements).some(el => !el || (Array.isArray(el) && el.length === 0))) {
        console.warn('Hero elements missing, animation will not run.');
        return;
    }

    const numPanels = elements.panels.length;
    const lastPanelIndex = numPanels - 1;

    const exitTimings = {
        revealDuration: 0.20,
        zoomDuration: 0.60,
        fadeDuration: 0.20,
    };

    const revealEnd = exitTimings.revealDuration;
    const zoomEnd = exitTimings.revealDuration + exitTimings.zoomDuration;
    const fadeEnd = zoomEnd + exitTimings.fadeDuration;

    const animateHero = () => {
        if(!elements.pinContainer || !elements.heroViewport || !elements.track || !elements.video || !elements.lastPanel || !elements.scrollIndicator) return;
        
        const scrollTop = window.scrollY;
        
        const totalPinDuration = elements.pinContainer.offsetHeight - window.innerHeight;
        const horizontalPhaseEnd = (window.innerWidth / 100) * 300; 

        if (scrollTop > 50) { 
            elements.scrollIndicator.style.opacity = '0'; 
        } else { 
            elements.scrollIndicator.style.opacity = '1'; 
        }
        
        if (scrollTop <= horizontalPhaseEnd) {
            // New logic: Only show panel content if user has started scrolling
            if (scrollTop === 0) {
              elements.panelContents.forEach(content => content.classList.remove('is-visible'));
            } else {
              const progress = scrollTop / horizontalPhaseEnd;
              const currentPanelIndex = Math.min(lastPanelIndex, Math.floor(progress * numPanels));
              
              elements.panelContents.forEach((content, index) => {
                content.classList.toggle('is-visible', index === currentPanelIndex);
              });
            }

            elements.panels.forEach(p => p.classList.remove('panel-no-blur'));
            
            elements.heroViewport.style.opacity = '1';
            elements.lastPanel.style.opacity = '1';
            elements.video.style.transform = 'scale(1)';
        } else {
            elements.track.style.transform = `translateX(-${elements.track.offsetWidth - window.innerWidth}px)`;
            elements.panelContents.forEach((content, index) => content.classList.toggle('is-visible', index === lastPanelIndex));
            if (elements.lastPanel) {
                elements.lastPanel.classList.add('panel-no-blur');
            }

            const exitSequenceDuration = totalPinDuration - horizontalPhaseEnd;
            if (exitSequenceDuration <= 0) return;

            const exitProgress = (scrollTop - horizontalPhaseEnd) / exitSequenceDuration;

            if (exitProgress <= revealEnd) {
                const revealProgress = exitProgress / revealEnd;
                elements.lastPanel.style.opacity = (1 - revealProgress).toString();
            } else {
                elements.lastPanel.style.opacity = '0';
            }

            if (exitProgress > revealEnd && exitProgress <= zoomEnd) {
                const zoomProgress = (exitProgress - revealEnd) / (zoomEnd - revealEnd);
                const scale = 1 + zoomProgress * 0.5;
                elements.video.style.transform = `scale(${scale})`;
            } else if (exitProgress > zoomEnd) {
                elements.video.style.transform = 'scale(1.5)';
            } else {
                 elements.video.style.transform = 'scale(1)';
            }

            if (exitProgress > zoomEnd && exitProgress <= fadeEnd) {
                const fadeProgress = (exitProgress - zoomEnd) / (fadeEnd - zoomEnd);
                elements.heroViewport.style.opacity = (1 - fadeProgress).toString();
            } else if (exitProgress > fadeEnd) {
                elements.heroViewport.style.opacity = '0';
            } else {
                elements.heroViewport.style.opacity = '1';
            }
        }
    };
    
    let isTicking = false;
    const onScroll = () => {
        if (!isTicking) { 
            window.requestAnimationFrame(() => { 
                animateHero(); 
                isTicking = false; 
            }); 
            isTicking = true; 
        }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    animateHero(); // Initial call to set state

    return () => {
        window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        :root {
            --background-color: #020408;
            --text-color: #eef2f9;
            --highlight-color: #63a4ff;
            --panel-bg-color: rgba(10, 20, 35, 0.25); 
        }
        
        #pin-container-wrapper {
             font-family: 'Inter', sans-serif;
             background-color: var(--background-color);
             color: var(--text-color);
        }

        #pin-container {
            height: calc(300vw + 250vh); 
            position: relative;
        }

        #hero-viewport {
            height: 100vh;
            width: 100%;
            position: sticky;
            top: 0;
            overflow: hidden;
            will-change: opacity;
        }

        #hero-video-background {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: -1;
            will-change: transform;
            overflow: hidden;
        }
        
        #hero-video-background iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 177.77vh; 
            min-width: 100vw;
            height: 56.25vw;
            min-height: 100vh;
            pointer-events: none;
        }

        #horizontal-track {
            display: flex; height: 100%; width: 300%;
            will-change: transform;
        }
        
        .panel {
            width: 100vw; height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 4vw; box-sizing: border-box; position: relative;
            background-color: var(--panel-bg-color);
            backdrop-filter: blur(20px) brightness(90%);
            -webkit-backdrop-filter: blur(20px) brightness(90%);
            border-left: 1px solid rgba(255, 255, 255, 0.05);
            will-change: opacity;
            transition: backdrop-filter 0.5s ease;
        }

        .panel.panel-no-blur {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
        }

        .panel:first-child { border-left: none; }

        .panel-content {
            z-index: 1; max-width: 800px; text-align: center;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s;
            will-change: opacity;
            color: #eef2f9; 
        }
        
        .panel-content.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .panel-title { font-size: clamp(3rem, 7vw, 6rem); font-weight: 900; text-transform: uppercase; line-height: 1.1; margin: 0 0 1rem; text-shadow: 0 4px 25px rgba(0,0,0,0.6); }
        .panel-subtitle { font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 400; line-height: 1.6; margin: 0 0 2rem; max-width: 600px; margin-left: auto; margin-right: auto; text-shadow: 0 2px 10px rgba(0,0,0,0.7); }
        
        .cta-button {
            position: relative;
            overflow: hidden;
            padding: 16px 40px;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #f0f8ff;
            text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            border-radius: 14px;
            border: none;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 
                inset 0 0 0 1.5px rgba(255, 255, 255, 0.2),
                0 8px 32px 0 rgba(0, 0, 0, 0.2);
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .cta-button::after {
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1.5px);
            background-size: 4px 4px;
            opacity: 0.8;
            pointer-events: none;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 75%;
            height: 100%;
            background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100% );
            transform: skewX(-25deg);
            transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cta-button:hover {
            background-color: rgba(255, 255, 255, 0.15);
            box-shadow: 
                inset 0 0 0 1.5px rgba(255, 255, 255, 0.4),
                0 8px 32px 0 rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }

        .cta-button:hover::before {
            left: 150%;
        }
        
        #scroll-indicator { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 100; transition: opacity 0.5s ease; text-align: center; color: rgba(255,255,255,0.7); }
        #scroll-indicator span { display: block; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
        .mouse-icon { width: 24px; height: 40px; border: 2px solid rgba(255,255,255,0.7); border-radius: 12px; position: relative; margin: 0 auto; }
        .mouse-wheel { width: 4px; height: 8px; background: rgba(255,255,255,0.7); border-radius: 2px; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); animation: scroll-wheel 2s infinite; }
        @keyframes scroll-wheel { 0% { top: 8px; opacity: 1; } 50% { top: 20px; opacity: 0; } 100% { top: 8px; opacity: 1; } }
      `}</style>
      <div id="pin-container-wrapper">
        <div id="pin-container" ref={pinContainerRef}>
          <div id="hero-viewport" ref={heroViewportRef}>
            <div id="hero-video-background" ref={videoRef}>
              <iframe
                src="https://www.youtube.com/embed/gCRNEJxDJKM?autoplay=1&mute=1&loop=1&playlist=gCRNEJxDJKM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div id="horizontal-track" ref={trackRef}>
              <section className="panel panel-1" ref={el => { panelsRef.current[0] = el; }}>
                <div className="panel-content" ref={el => { panelContentsRef.current[0] = el; }}>
                  <h1 className="panel-title">The Cool Alpine Experience—Anywhere</h1>
                </div>
              </section>
              <section className="panel panel-2" ref={el => { panelsRef.current[1] = el; }}>
                <div className="panel-content" ref={el => { panelContentsRef.current[1] = el; }}>
                  <h2 className="panel-title">Experience You Can Trust</h2>
                  <p className="panel-subtitle">With over 13 years in the industry, our team of certified technicians delivers reliable installation, maintenance, and repair for residential and commercial spaces.</p>
                </div>
              </section>
              <section className={cn("panel panel-3")} ref={el => { panelsRef.current[2] = el; lastPanelRef.current = el; }}>
                <div className="panel-content" ref={el => { panelContentsRef.current[2] = el; }}>
                  <h2 className="panel-title">EXPERIENCE COOLING AT ITS PEAK</h2>
                  <p className="panel-subtitle">Premium HVAC Solutions for Every Space – Powered by Alpine Tech.</p>
                   <Link href="#contact">
                    <button className="cta-button">Request a Consultation</button>
                   </Link>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div id="scroll-indicator" ref={scrollIndicatorRef}>
          <span>Scroll to explore</span>
          <div className="mouse-icon"><div className="mouse-wheel"></div></div>
        </div>
      </div>
    </>
  );
}
