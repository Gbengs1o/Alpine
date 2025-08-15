"use client";

import React from 'react';

export default function WhyAlpinePage() {
  return (
    <>
      <style jsx>{`
        .why-alpine-section {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8f9fa;
            color: #212529;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            padding: 4rem 1rem;
            box-sizing: border-box;
        }
        .main-container {
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .section-link {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: #212529;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 24px;
            align-self: flex-start;
        }
        .section-link .dot {
            width: 8px;
            height: 8px;
            background-color: #5d99f7;
            border-radius: 50%;
        }
        .main-title {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            color: #212529;
            text-align: center;
            line-height: 1.1;
            margin: 0 0 24px 0;
        }
        .subtitle {
            font-size: 18px;
            color: #6c757d;
            text-align: center;
            max-width: 600px;
            line-height: 1.6;
            margin-bottom: 64px; /* Increased margin for more space */
        }
        
        /* New styles for the content layout */
        .content-wrapper {
            display: flex;
            flex-wrap: wrap; /* Allows stacking on smaller screens */
            gap: 48px;
            align-items: center;
            width: 100%;
        }
        .image-container {
            flex: 1;
            min-width: 300px;
        }
        .image-container img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            object-fit: cover;
        }
        .text-container {
            flex: 1.2; /* Give text slightly more space */
            min-width: 300px;
        }
        .text-container h2 {
            font-size: 28px;
            font-weight: 700;
            color: #212529;
            margin-bottom: 16px;
        }
        .text-container p {
            font-size: 16px;
            color: #6c757d;
            line-height: 1.7;
            margin-bottom: 24px;
        }
        .text-container p:last-child {
            margin-bottom: 0;
        }
      `}</style>
      
      <section className="why-alpine-section" id="our-philosophy">
        <main className="main-container">
          <a href="#our-philosophy" className="section-link">
            <span className="dot"></span>
            OUR NAME & PHILOSOPHY
          </a>
          <h1 className="main-title">Bringing the Mountain's<br/>Freshness to You</h1>
          <p className="subtitle">
            Our name is inspired by the crisp, cool, and invigorating air of the alpine mountains.
            It's not just a name—it's the standard of comfort we promise to deliver.
          </p>

          <div className="content-wrapper">
            <div className="image-container">
                {/* IMPORTANT: Replace this src with an actual path to your image */}
                <img 
                    src="/images/alpine-mountain-scenery.jpg" 
                    alt="A serene and cool alpine mountain landscape" 
                />
            </div>
            <div className="text-container">
                <h2>The Alpine Standard</h2>
                <p>
                    "Alpine" refers to the climate above the treeline in high mountains—an environment known for its purity, tranquility, and refreshingly cool air. It's a place of natural perfection and serene comfort.
                </p>
                <p>
                    We chose this name because it perfectly encapsulates our mission: to replicate that ideal atmosphere inside your home or office. We don't just install air conditioners; we engineer environments where you can feel perfectly comfortable, productive, and at ease.
                </p>
                <p>
                    When you choose <strong>Alpine Tech HVAC</strong>, you're choosing that unwavering commitment to creating your personal oasis of cool, fresh, alpine-quality air.
                </p>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}