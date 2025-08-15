"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HvacExplainedPage() {
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        .hvac-explained-section {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8f9fa;
            color: #212529;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            padding: 5rem 1rem;
            box-sizing: border-box;
        }
        .main-container {
            width: 100%;
            max-width: 1100px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .section-link {
            display: flex; align-items: center; gap: 8px; text-decoration: none; color: #212529;
            font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px;
        }
        .section-link .dot {
            width: 8px; height: 8px; background-color: #5d99f7; border-radius: 50%;
        }
        .main-title {
            font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; color: #212529;
            text-align: center; line-height: 1.1; margin: 0 0 24px 0;
        }
        .subtitle {
            font-size: 18px; color: #6c757d; text-align: center;
            max-width: 700px; line-height: 1.6; margin-bottom: 64px;
        }

        /* --- Grid for Explanations --- */
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            width: 100%;
            margin-bottom: 64px;
        }
        .info-card {
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }
        .card-icon :global(svg) {
            width: 40px; height: 40px; stroke: #5d9f77;
        }
        .info-card h3 {
            font-size: 22px; margin: 0 0 8px 0; font-weight: 700; color: #212529;
        }
        .info-card p {
            font-size: 15px; line-height: 1.7; margin: 0; color: #6c757d;
        }

        /* --- "Why Us" Conclusion Section --- */
        .conclusion-container {
            text-align: center;
            max-width: 750px;
            padding: 32px;
            border-top: 1px solid #e9ecef;
            margin-bottom: 48px;
        }
        .conclusion-container h2 {
            font-size: 28px; font-weight: 700; color: #212529; margin-bottom: 16px;
        }
        .conclusion-container p {
            font-size: 17px; color: #495057; line-height: 1.8; margin: 0;
        }
        
        /* --- Navigation Button Group --- */
        .button-group-container {
            display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;
        }
        .button {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 12px 24px; font-size: 14px; font-weight: 600;
            border-radius: 50px; cursor: pointer; text-decoration: none;
            transition: all 0.3s ease; border: 1px solid transparent;
        }
        .button:hover {
            transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .primary-button {
            background-color: #5d99f7; color: white; border-color: #5d99f7;
        }
        .secondary-button {
            background-color: #ffffff; color: #212529; border-color: #dee2e6;
        }
      `}</style>
      
      <section className="hvac-explained-section">
        <main className="main-container">
          <div className="section-link">
            <span className="dot"></span>
            UNDERSTANDING THE ESSENTIALS
          </div>
          <h1 className="main-title">What is an HVAC Service?</h1>
          <p className="subtitle">
            A clear guide to the systems that control your comfort and air quality, and why choosing the right professional service is critical for performance and safety.
          </p>

          <div className="info-grid">
            <article className="info-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              </div>
              <div>
                <h3>The System (HVAC)</h3>
                <p>HVAC stands for <strong>Heating, Ventilation, and Air Conditioning</strong>. It's the technology responsible for all aspects of indoor climate control, ensuring your space is comfortable, safe, and has healthy air quality year-round.</p>
              </div>
            </article>

            <article className="info-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
              <div>
                <h3>The Service</h3>
                <p>An HVAC service company provides the professional expertise to manage these complex systems. This includes <strong>installation</strong> of new units, proactive <strong>maintenance</strong> to ensure efficiency, and expert <strong>repairs</strong> to fix any issues.</p>
              </div>
            </article>

            <article className="info-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline></svg>
              </div>
              <div>
                <h3>Why It Matters</h3>
                <p>Proper service is not a luxury; it's essential. It guarantees energy efficiency (saving you money), extends the lifespan of your equipment, ensures safe operation, and maintains optimal indoor air quality for your health and well-being.</p>
              </div>
            </article>
          </div>

          <div className="conclusion-container">
            <h2>Why Alpine Tech is the Premier Choice</h2>
            <p>
              Understanding HVAC is one thing; mastering it is another. With 13 years of proven experience, Alpine Tech stands as the industry benchmark for quality and reliability. We don't just service systems—we deliver peace of mind. Our team of certified technicians adheres strictly to industry standards, employing top-tier equipment to guarantee your absolute comfort. For a truly professional service that prioritizes integrity and customer satisfaction, the choice is clear.
            </p>
          </div>
          
          <div className="button-group-container">
            <button onClick={() => router.back()} className="button secondary-button">
              <span>&larr;</span> Go Back
            </button>
            <button onClick={() => router.push('/')} className="button primary-button">
              Return to Home Page
            </button>
          </div>
        </main>
      </section>
    </>
  );
}