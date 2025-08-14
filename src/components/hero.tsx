"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

// Best practice for fonts in Next.js
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '900']
});

// Custom hook for the typewriter effect
const useTypewriter = (words: string[], typeSpeed = 150, deleteSpeed = 100, delay = 3000) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                if (text.length > 0) setText((prev) => prev.slice(0, -1));
                else {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                if (text.length < currentWord.length) setText((prev) => currentWord.slice(0, prev.length + 1));
                else setTimeout(() => setIsDeleting(true), delay);
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

    return text;
};


export function Hero() {
  // --- MODIFICATION START ---
  // State to track if it's the user's first time through the animation in this session.
  const [isInitialExperience, setIsInitialExperience] = useState(true);
  // State to ensure we're on the client before checking sessionStorage, preventing hydration errors.
  const [isClient, setIsClient] = useState(false);
  // --- MODIFICATION END ---
  
  const typewriterText = useTypewriter(['Anywhere', 'Anytime'], 150, 100, 3000);
  
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroViewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const panelContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPanelRef = useRef<HTMLElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // --- MODIFICATION START ---
  // On component mount, check if the user has already seen the animation.
  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('hasSeenHeroAnimation') === 'true') {
      setIsInitialExperience(false);
    }
  }, []);
  // --- MODIFICATION END ---

  useEffect(() => {
    // --- MODIFICATION START ---
    // Only run the animation setup if it's the initial experience and we're on the client.
    if (!isInitialExperience || !isClient) {
      if (videoRef.current) {
        // Ensure video is not blurred in the static version.
        videoRef.current.classList.remove('is-blurred');
      }
      return;
    }
    // --- MODIFICATION END ---
    
    if (typeof window === 'undefined') return;
    
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.panelContents.forEach(content => content.classList.add('is-visible'));
      return;
    }

    const numPanels = elements.panels.length;
    
    const exitTimings = {
        revealDuration: 0.20,
        zoomDuration:   0.60,
        fadeDuration:   0.20,
    };

    const revealEnd = exitTimings.revealDuration;
    const zoomEnd = exitTimings.revealDuration + exitTimings.zoomDuration;
    const fadeEnd = zoomEnd + exitTimings.fadeDuration;

    const animateHero = () => {
        if(!elements.pinContainer || !elements.heroViewport || !elements.track || !elements.video || !elements.lastPanel || !elements.scrollIndicator) return;

        const scrollTop = window.scrollY;
        
        const totalPinDuration = elements.pinContainer.offsetHeight - window.innerHeight;
        const horizontalPhaseEnd = (window.innerWidth / 100) * 300; 

        if (scrollTop > horizontalPhaseEnd) {
            elements.video.classList.remove('is-blurred');
        } else {
            elements.video.classList.add('is-blurred');
        }

        if (scrollTop > 50) { 
            elements.scrollIndicator.style.opacity = '0'; 
        } else { 
            elements.scrollIndicator.style.opacity = '1'; 
        }
        
        const firstPanelContent = elements.panelContents[0];
        if (scrollTop > 1) {
            if(firstPanelContent) firstPanelContent.classList.add('is-visible');
        } else {
            if(firstPanelContent) firstPanelContent.classList.remove('is-visible');
        }
        
        if (scrollTop <= horizontalPhaseEnd) {
            const progress = scrollTop / horizontalPhaseEnd;
            elements.track.style.transform = `translateX(-${progress * (elements.track.offsetWidth - window.innerWidth)}px)`;
            const currentPanelIndex = Math.min(numPanels - 1, Math.floor(progress * numPanels));
            elements.panelContents.forEach((content, index) => {
                if(index === 0 && scrollTop > 1) return;
                content.classList.toggle('is-visible', index === currentPanelIndex);
            });
            elements.heroViewport.style.opacity = '1';
            elements.lastPanel.style.opacity = '1';
            elements.video.style.transform = 'scale(1)';
            elements.lastPanel.classList.remove('panel-no-blur');

        } else {
            elements.track.style.transform = `translateX(-${elements.track.offsetWidth - window.innerWidth}px)`;
            elements.panelContents.forEach((content, index) => {
                content.classList.toggle('is-visible', index === numPanels - 1);
            });
            elements.lastPanel.classList.add('panel-no-blur');
            const exitSequenceDuration = totalPinDuration - horizontalPhaseEnd;
            if (exitSequenceDuration <= 0) return;
            const exitProgress = (scrollTop - horizontalPhaseEnd) / exitSequenceDuration;
            if (exitProgress <= revealEnd) elements.lastPanel.style.opacity = `${1 - (exitProgress / revealEnd)}`;
            else elements.lastPanel.style.opacity = '0';

            if (exitProgress > revealEnd && exitProgress <= zoomEnd) {
                const zoomProgress = (exitProgress - revealEnd) / (zoomEnd - revealEnd);
                elements.video.style.transform = `scale(${1 + zoomProgress * 0.5})`;
            } else if (exitProgress > zoomEnd) elements.video.style.transform = 'scale(1.5)';
            else elements.video.style.transform = 'scale(1)';

            if (exitProgress > zoomEnd && exitProgress <= fadeEnd) elements.heroViewport.style.opacity = `${1 - ((exitProgress - zoomEnd) / (fadeEnd - zoomEnd))}`;
            else if (exitProgress > fadeEnd) elements.heroViewport.style.opacity = '0';
            else elements.heroViewport.style.opacity = '1';
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
    
    // --- MODIFICATION START ---
    // A listener to detect when the user has scrolled past the animation.
    const checkCompletion = () => {
        if (pinContainerRef.current && window.scrollY > pinContainerRef.current.offsetHeight) {
            sessionStorage.setItem('hasSeenHeroAnimation', 'true');
            window.removeEventListener('scroll', checkCompletion); // Clean up self.
        }
    };
    window.addEventListener('scroll', checkCompletion, { passive: true });
    // --- MODIFICATION END ---

    animateHero();

    return () => {
        window.removeEventListener('scroll', onScroll);
        // --- MODIFICATION START ---
        // Clean up the completion listener as well.
        window.removeEventListener('scroll', checkCompletion);
        // --- MODIFICATION END ---
    };
  }, [isInitialExperience, isClient]); // Rerun this effect if these states change.

  // --- MODIFICATION START ---
  // Don't render anything until client-side check is complete to avoid flash of incorrect content.
  if (!isClient) {
    return null; 
  }
  // --- MODIFICATION END ---

  return (
    <>
      <style jsx>{`
        :root {
            --background-color: #ffffff;
            --highlight-color: #63a4ff;
            --panel-bg-color: rgba(10, 20, 35, 0.25); 
        }
        
        .hero-section-wrapper {
            background-color: var(--background-color);
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

        /* --- MODIFICATION START --- */
        /* New container for the static version of the hero */
        .static-hero-container {
            height: 100vh;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        /* In static mode, the last panel should have a bg to ensure readability */
        .static-hero-container .panel {
            background-color: var(--panel-bg-color);
            backdrop-filter: blur(20px) brightness(90%);
            -webkit-backdrop-filter: blur(20px) brightness(90%);
        }
        /* --- MODIFICATION END --- */


        #hero-video-background {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: -1;
            overflow: hidden;
            filter: blur(0px);
            transition: filter 0.8s ease-out;
            will-change: transform, filter;
        }
        
        #hero-video-background.is-blurred {
            filter: blur(12px);
        }

        #hero-video-background iframe {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 177.77vh; min-width: 100vw;
            height: 56.25vw; min-height: 100vh;
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
            transition: backdrop-filter 0.5s ease-out;
        }
        
        .panel:last-child {
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .panel-content {
            z-index: 1; max-width: 800px; text-align: center;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s;
            will-change: opacity;
        }

        .panel-content.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .panel-title { 
            color: #ffffff;
            font-size: clamp(3rem, 7vw, 6rem); 
            font-weight: 900; 
            text-transform: uppercase; 
            line-height: 1.1; 
            margin: 0 0 1rem; 
            text-shadow: 0 4px 25px rgba(0,0,0,0.6); 
        }
        .panel-subtitle { 
            color: #ffffff;
            font-size: clamp(1.1rem, 2vw, 1.4rem); 
            font-weight: 400; 
            line-height: 1.6; 
            margin: 0 0 2rem; 
            max-width: 600px; 
            margin-left: auto; 
            margin-right: auto; 
            text-shadow: 0 2px 10px rgba(0,0,0,0.7); 
        }
        
        .cta-button {
            position: relative; overflow: hidden;
            padding: 16px 40px; font-size: 1.1rem;
            font-weight: 600; letter-spacing: 0.5px;
            color: #f0f8ff; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
            cursor: pointer; border-radius: 14px;
            border: none; background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .cta-button::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1.5px); background-size: 4px 4px; opacity: 0.8; pointer-events: none; }
        .cta-button::before { content: ''; position: absolute; top: 0; left: -150%; width: 75%; height: 100%; background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100% ); transform: skewX(-25deg); transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
        .cta-button:hover { background-color: rgba(255, 255, 255, 0.15); box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.4), 0 8px 32px 0 rgba(0, 0, 0, 0.2); transform: translateY(-2px); }
        .cta-button:hover::before { left: 150%; }
        
        #scroll-indicator { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 100; transition: opacity 0.5s ease; text-align: center; color: rgba(255,255,255,0.7); }
        #scroll-indicator span { display: block; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
        .mouse-icon { width: 24px; height: 40px; border: 2px solid rgba(255,255,255,0.7); border-radius: 12px; position: relative; margin: 0 auto; }
        .mouse-wheel { width: 4px; height: 8px; background: rgba(255,255,255,0.7); border-radius: 2px; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); animation: scroll-wheel 2s infinite; }
        @keyframes scroll-wheel { 0% { top: 8px; opacity: 1; } 50% { top: 20px; opacity: 0; } 100% { top: 8px; opacity: 1; } }
        
        .typewriter-text-cursor::after { content: '|'; animation: blink-caret 1s step-end infinite; color: #ffffff; }
        @keyframes blink-caret { from, to { color: transparent } 50% { color: inherit; } }
      `}</style>
      <div className={`${inter.className} hero-section-wrapper`}>
        {/* --- MODIFICATION START --- */}
        {/* Render a different structure based on whether it's the initial experience */}
        {isInitialExperience ? (
          <div id="pin-container" ref={pinContainerRef}>
            <div id="hero-viewport" ref={heroViewportRef}>
              <div id="hero-video-background" ref={videoRef}>
                <iframe src="https://www.youtube.com/embed/gCRNEJxDJKM?autoplay=1&mute=1&loop=1&playlist=gCRNEJxDJKM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
              </div>
              <div id="horizontal-track" ref={trackRef}>
                <section className="panel panel-1" ref={el => { panelsRef.current[0] = el; }}>
                  <div className="panel-content" ref={el => { panelContentsRef.current[0] = el; }}>
                    <h1 className="panel-title">The Cool Alpine Experience—<span className="typewriter-text-cursor">{typewriterText}</span></h1>
                  </div>
                </section>
                <section className="panel panel-2" ref={el => { panelsRef.current[1] = el; }}>
                  <div className="panel-content" ref={el => { panelContentsRef.current[1] = el; }}>
                    <h2 className="panel-title">Experience You Can Trust</h2>
                    <p className="panel-subtitle">With over 13 years in the industry, our team of certified technicians delivers reliable installation, maintenance, and repair for residential and commercial spaces.</p>
                  </div>
                </section>
                <section className="panel panel-3" ref={el => { panelsRef.current[2] = el; lastPanelRef.current = el; }}>
                  <div className="panel-content" ref={el => { panelContentsRef.current[2] = el; }}>
                    <h2 className="panel-title">EXPERIENCE COOLING AT ITS PEAK</h2>
                    <p className="panel-subtitle">Premium HVAC Solutions for Every Space – Powered by Alpine Tech.</p>
                    <Link href="/consultation" scroll={false}><button className="cta-button">Request a Consultation</button></Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="static-hero-container">
            <div id="hero-video-background" ref={videoRef}>
              <iframe src="https://www.youtube.com/embed/gCRNEJxDJKM?autoplay=1&mute=1&loop=1&playlist=gCRNEJxDJKM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
            </div>
            <section className="panel panel-3">
              <div className="panel-content is-visible">
                <h2 className="panel-title">EXPERIENCE COOLING AT ITS PEAK</h2>
                <p className="panel-subtitle">Premium HVAC Solutions for Every Space – Powered by Alpine Tech.</p>
                <Link href="/consultation" scroll={false}><button className="cta-button">Request a Consultation</button></Link>
              </div>
            </section>
          </div>
        )}
        {isInitialExperience && (
            <div id="scroll-indicator" ref={scrollIndicatorRef}>
                <span>Scroll to explore</span>
                <div className="mouse-icon"><div className="mouse-wheel"></div></div>
            </div>
        )}
        {/* --- MODIFICATION END --- */}
      </div>
    </>
  );
}