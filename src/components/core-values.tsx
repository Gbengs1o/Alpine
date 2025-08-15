"use client";

// --- COMBINED IMPORTS ---
import { useEffect, useRef, useState } from 'react';

// Updated helper for class names that handles conditional objects
const cn = (...classes: (string | boolean | undefined | Record<string, boolean>)[]) => {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
};

// --- DATA FOR CORE VALUES ---
const coreValuesData = [
  { id: 'panel-1', title: 'Reliability', headline: 'Always There For You', description: "You can depend on us to provide a lasting solution, even when it's tough. We focus on building long-term relationships.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L4 5v6c0 5.55 3.58 10.42 8 12 4.42-1.58 8-6.45 8-12V5l-8-3z"></path></svg> },
  { id: 'panel-2', title: 'Professionalism', headline: 'Excellence in Every Detail', description: "From our appearance to our workmanship, we hold ourselves to the highest standards to ensure our work always stands out.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
  { id: 'panel-3', title: 'Courtesy', headline: 'Respect for Your Space', description: "We work in your private home or office with the utmost respect for your privacy, convenience, and comfort.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
  { id: 'panel-4', title: 'Integrity', headline: 'Honest & Transparent', description: "We will not take advantage of our clients. Our services and products will always match our promises, guaranteed.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline></svg> }
];


export default function CoreValues() {
    const stepsContainerRef = useRef<HTMLElement | null>(null);
    const [isIntroFinished, setIntroFinished] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const hoverAudioRef = useRef<HTMLAudioElement | null>(null); // Ref for the hover sound

    // Effect to initialize the hover sound audio object once
    useEffect(() => {
        hoverAudioRef.current = new Audio('/media/mouse1.mp3');
    }, []);

    // This effect handles the intro animation logic
    useEffect(() => {
        const stepsContainer = stepsContainerRef.current;
        if (!stepsContainer) return;

        const panelSwitchInterval = 3000;
        const totalPanels = coreValuesData.length;
        const animationTotalDuration = panelSwitchInterval * totalPanels;

        const switchToHover = () => {
            if (stepsContainer) {
                stepsContainer.classList.remove("intro-animation");
                stepsContainer.classList.add("intro-finished");
            }
            setIntroFinished(true);
        };

        let introInterval: NodeJS.Timeout;
        if (!isIntroFinished) {
            introInterval = setInterval(() => {
                setActiveIndex(prevIndex => (prevIndex + 1) % totalPanels);
            }, panelSwitchInterval);
        }

        const introTimeout = setTimeout(switchToHover, animationTotalDuration);
        
        const handleMouseEnter = () => {
            clearTimeout(introTimeout);
            if(introInterval) clearInterval(introInterval);
            switchToHover();
        };

        stepsContainer.addEventListener("mouseenter", handleMouseEnter, { once: true });

        return () => {
            if(introInterval) clearInterval(introInterval);
            clearTimeout(introTimeout);
            if (stepsContainer) {
                stepsContainer.removeEventListener("mouseenter", handleMouseEnter);
            }
        };
    }, [isIntroFinished]);

    // Function to play the sound on hover
    const handlePanelHover = () => {
        if (hoverAudioRef.current) {
            hoverAudioRef.current.currentTime = 0;
            hoverAudioRef.current.play().catch(error => console.warn("Hover sound playback failed:", error));
        }
    };


    return (
        <>
            <style jsx>{`
              .core-values-section {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                  background-color: #f8f9fa;
                  color: #212529;
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  width: 100%;
                  padding: 4rem 1rem;
                  box-sizing: border-box;
              }
              .main-container { width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center; }
              .how-it-works-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #212529; font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px; align-self: flex-start; }
              .how-it-works-link .dot { width: 8px; height: 8px; background-color: #5d99f7; border-radius: 50%; }
              .main-title { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; color: #212529; text-align: center; line-height: 1.1; margin: 0 0 24px 0; }
              .subtitle { font-size: 18px; color: #6c757d; text-align: center; max-width: 600px; line-height: 1.6; margin-bottom: 48px; }
              .steps-container { display: flex; flex-wrap: wrap; width: 100%; gap: 16px; }
              .step-panel { flex: 1; min-width: 220px; height: 420px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #e9ecef; background-color: white; transition: all 0.4s ease; position: relative; overflow: hidden; box-sizing: border-box; }
              .panel-header { display: flex; align-items: center; gap: 8px; font-size: 13px; text-transform: uppercase; font-weight: 600; z-index: 2; transition: color 0.4s ease; color: #212529; }
              .panel-content { text-align: left; opacity: 0; transform: translateY(10px); transition: opacity 0.4s ease, transform 0.4s ease; z-index: 2; position: absolute; bottom: 90px; left: 24px; right: 24px; }
              .panel-content h3 { font-size: 22px; margin: 0 0 10px 0; font-weight: 700; color: #212529; transition: color 0.4s ease; }
              .panel-content p { font-size: 15px; line-height: 1.5; margin: 0; color: #6c757d; transition: color 0.4s ease; }
              .panel-icon-container { height: 50px; display: flex; align-items: flex-end; justify-content: flex-start; z-index: 2; }
              .panel-icon-container :global(svg) { width: 48px; height: 48px; stroke: #6c757d; transition: stroke 0.4s ease; }
              
              .intro-animation .step-panel.active { background-color: #5d99f7; border-color: #5d99f7; }
              .intro-animation .step-panel.active .panel-header, .intro-animation .step-panel.active .panel-content h3, .intro-animation .step-panel.active .panel-content p { color: white; }
              .intro-animation .step-panel.active .panel-content { opacity: 1; transform: translateY(0); }
              .intro-animation .step-panel.active .panel-icon-container :global(svg) { stroke: white; }

              .intro-finished .step-panel:hover { background-color: #5d99f7; border-color: #5d99f7; flex-grow: 4; }
              .intro-finished .step-panel:hover .panel-header, .intro-finished .step-panel:hover .panel-content h3, .intro-finished .step-panel:hover .panel-content p { color: white; }
              .intro-finished .step-panel:hover .panel-content { opacity: 1; transform: translateY(0); }
              .intro-finished .step-panel:hover .panel-icon-container :global(svg) { stroke: white; }

              @media (prefers-reduced-motion: reduce) {
                .step-panel, .panel-content, .panel-header, .panel-icon-container :global(svg), .panel-content h3, .panel-content p { transition: none !important; animation: none !important; }
                .step-panel:first-child { background-color: #5d99f7; border-color: #5d99f7; }
                .step-panel:first-child .panel-header, .step-panel:first-child .panel-content h3, .step-panel:first-child .panel-content p { color: white; }
                .step-panel:first-child .panel-content { opacity: 1; transform: translateY(0); }
                .step-panel:first-child .panel-icon-container :global(svg) { stroke: white; }
              }
            `}</style>
            
            <section className="core-values-section">
                <main className="main-container">
                    <a href="#core-values" className="how-it-works-link">
                        <span className="dot"></span>
                        OUR PROMISE
                    </a>
                    <h1 className="main-title" id="values-section-title">The Principles<br/>That Guide Us</h1>
                    <p className="subtitle">More than just a service, we're a commitment. These four pillars define every interaction and ensure your complete satisfaction and comfort.</p>
                    <section
                        ref={stepsContainerRef}
                        className={cn('steps-container', { 'intro-animation': !isIntroFinished, 'intro-finished': isIntroFinished })}
                        id="steps-section"
                        aria-labelledby="values-section-title"
                    >
                    {coreValuesData.map((value, index) => (
                        <article 
                            key={value.id} 
                            className={cn('step-panel', { 'active': !isIntroFinished && index === activeIndex })} 
                            id={value.id}
                            onMouseEnter={handlePanelHover} // Play sound on mouse enter
                        >
                            <div className="panel-header"><span className="step-title">{value.title}</span></div>
                            <div className="panel-content">
                                <h3>{value.headline}</h3>
                                <p>{value.description}</p>
                            </div>
                            <div className="panel-icon-container">{value.icon}</div>
                        </article>
                    ))}
                    </section>
                </main>
            </section>
        </>
    );
}