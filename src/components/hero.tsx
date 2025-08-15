"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '900']
});

const useTypewriter = (words: string[], typeSpeed = 150, deleteSpeed = 100, delay = 3000, soundSrc: string | null = null, isTypingEnabled: boolean = true) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (soundSrc) {
            const audio = new Audio(soundSrc);
            audio.loop = true;
            audioRef.current = audio;
        } else {
            audioRef.current?.pause();
            audioRef.current = null;
        }

        const handleInteraction = () => {
            if (audioRef.current?.paused && isTypingEnabled && !isDeleting && words.length > 0 && text.length < words[wordIndex]?.length) {
                audioRef.current.play().catch(e => console.warn("Typing audio playback failed on interaction:", e));
            }
        };

        const interactionEvents = ['scroll', 'click', 'keydown'];
        interactionEvents.forEach(event => window.addEventListener(event, handleInteraction, { once: true }));

        return () => {
            audioRef.current?.pause();
            interactionEvents.forEach(event => window.removeEventListener(event, handleInteraction));
        };
    }, [soundSrc]);

    useEffect(() => {
        if (!isTypingEnabled) {
            audioRef.current?.pause();
        }
    }, [isTypingEnabled]);

    useEffect(() => {
        if (words.length === 0 || !isTypingEnabled) {
            audioRef.current?.pause();
            return;
        }
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                audioRef.current?.pause();
                if (text.length > 0) setText((prev) => prev.slice(0, -1));
                else {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                if (text.length < currentWord.length) {
                    if (audioRef.current?.paused) {
                        audioRef.current.play().catch(error => {
                            if (error.name !== 'NotAllowedError') {
                                console.warn("Typing audio playback failed:", error);
                            }
                        });
                    }
                    setText((prev) => currentWord.slice(0, prev.length + 1));
                } else {
                    audioRef.current?.pause();
                    setTimeout(() => setIsDeleting(true), delay);
                }
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay, isTypingEnabled]);

    return text;
};


export function Hero() {
  const [experienceState, setExperienceState] = useState<'animating' | 'static'>('animating');
  const [isClient, setIsClient] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [typingPermanentlyDisabled, setTypingPermanentlyDisabled] = useState(false);

  const typewriterText = useTypewriter(
    experienceState === 'animating' ? ['Anywhere', 'Anytime'] : [],
    150,
    100,
    3000,
    experienceState === 'animating' ? '/media/typing.mp3' : null,
    !typingPermanentlyDisabled && activePanelIndex === 0 && experienceState === 'animating'
  );
  
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroViewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const panelContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPanelRef = useRef<HTMLElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const slideAudioRef = useRef<HTMLAudioElement | null>(null);
  const windAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedWindSoundRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenAnimation = sessionStorage.getItem('hasSeenHeroAnimation') === 'true';
    if (hasSeenAnimation) {
      setExperienceState('static');
    }
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    if (!slideAudioRef.current) {
        slideAudioRef.current = new Audio('/media/slide.mp3');
    }
    if (!windAudioRef.current) {
        windAudioRef.current = new Audio('/media/wind.mp3');
    }

    if (experienceState === 'static') {
      if (videoRef.current) videoRef.current.classList.add('is-blurred');
      return;
    }

    const pinContainer = pinContainerRef.current;
    const heroViewport = heroViewportRef.current;
    const track = trackRef.current;
    const video = videoRef.current;
    const panels = panelsRef.current.filter((p): p is HTMLElement => p !== null);
    const panelContents = panelContentsRef.current.filter((p): p is HTMLDivElement => p !== null);
    const lastPanel = lastPanelRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!pinContainer || !heroViewport || !track || !video || !lastPanel || !scrollIndicator || panels.length === 0 || panelContents.length === 0) {
      return;
    }
    
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && sessionStorage.getItem('hasSeenHeroAnimation') === 'true') setExperienceState('static');
    }, { threshold: 0.1 });
    observer.observe(pinContainer);

    const numPanels = panels.length;
    const exitTimings = { revealDuration: 0.20, zoomDuration: 0.60, fadeDuration: 0.20 };
    const revealEnd = exitTimings.revealDuration;
    const zoomEnd = revealEnd + exitTimings.zoomDuration;
    const fadeEnd = zoomEnd + exitTimings.fadeDuration;

    const animateHero = () => {
        const scrollTop = window.scrollY;
        const totalPinDuration = pinContainer.offsetHeight - window.innerHeight;
        const horizontalPhaseEnd = (window.innerWidth / 100) * 300; 

        // --- CHANGE: Stop wind sound when hero animation is fully scrolled past ---
        if (scrollTop > totalPinDuration && windAudioRef.current && !windAudioRef.current.paused) {
          windAudioRef.current.pause();
        }

        if (scrollTop > horizontalPhaseEnd) video.classList.remove('is-blurred');
        else video.classList.add('is-blurred');

        scrollIndicator.style.opacity = scrollTop > 50 ? '0' : '1';
        
        const firstPanelContent = panelContents[0];
        if (firstPanelContent) firstPanelContent.classList.toggle('is-visible', scrollTop > 1);
        
        if (scrollTop <= horizontalPhaseEnd) {
            const progress = scrollTop / horizontalPhaseEnd;
            track.style.transform = `translateX(-${progress * (track.offsetWidth - window.innerWidth)}px)`;
            const currentPanelIndex = Math.min(numPanels - 1, Math.floor(progress * numPanels));

            if (currentPanelIndex !== activePanelIndex) {
              setActivePanelIndex(currentPanelIndex);
              if (scrollTop > 1 && slideAudioRef.current) {
                  slideAudioRef.current.currentTime = 0;
                  slideAudioRef.current.play().catch(e => console.warn("Slide audio playback failed:", e));
                  setTypingPermanentlyDisabled(true);
              }
            }
            
            panelContents.forEach((content, index) => {
                if (index === 0 && scrollTop > 1) return;
                content.classList.toggle('is-visible', index === currentPanelIndex);
            });
            heroViewport.style.opacity = '1';
            lastPanel.style.opacity = '1';
            video.style.transform = 'scale(1)';
            lastPanel.classList.remove('panel-no-blur');

        } else {
            if (activePanelIndex !== numPanels - 1) setActivePanelIndex(numPanels - 1);

            track.style.transform = `translateX(-${track.offsetWidth - window.innerWidth}px)`;
            panelContents.forEach((content, index) => content.classList.toggle('is-visible', index === numPanels - 1));
            lastPanel.classList.add('panel-no-blur');
            const exitSequenceDuration = totalPinDuration - horizontalPhaseEnd;
            if (exitSequenceDuration <= 0) return;
            const exitProgress = (scrollTop - horizontalPhaseEnd) / exitSequenceDuration;

            lastPanel.style.opacity = (exitProgress <= revealEnd) ? `${1 - (exitProgress / revealEnd)}` : '0';

            if (exitProgress > revealEnd && !hasPlayedWindSoundRef.current) {
                if(windAudioRef.current) {
                    windAudioRef.current.play().catch(e => console.warn("Wind audio playback failed:", e));
                }
                hasPlayedWindSoundRef.current = true;
            }

            if (exitProgress > revealEnd && exitProgress <= zoomEnd) {
                const zoomProgress = (exitProgress - revealEnd) / (zoomEnd - revealEnd);
                video.style.transform = `scale(${1 + zoomProgress * 0.5})`;
            } else if (exitProgress > zoomEnd) {
                video.style.transform = 'scale(1.5)';
            } else {
                video.style.transform = 'scale(1)';
            }

            if (exitProgress > zoomEnd && exitProgress <= fadeEnd) {
                heroViewport.style.opacity = `${1 - ((exitProgress - zoomEnd) / (fadeEnd - zoomEnd))}`;
            } else if (exitProgress > fadeEnd) {
                heroViewport.style.opacity = '0';
                sessionStorage.setItem('hasSeenHeroAnimation', 'true');
            } else {
                heroViewport.style.opacity = '1';
            }
        }
    };
    
    let isTicking = false;
    const onScroll = () => { if (!isTicking) { window.requestAnimationFrame(() => { animateHero(); isTicking = false; }); isTicking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    
    animateHero();

    return () => {
        window.removeEventListener('scroll', onScroll);
        observer.unobserve(pinContainer);
    };
  }, [isClient, experienceState, activePanelIndex]);

  useEffect(() => {
    if (experienceState === 'static') {
      heroViewportRef.current?.style.setProperty('opacity', '');
      videoRef.current?.style.setProperty('transform', '');
    }
  }, [experienceState]);

  if (!isClient) {
    return null; 
  }

  return (
    <>
      <style jsx>{`
        :root { --background-color: #ffffff; --panel-bg-color: rgba(10, 20, 35, 0.25); }
        .hero-section-wrapper { background-color: var(--background-color); }
        #pin-container.animating { height: calc(300vw + 250vh); }
        #pin-container.static { height: 100vh; }
        #hero-viewport { height: 100vh; width: 100%; position: sticky; top: 0; overflow: hidden; will-change: opacity; }
        #hero-video-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; filter: blur(0px); transition: filter 0.5s ease-out; will-change: transform, filter; }
        #hero-video-background.is-blurred { filter: blur(12px); }
        #hero-video-background iframe { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 177.77vh; min-width: 100vw; height: 56.25vw; min-height: 100vh; pointer-events: none; }
        #horizontal-track { display: flex; height: 100%; width: 300%; will-change: transform; }
        .panel { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4vw; box-sizing: border-box; position: relative; background-color: var(--panel-bg-color); backdrop-filter: blur(20px) brightness(90%); -webkit-backdrop-filter: blur(20px) brightness(90%); border-left: 1px solid rgba(255, 255, 255, 0.05); will-change: opacity; transition: backdrop-filter 0.5s ease-out; }
        .panel.panel-no-blur { backdrop-filter: none; -webkit-backdrop-filter: none; }
        .panel-content { z-index: 1; max-width: 800px; text-align: center; opacity: 0; transform: translateY(30px); transition: opacity 0.5s ease-out, transform 0.8s ease-out 0.3s; will-change: opacity, transform; }
        .panel-content.is-visible { opacity: 1; transform: translateY(0); }
        .panel-title { color: #ffffff; font-size: clamp(3rem, 7vw, 6rem); font-weight: 900; text-transform: uppercase; line-height: 1.1; margin: 0 0 1rem; text-shadow: 0 4px 25px rgba(0,0,0,0.6); }
        .panel-subtitle { color: #ffffff; font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 400; line-height: 1.6; margin: 0 0 2rem; max-width: 600px; margin-left: auto; margin-right: auto; text-shadow: 0 2px 10px rgba(0,0,0,0.7); }
        #hero-viewport.is-static .panel { background-color: var(--panel-bg-color); backdrop-filter: blur(20px) brightness(90%); -webkit-backdrop-filter: blur(20px) brightness(90%); }
        #hero-viewport.is-static:hover #hero-video-background { filter: blur(0px); }
        #hero-viewport.is-static:hover .panel-content { opacity: 0.6; }
        .cta-button { position: relative; overflow: hidden; padding: 16px 40px; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px; color: #f0f8ff; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4); cursor: pointer; border-radius: 14px; border: none; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.2); transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .cta-button:hover { background-color: rgba(255, 255, 255, 0.15); box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.4), 0 8px 32px 0 rgba(0, 0, 0, 0.2); transform: translateY(-2px); }
        #scroll-indicator { display: none; }
        #scroll-indicator.is-visible { display: block; position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 100; transition: opacity 0.5s ease; text-align: center; color: rgba(255,255,255,0.7); }
        #scroll-indicator span { display: block; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
        .mouse-icon { width: 24px; height: 40px; border: 2px solid rgba(255,255,255,0.7); border-radius: 12px; position: relative; margin: 0 auto; }
        .mouse-wheel { width: 4px; height: 8px; background: rgba(255,255,255,0.7); border-radius: 2px; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); animation: scroll-wheel 2s infinite; }
        @keyframes scroll-wheel { 0% { top: 8px; opacity: 1; } 50% { top: 20px; opacity: 0; } 100% { top: 8px; opacity: 1; } }
        .typewriter-text-cursor::after { content: '|'; animation: blink-caret 1s step-end infinite; color: #ffffff; }
        @keyframes blink-caret { from, to { color: transparent } 50% { color: inherit; } }
      `}</style>
      <div className={`${inter.className} hero-section-wrapper`}>
        <div 
          id="pin-container" 
          ref={pinContainerRef}
          className={experienceState}
        >
          <div 
            id="hero-viewport" 
            ref={heroViewportRef} 
            className={experienceState === 'static' ? 'is-static' : ''}
          >
            <div id="hero-video-background" ref={videoRef}>
              <iframe src="https://www.youtube.com/embed/duR0xxmt9uk?autoplay=1&mute=1&loop=1&playlist=duR0xxmt9uk&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
            </div>
            {experienceState === 'animating' ? (
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
                    <Link href="/services" scroll={false}><button className="cta-button">View Our Services</button></Link>
                  </div>
                </section>
              </div>
            ) : (
              <section className="panel panel-3">
                <div className="panel-content is-visible">
                  <h2 className="panel-title">EXPERIENCE COOLING AT ITS PEAK</h2>
                  <p className="panel-subtitle">Premium HVAC Solutions for Every Space – Powered by Alpine Tech.</p>
                  <Link href="/services" scroll={false}><button className="cta-button">View Our Services</button></Link>
                </div>
              </section>
            )}
          </div>
        </div>
        <div id="scroll-indicator" ref={scrollIndicatorRef} className={experienceState === 'animating' ? 'is-visible' : ''}>
          <span>Scroll to explore</span>
          <div className="mouse-icon"><div className="mouse-wheel"></div></div>
        </div>
      </div>
    </>
  );
}