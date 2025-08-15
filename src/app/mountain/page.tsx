"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function WhyAlpinePage() {
  const router = useRouter();

  return (
    <>
      <Script 
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" 
        type="module" 
        strategy="lazyOnload" 
      />

      <style jsx>{`
        /* --- Keyframes for subtle animations --- */
        @keyframes fadeInZoom {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .why-alpine-section {
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
            overflow-x: hidden;
        }
        .main-container {
            width: 100%;
            max-width: 1100px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* --- 1. Split Hero Section --- */
        .split-hero-container {
            display: flex;
            align-items: center;
            gap: 48px;
            width: 100%;
            margin-bottom: 80px;
        }
        .hero-text-content {
            flex: 1.2;
            animation: fadeInUp 0.8s ease-out;
        }
        .section-link {
            display: flex; align-items: center; gap: 8px; text-decoration: none; color: #212529;
            font-size: 12px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px;
        }
        .section-link .dot {
            width: 8px; height: 8px; background-color: #5d99f7; border-radius: 50%;
        }
        .main-title {
            font-size: clamp(2.8rem, 5vw, 3.8rem); font-weight: 700; color: #212529;
            text-align: left; line-height: 1.1; margin: 0 0 24px 0;
        }
        .subtitle {
            font-size: 18px; color: #6c757d; text-align: left;
            line-height: 1.6; margin: 0;
        }
        .hero-image-container {
            flex: 1;
            min-width: 300px;
            animation: fadeInZoom 0.8s ease-out;
        }
        .hero-image-container img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            object-fit: cover;
            display: block;
        }

        /* --- 2. Story Explanation Section --- */
        .story-container {
            text-align: center;
            max-width: 700px;
            margin-bottom: 80px;
            animation: fadeInUp 0.8s 0.2s ease-out backwards;
        }
        .story-container h2 {
            font-size: 28px; font-weight: 700; color: #212529; margin-bottom: 24px;
        }
        .story-container p {
            font-size: 17px; color: #495057;
            line-height: 1.8; margin: 0;
        }

        /* --- 3. Immersive Animation Section --- */
        .immersive-animation-section {
            width: 100%;
            text-align: center;
            margin-bottom: 64px;
            animation: fadeInUp 0.8s 0.4s ease-out backwards;
        }
        .animation-wrapper {
            max-width: 600px; /* Much larger! */
            margin: 16px auto 0;
        }

        /* --- 4. Navigation Button Group --- */
        .button-group-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            animation: fadeInUp 0.8s 0.6s ease-out backwards;
        }
        .button {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 12px 24px; font-size: 14px; font-weight: 600;
            border-radius: 50px; cursor: pointer; text-decoration: none;
            transition: all 0.3s ease; border: 1px solid transparent;
        }
        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .primary-button {
            background-color: #5d99f7; color: white; border-color: #5d99f7;
        }
        .secondary-button {
            background-color: #ffffff; color: #212529; border-color: #dee2e6;
        }

        /* Responsive adjustments */
        @media (max-width: 900px) {
            .split-hero-container {
                flex-direction: column;
                text-align: center;
            }
            .main-title, .subtitle {
                text-align: center;
            }
            .section-link {
                align-self: center;
            }
        }
      `}</style>
      
      <section className="why-alpine-section">
        <main className="main-container">

          <div className="split-hero-container">
            <div className="hero-text-content">
              <div className="section-link">
                <span className="dot"></span>
                OUR CORE PHILOSOPHY
              </div>
              <h1 className="main-title">More Than a Name,<br/>It's a Feeling.</h1>
              <p className="subtitle">
                Our name is inspired by the pure, crisp, and invigorating comfort of a cool mountain breeze. It’s the standard of experience we promise to deliver.
              </p>
            </div>
            <div className="hero-image-container">
              <img 
                  src="https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/Google_AI_Studio_2025-08-15T20_57_22.292Z.png" 
                  alt="A serene alpine mountain landscape with a clear lake" 
              />
            </div>
          </div>

          <div className="story-container">
            <h2>The Alpine Standard of Comfort</h2>
            <p>
              Imagine the oppressive heat of a Lagos summer day. The air is heavy, thick, and drains your energy. Now, picture a high mountain peak, where the air is so <strong>crisp, cool, and pure</strong> it feels like a drink of cold, fresh water. That is the feeling of "Alpine." This is the standard we bring into your home and office.
            </p>
          </div>

          <div className="immersive-animation-section">
            <h2>Your Personal Oasis</h2>
            <div className="animation-wrapper">
              <dotlottie-wc
                  key="lottie-animation"
                  src="https://lottie.host/e91a8d4c-b485-45b7-9663-a70d019409d6/wptT1bJBpq.lottie"
                  style={{ width: '100%', height: 'auto' }}
                  speed="1"
                  autoplay
                  loop
              ></dotlottie-wc>
            </div>
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