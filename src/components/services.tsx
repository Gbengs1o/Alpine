"use client";

// --- COMBINED IMPORTS ---
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// --- CUSTOM ELEMENT TYPE DEFINITION ---
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        speed?: string;
        autoplay?: boolean;
        loop?: boolean;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

// --- DATA FOR SERVICES ---
const servicesData = [
  { id: 'service-1', title: 'Equipment Sourcing', description: "Official partners with GREE, we supply top-tier HVAC systems at competitive prices.", lottieSrc: "https://lottie.host/853538fb-6abe-48b6-9ff6-2ef0bea08c22/Nq1FdjK1vp.lottie" },
  { id: 'service-2', title: 'Professional Installation', description: "Flawless execution for residential, commercial, and industrial projects, ensuring peak performance.", lottieSrc: "https://lottie.host/ec1fb587-bc15-4a0a-8eef-a5d1505da1e7/VRXlLcwxdX.lottie" },
  { id: 'service-3', title: 'Maintenance & Repairs', description: "Flexible plans and expert repairs to keep your systems running smoothly and efficiently.", lottieSrc: "https://lottie.host/e3016043-5898-4174-837f-8713834637d4/iE0Szpx2sl.lottie" }
];

export function Services() {
    const panelsRef = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            target.style.setProperty('--mouse-x', `${x}px`);
            target.style.setProperty('--mouse-y', `${y}px`);
        };

        const currentPanels = panelsRef.current.filter(p => p !== null) as HTMLElement[];
        currentPanels.forEach(panel => {
            panel.addEventListener('mousemove', handleMouseMove);
        });

        return () => {
            currentPanels.forEach(panel => {
                panel.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, []);

    return (
        <>
            <style jsx>{`
              .services-section {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                  background-color: #111827; 
                  color: #f8f9fa; 
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  padding: 5rem 1rem;
                  box-sizing: border-box;
                  overflow: hidden;
              }
              .main-container { width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center; }
              .services-badge {
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 700;
                  letter-spacing: 1px;
                  background-color: rgba(255, 255, 255, 0.1);
                  color: #e9ecef;
                  padding: 6px 12px;
                  border-radius: 9999px;
                  margin-bottom: 24px;
                  border: 1px solid rgba(255, 255, 255, 0.2);
              }
              .main-title { 
                  font-size: clamp(2.5rem, 5vw, 3.5rem); 
                  font-weight: 700; 
                  color: #ffffff; 
                  text-align: center; 
                  line-height: 1.1; 
                  margin: 0 0 24px 0; 
              }
              .subtitle { 
                  font-size: 18px; 
                  color: #adb5bd; 
                  text-align: center; 
                  max-width: 700px; 
                  line-height: 1.6; 
                  margin-bottom: 64px; 
              }
              .panels-container { display: flex; flex-wrap: wrap; justify-content: center; width: 100%; gap: 24px; margin-bottom: 64px; }
              
              .service-panel {
                flex: 1 1 300px; 
                max-width: 360px;
                height: 420px;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                transition: transform 0.4s ease, box-shadow 0.4s ease;
                cursor: pointer;
              }

              .service-panel::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1px;
                background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                z-index: 1;
              }

              .panel-inner {
                background: rgba(255, 255, 255, 0.05);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                height: 100%;
                width: 100%;
                border-radius: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 24px;
                box-sizing: border-box;
                position: relative;
                z-index: 2;
              }

              .panel-inner::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background: radial-gradient(
                  350px circle at var(--mouse-x, -200px) var(--mouse-y, -200px), 
                  #5d99f744,
                  transparent 80%
                );
                opacity: 0;
                transition: opacity 0.5s ease;
                z-index: 3;
              }

              .service-panel:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
              }
              
              .service-panel:hover .panel-inner::after {
                opacity: 1;
              }

              .panel-content, .panel-header {
                position: absolute;
                inset: 24px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: opacity 0.4s ease, transform 0.4s ease;
                z-index: 4;
              }

              .panel-header {
                font-size: 24px;
                font-weight: 700;
                color: #ffffff;
              }
              
              .panel-content {
                opacity: 0;
                transform: scale(0.95);
              }

              .service-panel:hover .panel-header {
                opacity: 0;
                transform: scale(0.95);
              }

              .service-panel:hover .panel-content {
                opacity: 1;
                transform: scale(1);
              }

              .panel-content :global(dotlottie-wc) {
                  width: 180px;
                  height: 180px;
                  margin-bottom: 16px;
              }
              .panel-content p { font-size: 15px; line-height: 1.6; margin: 0; color: #e9ecef; }

              .cta-button {
                  display: inline-block;
                  background-color: #5d99f7;
                  color: #ffffff;
                  font-size: 1rem;
                  font-weight: 600;
                  padding: 12px 24px;
                  border-radius: 6px;
                  text-decoration: none;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 15px #5d99f733;
              }
              .cta-button:hover {
                  background-color: #ffffff;
                  color: #5d99f7;
                  transform: translateY(-3px) scale(1.05);
                  box-shadow: 0 8px 25px #5d99f755;
              }
              
              @media (prefers-reduced-motion: reduce) {
                .service-panel, .panel-inner::after, .panel-content, .panel-header, .cta-button { 
                  transition: none !important; 
                  animation: none !important; 
                }
              }
            `}</style>
            
            <section id="services" className="services-section">
                <main className="main-container">
                    <div className="services-badge">OUR SERVICES</div>
                    <h2 className="main-title" id="services-section-title">Complete HVAC Solutions</h2>
                    <p className="subtitle">
                      From sourcing the best equipment to expert installation and reliable maintenance, we are your trusted partner for total comfort.
                    </p>
                    <section
                        className="panels-container"
                        aria-labelledby="services-section-title"
                    >
                    {servicesData.map((service, index) => (
                        <article 
                            key={service.id} 
                            className="service-panel" 
                            id={service.id}
                            // THIS IS THE CORRECTED LINE
                            ref={(el) => { panelsRef.current[index] = el; }}
                        >
                            <div className="panel-inner">
                                <h3 className="panel-header">{service.title}</h3>
                                <div className="panel-content">
                                    <dotlottie-wc 
                                      src={service.lottieSrc}
                                      speed="1" 
                                      autoplay 
                                      loop>
                                    </dotlottie-wc>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                    </section>
                    <div className="button-container">
                        <Link href="/services" className="cta-button">View All Services</Link>
                    </div>
                </main>
            </section>
        </>
    );
}