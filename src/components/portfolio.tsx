"use client";

import { useEffect, useRef } from 'react';

const projects = [
    {
        title: "Braithwaite Memorial Hospital",
        category: "Commercial / VRF",
        description: "Complete supply and installation of a state-of-the-art VRF system for a critical healthcare environment.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"
    },
    {
        title: "Ashaka Cement, Gombe",
        category: "Industrial / VRF",
        description: "Installation of a robust VRF unit system to ensure climate control in a demanding industrial facility.",
        image: "https://images.unsplash.com/photo-1583522246938-34a8b7593853?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "BABCOCK University MRI Room",
        category: "Specialized / Concealed Units",
        description: "Precision supply and installation of ceiling concealed units for a temperature-sensitive MRI room.",
        image: "https://images.unsplash.com/photo-1629904853716-f0bc64219b1b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Eko Theater Project",
        category: "Commercial",
        description: "Multi-location deployment for Eko Theater branches in Oregun, Igando, Epe, and Badagry.",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "The AHI Residence",
        category: "Residential",
        description: "High-end residential air conditioning solution, focusing on comfort, efficiency, and aesthetics.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "BUA Cement, Edo State",
        category: "Industrial",
        description: "Large-scale HVAC system implementation for one of the nation's leading cement producers.",
        image: "https://images.unsplash.com/photo-1617066969893-1b72a6b57ac3?q=80&w=2070&auto=format&fit=crop"
    }
];

export function Portfolio() {
    const trackRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const nextBtn = nextBtnRef.current;
        const prevBtn = prevBtnRef.current;

        if (!track || !viewport || !nextBtn || !prevBtn) return;

        const populateTrack = () => {
            track.innerHTML = '';
            // Create two sets of cards for the infinite loop illusion
            [...projects, ...projects].forEach(p => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.backgroundImage = `url(${p.image})`;
                card.innerHTML = `
                    <div class="card-content">
                        <span class="project-category">${p.category}</span>
                        <h3 class="project-title">${p.title}</h3>
                        <p class="project-description">${p.description}</p>
                    </div>
                `;
                track.appendChild(card);
            });
        };

        const animateScroll = () => {
            if (!track) return;
            track.style.transition = 'none';
            const currentTransformVal = track.style.getPropertyValue('transform').match(/[-0-9.]+/);
            const currentTransform = currentTransformVal ? parseFloat(currentTransformVal[0]) : 0;
            track.style.transform = `translateX(${currentTransform - 1}px)`;

            const cardWidth = (track.children[0] as HTMLElement).offsetWidth + parseFloat(getComputedStyle(track.children[0]).marginRight);
            const scrollWidth = cardWidth * projects.length;

            if (Math.abs(currentTransform) >= scrollWidth) {
                track.style.transform = 'translateX(0px)';
            }
            
            animationFrameId.current = requestAnimationFrame(animateScroll);
        };

        const startAutoScroll = () => {
            if (track && !track.style.transform) {
                 track.style.transform = 'translateX(0px)';
            }
            stopAutoScroll();
            animationFrameId.current = requestAnimationFrame(animateScroll);
        };

        const stopAutoScroll = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };

        const manualMove = (direction: 'next' | 'prev') => {
            if(!track) return;
            stopAutoScroll();
            track.style.transition = 'transform 0.7s ease-in-out';
            
            const cardWidth = (track.children[0] as HTMLElement).offsetWidth + parseFloat(getComputedStyle(track.children[0]).marginRight);
            const currentTransformVal = track.style.getPropertyValue('transform').match(/[-0-9.]+/);
            let currentTransform = currentTransformVal ? parseFloat(currentTransformVal[0]) : 0;

            let targetTransform;
            if (direction === 'next') {
                targetTransform = Math.floor(currentTransform / cardWidth) * cardWidth - cardWidth;
            } else { // 'prev'
                targetTransform = Math.ceil(currentTransform / cardWidth) * cardWidth + cardWidth;
            }

            const scrollWidth = cardWidth * projects.length;
            
            if (targetTransform > 0) {
                 track.style.transition = 'none';
                 currentTransform -= scrollWidth;
                 track.style.transform = `translateX(${currentTransform}px)`;
                 targetTransform = currentTransform + cardWidth;
            } else if (Math.abs(targetTransform) >= scrollWidth * 1.5) {
                 track.style.transition = 'none';
                 currentTransform += scrollWidth;
                 track.style.transform = `translateX(${currentTransform}px)`;
                 targetTransform = currentTransform - cardWidth;
            }
            
            setTimeout(() => {
                if(!track) return;
                track.style.transition = 'transform 0.7s ease-in-out';
                track.style.transform = `translateX(${targetTransform}px)`;
            }, 20);
        };

        const handleNext = () => manualMove('next');
        const handlePrev = () => manualMove('prev');
        
        nextBtn.addEventListener('click', handleNext);
        prevBtn.addEventListener('click', handlePrev);
        viewport.addEventListener('mouseenter', stopAutoScroll);
        viewport.addEventListener('mouseleave', startAutoScroll);

        populateTrack();
        const startTimeout = setTimeout(startAutoScroll, 100);

        return () => {
            clearTimeout(startTimeout);
            stopAutoScroll();
            nextBtn.removeEventListener('click', handleNext);
            prevBtn.removeEventListener('click', handlePrev);
            viewport.removeEventListener('mouseenter', stopAutoScroll);
            viewport.removeEventListener('mouseleave', startAutoScroll);
        };
    }, []);

  return (
    <>
    <style jsx>{`
        :root {
            --brand-blue: #5d99f7;
            --dark-bg: #0d1117;
            --card-bg: #161b22;
            --light-text: #c9d1d9;
            --white-text: #f0f6fc;
            --border-color: #30363d;
        }

        .portfolio-section {
            width: 100%;
            background-color: var(--dark-bg);
            color: var(--white-text);
            padding: 80px 0;
            position: relative;
            overflow: hidden;
            background-image: url('https://www.transparenttextures.com/patterns/blueprint.png'); 
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .portfolio-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .portfolio-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: var(--light-text);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 24px;
        }

        .portfolio-link .dot {
            width: 8px;
            height: 8px;
            background-color: var(--brand-blue);
            border-radius: 50%;
        }

        .portfolio-header h2 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: var(--white-text);
        }

        .portfolio-header p {
            font-size: 18px;
            color: var(--light-text);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .slider-viewport {
            width: 100%;
            overflow: hidden;
            position: relative;
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        .slider-track {
            display: flex;
            will-change: transform;
        }

        .project-card {
            flex: 0 0 32%; /* Shows roughly 3 cards */
            margin-right: 2%; /* Gap between cards */
            height: 450px;
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
            background-size: cover;
            background-position: center;
            color: var(--white-text);
            border: 1px solid var(--border-color);
        }

        .project-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 70%;
            background: linear-gradient(to top, rgba(13, 17, 23, 0.95) 20%, rgba(13, 17, 23, 0));
            z-index: 1;
        }

        .card-content {
            padding: 32px;
            z-index: 2;
            position: relative;
        }
        
        .project-category {
            display: inline-block;
            background-color: var(--brand-blue);
            color: var(--white-text);
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
        }

        .project-title {
            font-size: 24px;
            font-weight: 700;
            line-height: 1.2;
            margin: 0 0 8px 0;
        }
        
        .project-description {
            font-size: 15px;
            color: var(--light-text);
            line-height: 1.5;
            margin: 0;
        }

        .slider-controls {
            position: absolute;
            bottom: 40px;
            left: 5%; /* Aligned to the left side of the content container */
            display: flex;
            gap: 12px;
            z-index: 10;
        }

        .slider-controls button {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(30, 30, 40, 0.5);
            color: var(--white-text);
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
            backdrop-filter: blur(4px);
        }

        .slider-controls button:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 992px) {
            .project-card {
                flex-basis: 48%; /* Show 2 cards */
                margin-right: 4%;
            }
        }

        @media (max-width: 768px) {
             .project-card {
                flex-basis: 80%; /* Show ~1.2 cards */
                margin-right: 5%;
            }
        }
    `}</style>
    <section id="portfolio" className="portfolio-section">
        <div className="container">
            <div className="portfolio-header">
                <a href="#" className="portfolio-link">
                    <span className="dot"></span>
                    OUR PORTFOLIO
                </a>
                <h2>A Showcase<br/>Of Our Work</h2>
                <p>
                    From large-scale commercial VRF systems to residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects.
                </p>
            </div>
        </div>
        
        <div className="slider-viewport" ref={viewportRef}>
            <div className="slider-track" ref={trackRef}>
                {/* Project cards are populated by JavaScript */}
            </div>
        </div>
        
        <div className="slider-controls">
            <button ref={prevBtnRef}>&larr;</button>
            <button ref={nextBtnRef}>&rarr;</button>
        </div>
    </section>
    </>
  );
}
