"use client";

// --- IMPORTS ---
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CoreValues() {
  const stepsContainerRef = useRef<HTMLElement | null>(null);
  const [isIntroFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const stepsContainer = stepsContainerRef.current;
    if (!stepsContainer) return;

    const animationDuration = 12000;

    const switchToHover = () => {
      setIntroFinished(true);
    };

    const introTimeout = setTimeout(switchToHover, animationDuration);

    const handleMouseEnter = () => {
      clearTimeout(introTimeout);
      switchToHover();
    };
    
    stepsContainer.addEventListener("mouseenter", handleMouseEnter, { once: true });
    
    return () => {
      clearTimeout(introTimeout);
      stepsContainer.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);


  return (
    <>
      <style jsx global>{`
        :root {
            --brand-blue: #5d99f7;
            --light-bg: #f8f9fa;
            --dark-text: #212529;
            --light-text: #6c757d;
            --border-color: #e9ecef;
        }
      `}</style>
      <style jsx>{`
        .core-values-section {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--light-bg);
            color: var(--dark-text);
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 4rem 1rem;
            box-sizing: border-box;
            width: 100%;
        }
        .main-container {
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .how-it-works-link {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: var(--dark-text);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 24px;
            align-self: flex-start;
        }
        .how-it-works-link .dot {
            width: 8px;
            height: 8px;
            background-color: var(--brand-blue);
            border-radius: 50%;
        }
        .main-title {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            color: var(--dark-text);
            text-align: center;
            line-height: 1.1;
            margin: 0 0 24px 0;
        }
        .subtitle {
            font-size: 18px;
            color: var(--light-text);
            text-align: center;
            max-width: 600px;
            line-height: 1.6;
            margin-bottom: 48px;
        }
        .steps-container {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            gap: 16px;
        }
        .step-panel {
            flex: 1;
            min-width: 220px;
            height: 420px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid var(--border-color);
            background-color: white;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        .panel-header {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: 600;
            z-index: 2;
            transition: color 0.4s ease;
            color: var(--dark-text);
        }
        .panel-content {
            text-align: left;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.4s ease, transform 0.4s ease;
            z-index: 2;
            position: absolute;
            bottom: 90px;
            left: 24px;
            right: 24px;
        }
        .panel-content h3 {
            font-size: 22px;
            margin: 0 0 10px 0;
            font-weight: 700;
            color: var(--dark-text);
            transition: color 0.4s ease;
        }
        .panel-content p {
            font-size: 15px;
            line-height: 1.5;
            margin: 0;
            color: var(--light-text);
            transition: color 0.4s ease;
        }
        .panel-icon-container {
            height: 50px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            z-index: 2;
        }
        .panel-icon-container svg {
            width: 48px;
            height: 48px;
            stroke: var(--light-text);
            transition: stroke 0.4s ease;
        }
        
        .intro-animation #panel-1, .intro-animation #panel-1 > * { animation-delay: 0s; }
        .intro-animation #panel-2, .intro-animation #panel-2 > * { animation-delay: 3s; }
        .intro-animation #panel-3, .intro-animation #panel-3 > * { animation-delay: 6s; }
        .intro-animation #panel-4, .intro-animation #panel-4 > * { animation-delay: 9s; }
        
        .intro-finished .step-panel:hover { background-color: var(--brand-blue); border-color: var(--brand-blue); flex-grow: 4; }
        .intro-finished .step-panel:hover .panel-header,
        .intro-finished .step-panel:hover .panel-content h3,
        .intro-finished .step-panel:hover .panel-content p { color: white; }
        .intro-finished .step-panel:hover .panel-content { opacity: 1; transform: translateY(0); }
        .intro-finished .step-panel:hover .panel-icon-container svg { stroke: white; }

        @media (prefers-reduced-motion: reduce) {
          .step-panel, .panel-content, .panel-header, .panel-icon-container svg, .panel-content h3, .panel-content p {
            animation: none !important;
            transition: none !important;
          }
          #panel-1 { background-color: var(--brand-blue); border-color: var(--brand-blue); }
          #panel-1 .panel-header, #panel-1 .panel-content h3, #panel-1 .panel-content p { color: white; }
          #panel-1 .panel-content { opacity: 1; transform: translateY(0); }
          #panel-1 .panel-icon-container svg { stroke: white; }
        }

        @keyframes panel-intro-activation { 
            0%, 22% { background-color: var(--brand-blue); border-color: var(--brand-blue); } 
            25%, 100% { background-color: white; border-color: var(--border-color); } 
        }
        @keyframes content-intro-fade { 
            0%, 22% { opacity: 1; transform: translateY(0); } 
            25%, 100% { opacity: 0; transform: translateY(10px); } 
        }
        @keyframes color-intro-change {
            0%, 22% { color: white; }
            25%, 100% { color: inherit; }
        }
        @keyframes p-color-intro-change {
            0%, 22% { color: white; }
            25%, 100% { color: var(--light-text); }
        }
        @keyframes icon-intro-stroke { 
            0%, 22% { stroke: white; } 
            25%, 100% { stroke: var(--light-text); } 
        }
        
        .intro-animation .step-panel { animation: panel-intro-activation 12s 1; }
        .intro-animation .panel-content { animation: content-intro-fade 12s 1; }
        .intro-animation .panel-header, .intro-animation .panel-content h3 { animation: color-intro-change 12s 1; }
        .intro-animation .panel-content p { animation: p-color-intro-change 12s 1; }
        .intro-animation .panel-icon-container svg { animation: icon-intro-stroke 12s 1; }
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
                <article className="step-panel" id="panel-1">
                    <div className="panel-header"><span className="step-title">Reliability</span></div>
                    <div className="panel-content">
                        <h3>Always There For You</h3>
                        <p>You can depend on us to provide a lasting solution, even when it's tough. We focus on building long-term relationships.</p>
                    </div>
                    <div className="panel-icon-container"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L4 5v6c0 5.55 3.58 10.42 8 12 4.42-1.58 8-6.45 8-12V5l-8-3z"></path></svg></div>
                </article>
                <article className="step-panel" id="panel-2">
                    <div className="panel-header"><span className="step-title">Professionalism</span></div>
                    <div className="panel-content">
                        <h3>Excellence in Every Detail</h3>
                        <p>From our appearance to our workmanship, we hold ourselves to the highest standards to ensure our work always stands out.</p>
                    </div>
                    <div className="panel-icon-container"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
                </article>
                <article className="step-panel" id="panel-3">
                    <div className="panel-header"><span className="step-title">Courtesy</span></div>
                    <div className="panel-content">
                        <h3>Respect for Your Space</h3>
                        <p>We work in your private home or office with the utmost respect for your privacy, convenience, and comfort.</p>
                    </div>
                    <div className="panel-icon-container"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                </article>
                <article className="step-panel" id="panel-4">
                    <div className="panel-header"><span className="step-title">Integrity</span></div>
                    <div className="panel-content">
                        <h3>Honest & Transparent</h3>
                        <p>We will not take advantage of our clients. Our services and products will always match our promises, guaranteed.</p>
                    </div>
                    <div className="panel-icon-container"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline></svg></div>
                </article>
            </section>
        </main>
      </section>
    </>
  );
}
