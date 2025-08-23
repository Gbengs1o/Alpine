"use client";

import { Wrench, Package, HardHat, ShieldCheck, CheckCircle2, DraftingCompass, Wind, X, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

// --- Data & Types ---
const installationSteps = [
    { icon: DraftingCompass, title: "1. Consultation & Design", description: "We start by understanding your unique needs to design the most efficient and cost-effective HVAC solution." },
    { icon: HardHat, title: "2. Precision Installation", description: "Our certified technicians handle everything with meticulous attention to detail, ensuring perfect integration." },
    { icon: Wind, title: "3. System Commissioning", description: "We thoroughly test and calibrate your new system, guaranteeing it operates at peak performance." },
];

const services = [
    {
        id: "sourcing",
        icon: Package,
        title: "Equipment Sourcing & Supply",
        description: "As official partners with leading manufacturers like GREE, we procure world-class HVAC systems at unbeatable prices. We have the expertise to recommend and deploy the perfect equipment for any requirement.",
        videoSrc: "https://www.youtube.com/embed/AkllempJ1Wo",
        imageSrc: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/service1.png",
        features: [
            { icon: CheckCircle2, title: "Official GREE Partners", description: "Since 2012, offering premier, eco-friendly air conditioning solutions." },
            { icon: CheckCircle2, title: "All Popular Brands", description: "We are equipped to supply and install any major HVAC brand specified by our clients." },
            { icon: CheckCircle2, title: "Cost-Effective Procurement", description: "Our relationships ensure you get top-tier equipment without breaking the bank." }
        ],
        marqueeImages: [
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/29.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/18.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/17.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0042.jpg'
        ]
    },
    {
        id: "installation",
        icon: HardHat,
        title: "Professional Installation",
        description: "Our installation process is designed for flawless execution across residential, commercial, and industrial projects, ensuring your system is perfectly tailored to your needs for optimal performance.",
        videoSrc: "https://www.youtube.com/embed/zuRVnD8XPLM",
        imageSrc: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/service2.png",
        steps: installationSteps,
        marqueeImages: [
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/42.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/35.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/33.jpg',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/29.jpg'
        ]
    },
    {
        id: "maintenance",
        icon: Wrench,
        title: "Maintenance & Repairs",
        description: "We offer flexible maintenance plans and expert repair services to keep your systems running smoothly, stocking all critical parts to ensure fast, effective solutions.",
        videoSrc: "https://www.youtube.com/embed/saIJ0OAbJjA",
        imageSrc: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/service3.png",
        plans: [
            { title: "Pay As You Go", description: "On-demand routine servicing, including cleaning of indoor/outdoor units. You're billed per unit serviced—perfect for flexible maintenance needs." },
            { title: "Annual Service Contract", description: "For complete peace of mind, we take full responsibility for servicing your units every three months for a full year." }
        ],
        marqueeImages: [
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/good-image-4.png',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/good-image-3.png',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/good-image-2.png',
            'https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/good-image-1.png'
        ]
    }
];

// --- NEW REUSABLE IMAGE MARQUEE COMPONENT ---
const ImageMarquee = ({ images }: { images: string[] }) => {
    // Duplicate the images to create a seamless looping effect
    const duplicatedImages = [...images, ...images];

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                {duplicatedImages.map((src, index) => (
                    <div className="marquee-image-wrapper" key={index}>
                        <Image 
                            src={src} 
                            alt={`Service showcase image ${index + 1}`} 
                            width={400} 
                            height={250} 
                            className="marquee-image" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- THE MAIN COMPONENT ---
export function ServicesDetailed() {
    const [videoModal, setVideoModal] = useState({ isOpen: false, src: '' });
    const sectionsRef = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        const currentSections = sectionsRef.current;
        currentSections.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            currentSections.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const openVideoModal = (src: string) => {
        setVideoModal({ isOpen: true, src });
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
        setVideoModal({ isOpen: false, src: '' });
        document.body.style.overflow = '';
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

  return (
    <>
      <style jsx>{`
        /* --- Styles for Image Marquee --- */
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          margin-bottom: 4rem;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-image-wrapper {
          flex-shrink: 0;
          width: 400px;
          padding: 0 12px;
        }
        .marquee-image {
          border-radius: 1rem;
          height: 250px;
          width: 100%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* --- Existing Styles --- */
        .services-detailed-page {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #111827;
          color: #e5e7eb;
          overflow-x: hidden;
        }
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 1024px) { .container { max-width: 1200px; } }
        .page-header {
          padding: 6rem 0 7rem 0;
          text-align: center;
          position: relative;
        }
        .page-header::before {
            content: '';
            position: absolute;
            top: 0; left: 50%;
            transform: translateX(-50%);
            width: 50%;
            height: 400px;
            background: radial-gradient(circle, rgba(93, 153, 247, 0.15), transparent 70%);
            pointer-events: none;
        }
        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9ca3af;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(255,255,255, 0.05);
        }
        .header-badge .dot {
          width: 8px;
          height: 8px;
          background-color: #5d99f7;
          border-radius: 50%;
          box-shadow: 0 0 8px #5d99f7;
        }
        .header-title {
          font-size: clamp(2.8rem, 6vw, 4rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin: 0 0 1rem 0;
          text-shadow: 0 0 30px rgba(93, 153, 247, 0.2);
        }
        .header-subtitle {
          font-size: 1.125rem;
          color: #d1d5db;
          max-width: 700px;
          line-height: 1.6;
          margin: 0 auto;
        }
        .service-section {
            padding: 5rem 0;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .service-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        .content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: center;
        }
        @media (min-width: 992px) {
            .content-grid { grid-template-columns: repeat(2, 1fr); gap: 4rem;}
        }
        .section-content, .feature-item, .step-card, .plan-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .is-visible .section-content, .is-visible .feature-item, .is-visible .step-card, .is-visible .plan-card {
            opacity: 1;
            transform: translateY(0);
        }
        .is-visible .feature-item:nth-child(2), .is-visible .step-card:nth-child(2), .is-visible .plan-card:nth-child(2) { transition-delay: 0.5s; }
        .is-visible .feature-item:nth-child(3), .is-visible .step-card:nth-child(3) { transition-delay: 0.6s; }
        .section-heading {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .section-title {
            font-size: clamp(1.75rem, 4vw, 2.25rem);
            font-weight: 700;
            color: #ffffff;
        }
        .section-description {
            color: #d1d5db;
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 2rem;
        }
        .icon-wrapper {
            flex-shrink: 0;
            width: 56px; height: 56px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(93, 153, 247, 0.1);
            color: #5d99f7;
            border: 1px solid rgba(93, 153, 247, 0.3);
        }
        .icon-wrapper :global(svg) { width: 32px; height: 32px; }
        .feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem; }
        .feature-item { display: flex; align-items: flex-start; gap: 1rem; }
        .feature-item :global(svg) { color: #5d99f7; flex-shrink: 0; margin-top: 3px; width: 24px; height: 24px;}
        .feature-item h4 { font-weight: 600; margin: 0 0 0.25rem 0; color: #ffffff; }
        .feature-item p { font-size: 0.9rem; color: #9ca3af; margin: 0; line-height: 1.5; }
        .video-container {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            cursor: pointer;
            aspect-ratio: 16 / 10;
        }
        .video-container::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(17, 24, 39, 0.7), transparent 50%);
            transition: background 0.3s ease;
        }
        .video-container:hover::after {
            background: linear-gradient(to top, rgba(17, 24, 39, 0.5), transparent 70%);
        }
        .video-container :global(img) { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .video-container:hover :global(img) { transform: scale(1.05); }
        .play-button {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(1);
            width: 80px; height: 80px;
            background-color: rgba(255, 255, 255, 0.1);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            transition: all 0.3s ease;
            box-shadow: 0 0 0 0 rgba(93, 153, 247, 0.5);
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(93, 153, 247, 0.5); }
            70% { box-shadow: 0 0 0 20px rgba(93, 153, 247, 0); }
            100% { box-shadow: 0 0 0 0 rgba(93, 153, 247, 0); }
        }
        .video-container:hover .play-button {
            transform: translate(-50%, -50%) scale(1.1);
            background-color: rgba(93, 153, 247, 0.8);
            animation: none;
        }
        .play-button :global(svg) { width: 40px; height: 40px; }
        .installation-section { background: rgba(93, 153, 247, 0.05); padding: 5rem 0; border-radius: 1.5rem; }
        .installation-section .section-heading { justify-content: center; }
        .installation-section .section-description { max-width: 800px; margin-left: auto; margin-right: auto; margin-bottom: 3rem; text-align: center; }
        .steps-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 768px) { .steps-grid { grid-template-columns: repeat(3, 1fr); } }
        .step-card {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        .step-card .icon-wrapper { margin: 0 auto 1rem auto; }
        .step-card h3 { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #fff; }
        .step-card p { font-size: 0.9rem; color: #d1d5db; line-height: 1.6; margin: 0; }
        .installation-video { margin-top: 3rem; }
        .maintenance-plans { display: flex; flex-direction: column; gap: 1.5rem; }
        .plan-card {
            background-color: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .plan-card h4 { font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #fff; }
        .plan-card p { font-size: 0.9rem; color: #d1d5db; margin: 0; line-height: 1.6; }
        .note { font-size: 0.9rem; font-style: italic; color: #9ca3af; margin-top: 1.5rem; }
        .grid-order-first { order: -1; }
        @media (min-width: 992px) { .grid-order-first { order: 0; } }
        .video-modal-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(17, 24, 39, 0.8);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        .video-modal-content {
            position: relative;
            width: 90%;
            max-width: 1100px;
            aspect-ratio: 16 / 9;
            background-color: #000;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
            animation: scaleIn 0.3s ease;
        }
        .video-modal-content iframe {
            width: 100%;
            height: 100%;
            border: 0;
            border-radius: 1rem;
        }
        .close-modal-button {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            padding: 8px;
        }
        .close-modal-button :global(svg) { width: 32px; height: 32px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
      
      <div className="services-detailed-page">
        <header className="page-header">
          <div className="container">
            <p className="header-badge"><span className="dot"></span>OUR SERVICES</p>
            <h1 className="header-title">Total Climate Control, End-to-End</h1>
            <p className="header-subtitle">
              We provide a complete suite of professional HVAC services. From sourcing the best equipment to expert installation and reliable maintenance, we are your trusted partner for comfort.
            </p>
          </div>
        </header>

        <main className="container">
            <section id="sourcing" className="service-section" ref={(el) => { sectionsRef.current[0] = el; }}>
                <ImageMarquee images={services[0].marqueeImages} />
                <div className="content-grid">
                  <div className="section-content">
                    <div className="section-heading">
                      <div className="icon-wrapper"><Package /></div>
                      <h2 className="section-title">{services[0].title}</h2>
                    </div>
                    <p className="section-description">{services[0].description}</p>
                    <ul className="feature-list">
                      {services[0].features!.map((feature, index) => (
                        <li key={index} className="feature-item"><feature.icon /><div><h4>{feature.title}</h4><p>{feature.description}</p></div></li>
                      ))}
                    </ul>
                  </div>
                  <div className="video-container" onClick={() => openVideoModal(services[0].videoSrc)}>
                    <Image src={services[0].imageSrc} alt={services[0].title} fill style={{ objectFit: 'cover' }} />
                    <div className="play-button"><Play /></div>
                  </div>
                </div>
            </section>

            <section id="installation" className="service-section installation-section" ref={(el) => { sectionsRef.current[1] = el; }}>
                <div className="container">
                    <ImageMarquee images={services[1].marqueeImages} />
                    <div className="section-content">
                        <div className="section-heading"><div className="icon-wrapper"><HardHat /></div><h2 className="section-title">{services[1].title}</h2></div>
                        <p className="section-description">{services[1].description}</p>
                    </div>
                    <div className="steps-grid">
                        {services[1].steps!.map((step, index) => (
                        <div key={index} className="step-card"><div className="icon-wrapper"><step.icon /></div><h3>{step.title}</h3><p>{step.description}</p></div>
                        ))}
                    </div>
                    <div className="video-container installation-video" onClick={() => openVideoModal(services[1].videoSrc)}>
                        <Image src={services[1].imageSrc} alt={services[1].title} fill style={{ objectFit: 'cover' }} />
                        <div className="play-button"><Play /></div>
                    </div>
                </div>
            </section>

            <section id="maintenance" className="service-section" ref={(el) => { sectionsRef.current[2] = el; }}>
                <ImageMarquee images={services[2].marqueeImages} />
                <div className="content-grid">
                  <div className="video-container grid-order-first" onClick={() => openVideoModal(services[2].videoSrc)}>
                    <Image src={services[2].imageSrc} alt={services[2].title} fill style={{ objectFit: 'cover' }} />
                    <div className="play-button"><Play /></div>
                  </div>
                  <div className="section-content">
                    <div className="section-heading"><div className="icon-wrapper"><Wrench /></div><h2 className="section-title">{services[2].title}</h2></div>
                    <p className="section-description">{services[2].description}</p>
                    <div className="maintenance-plans">
                      {services[2].plans!.map((plan, index) => (<div key={index} className="plan-card"><h4>{plan.title}</h4><p>{plan.description}</p></div>))}
                    </div>
                    <p className="note">If a fault is found, we provide a detailed estimate and only proceed with repairs upon your approval.</p>
                  </div>
                </div>
            </section>
        </main>
        
        {videoModal.isOpen && (
            <div className="video-modal-backdrop" onClick={closeVideoModal}>
                <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-modal-button" onClick={closeVideoModal} aria-label="Close video player"><X /></button>
                    <iframe src={`${videoModal.src}?autoplay=1&rel=0`} title="Service Explainer Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        )}
      </div>
    </>
  );
}
