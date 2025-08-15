"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// New data for the 12 expert teams
const expertTeamsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Specialist Team ${i + 1}`,
  role: 'Specialized Unit'
}));


// Data for the scrolling statistics cards
const stats = [
    { id: 'card-1', value: 13, duration: 1200, suffix: '', description: 'Years of Proven HVAC Expertise', highlight: 'Serving Our Community Since 2011' },
    { id: 'card-2', value: 12, duration: 1500, suffix: '+', description: 'Certified Technicians on Staff', highlight: 'Fully Licensed & Insured' },
    { id: 'card-3', value: 100, duration: 1500, suffix: '%', description: 'Customer Satisfaction Rate', highlight: 'Every Job Guaranteed' },
    { id: 'card-4', value: 24, duration: 1000, suffix: '/7', description: 'Emergency Service Availability', highlight: 'Ready When You Need Us Most' },
];

export function Advantages() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    // --- REFS for various elements ---
    const stickyWrapperRef = useRef<HTMLDivElement>(null);
    const filmStripRef = useRef<HTMLDivElement>(null);
    const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressDotsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const statsHeaderRef = useRef<HTMLDivElement>(null);
    const progressIndicatorRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- REFACTORED POPUP LOGIC ---
    // Handles closing the popup when the 'Escape' key is pressed
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsPopupOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    // Handles body overflow when popup is open/closed
    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isPopupOpen]);

    const showPopup = () => setIsPopupOpen(true);
    const hidePopup = () => setIsPopupOpen(false);

    const handleTeamCardMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        if (window.innerWidth > 768) {
             hoverTimeoutRef.current = setTimeout(showPopup, 500);
        }
    };
    
    const handleTeamCardMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        if (window.innerWidth > 768) {
            hoverTimeoutRef.current = setTimeout(hidePopup, 800);
        }
    };

    const handlePopupMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    }

    const handleTeamCardClick = () => {
        if (window.innerWidth <= 768 || !isPopupOpen) {
            showPopup();
        }
    };
    
    // --- SCROLLING STATS LOGIC ---
    useEffect(() => {
        const handleScroll = () => {
            const stickyWrapper = stickyWrapperRef.current;
            const filmStrip = filmStripRef.current;
            const statsHeader = statsHeaderRef.current;
            const progressIndicator = progressIndicatorRef.current;

            if (!stickyWrapper || !filmStrip || !statsHeader || !progressIndicator) return;

            const wrapperRect = stickyWrapper.getBoundingClientRect();
            const isVisible = wrapperRect.top <= 0 && wrapperRect.bottom >= window.innerHeight;

            statsHeader.classList.toggle('visible', isVisible);
            progressIndicator.classList.toggle('visible', isVisible);
            
            if (!isVisible) return;

            const scrollableHeight = stickyWrapper.offsetHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, (-wrapperRect.top) / scrollableHeight));
            
            const numCards = stats.length;
            const moveDistance = filmStrip.offsetWidth / numCards * (numCards - 1);
            filmStrip.style.transform = `translateX(${-scrollProgress * moveDistance}px)`;
            
            const activeCardIndex = Math.floor(scrollProgress * (numCards - 0.001));

            statCardsRef.current.forEach((card, index) => {
                if (card) card.classList.toggle('is-active', index === activeCardIndex);
            });

            progressDotsRef.current.forEach((dot, index) => {
                if(dot) dot.classList.toggle('active', index === activeCardIndex);
            });
        };
        
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        const animateValue = (obj: HTMLElement, start: number, end: number, duration: number, suffix: string) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easedProgress = progress * (2 - progress);
                const currentValue = Math.floor(easedProgress * (end - start) + start);
                obj.textContent = currentValue + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.textContent = end + suffix;
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target as HTMLDivElement;
                if (entry.isIntersecting && card.dataset.animated !== 'true') {
                    const numberEl = card.querySelector('.stat-number') as HTMLElement;
                    const stat = stats.find(s => s.id === card.id);
                    if (numberEl && stat) {
                        animateValue(numberEl, 0, stat.value, stat.duration, stat.suffix);
                        card.dataset.animated = 'true';
                    }
                }
            });
        }, { threshold: 0.3 });
        
        const currentStatCards = statCardsRef.current;
        currentStatCards.forEach(card => {
            if (card) observer.observe(card);
        });
        
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial call
        
        return () => {
            window.removeEventListener('scroll', onScroll);
            currentStatCards.forEach(card => {
              if (card) observer.unobserve(card);
            });
        };
    }, []);
    
    const handleDotClick = (index: number) => {
        const stickyWrapper = stickyWrapperRef.current;
        if (!stickyWrapper) return;

        const numCards = stats.length;
        const targetProgress = index / (numCards - 1);
        const scrollableHeight = stickyWrapper.offsetHeight - window.innerHeight;
        const targetScrollY = stickyWrapper.offsetTop + (targetProgress * scrollableHeight);
        
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    };

    return (
        <>
        <style jsx>{`
            /* Your existing styles... */
            .hero-section { min-height: 100vh; display: flex; align-items: center; position: relative; background: radial-gradient(circle at 20% 80%, rgba(91, 157, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(91, 157, 255, 0.1) 0%, transparent 50%); }
            .page-header { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: start; max-width: 1200px; margin: 0 auto; padding: 40px 20px; width: 100%; position: relative; z-index: 10; }
            .header-content { max-width: 600px; }
            .section-pre-title { color: #718096; font-weight: 600; font-size: 14px; letter-spacing: 2px; margin: 0 0 20px 0; text-transform: uppercase; display: flex; align-items: center; opacity: 0; transform: translateY(20px); animation: slideInUp 0.8s ease-out forwards; }
            .section-pre-title::before { content: '•'; color: #5B9DFF; font-size: 18px; margin-right: 8px; line-height: 1; }
            .section-title { font-size: clamp(36px, 6vw, 64px); font-weight: 700; color: #2d3748; line-height: 1.1; margin: 0 0 30px 0; opacity: 0; transform: translateY(30px); animation: slideInUp 0.8s ease-out 0.2s forwards; }
            .section-subtitle { font-size: 18px; color: #718096; line-height: 1.6; margin-bottom: 0; opacity: 0; transform: translateY(20px); animation: slideInUp 0.8s ease-out 0.4s forwards; }
            .team-showcase { display: flex; flex-direction: column; align-items: flex-end; gap: 20px; opacity: 0; transform: translateX(30px); animation: slideInRight 0.8s ease-out 0.6s forwards; min-width: 320px; }
            .team-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(91, 157, 255, 0.1); transition: all 0.3s ease; cursor: pointer; width: 100%; text-align: center; }
            .team-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(91, 157, 255, 0.2); }
            .team-label { font-size: 12px; font-weight: 600; color: #718096; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
            .team-avatars { display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 16px; }
            .team-avatars img, .avatar-more { width: 44px; height: 44px; border-radius: 50%; border: 3px solid white; margin-left: -8px; object-fit: cover; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(91, 157, 255, 0.15); }
            .team-avatars img:first-child { margin-left: 0; }
            .team-avatars img:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 8px 20px rgba(91, 157, 255, 0.25); z-index: 10; position: relative; }
            .avatar-more { background: linear-gradient(135deg, #5B9DFF, #4a8df8); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
            .team-stats { display: flex; flex-direction: column; gap: 8px; align-items: center; }
            .team-stat-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #718096; font-weight: 500; }
            .team-stat-number { color: #5B9DFF; font-weight: 700; }
            .team-stat-dot { width: 4px; height: 4px; background: #5B9DFF; border-radius: 50%; }
            .team-popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .team-popup.active { opacity: 1; visibility: visible; }
            .popup-content { background: white; border-radius: 20px; padding: 40px; max-width: 800px; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25); transform: scale(0.9) translateY(20px); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .team-popup.active .popup-content { transform: scale(1) translateY(0); }
            .popup-close { position: absolute; top: 20px; right: 25px; background: none; border: none; font-size: 28px; cursor: pointer; color: #718096; transition: color 0.2s ease; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
            .popup-close:hover { color: #2d3748; background: #f8fafc; }
            .popup-title { font-size: 28px; font-weight: 700; color: #2d3748; margin-bottom: 30px; text-align: center; }
            .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 25px; }
            .team-member { text-align: center; padding: 25px 20px; border-radius: 16px; transition: all 0.3s ease; border: 1px solid transparent; }
            .team-member:hover { background: #f8fafc; border-color: #5B9DFF; transform: translateY(-5px); box-shadow: 0 10px 25px rgba(91, 157, 255, 0.1); }
            .team-image-placeholder { width: 90px; height: 90px; border-radius: 50%; background-color: #f1f5f9; border: 3px solid #e2e8f0; margin: 0 auto 15px auto; }
            .team-member h4 { font-size: 16px; font-weight: 600; color: #2d3748; margin-bottom: 5px; }
            .team-member p { font-size: 14px; color: #718096; font-weight: 500; }
            .stats-section { position: relative; }
            .sticky-wrapper { height: 300vh; position: relative; }
            .sticky-container { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid rgba(255, 255, 255, 0.8); border-bottom: 1px solid rgba(255, 255, 255, 0.8); }
            .stats-header { position: absolute; top: 100px; left: 40px; z-index: 100; opacity: 0; transform: translateY(-20px); transition: all 0.6s cubic-bezier(0.65, 0, 0.35, 1); }
            .stats-header.visible { opacity: 1; transform: translateY(0); }
            .stats-pre-title-header { color: #5B9DFF; font-weight: 700; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; margin-bottom: 10px; }
            .stats-pre-title-header::before { content: ''; width: 30px; height: 2px; background: #5B9DFF; margin-right: 10px; }
            .stats-title-header { font-size: 24px; font-weight: 700; color: #2d3748; }
            .film-strip { display: flex; height: 100%; width: 400%; will-change: transform; transition: transform 0.1s linear; }
            .stat-card { width: 25%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px 40px; box-sizing: border-box; text-align: center; position: relative; }
            .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at center, rgba(91, 157, 255, 0.05) 0%, transparent 70%); opacity: 0; transition: opacity 0.6s ease; }
            .stat-card.is-active::before { opacity: 1; }
            .stat-number { font-size: clamp(64px, 12vw, 128px); color: #5B9DFF; font-weight: 700; line-height: 1; margin-bottom: 30px; position: relative; z-index: 2; }
            .stat-description { color: #2d3748; font-weight: 600; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; max-width: 400px; line-height: 1.4; opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); position: relative; z-index: 2; }
            .stat-card.is-active .stat-description { opacity: 0.9; transform: translateY(0); }
            .stat-highlight { display: block; color: #5B9DFF; font-weight: 700; margin-top: 10px; font-size: 14px; letter-spacing: 0.5px; }
            .progress-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 100; opacity: 0; transition: opacity 0.3s ease; }
            .progress-indicator.visible { opacity: 1; }
            .progress-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(91, 157, 255, 0.3); transition: all 0.3s ease; cursor: pointer; border: none; padding: 0;}
            .progress-dot.active { background: #5B9DFF; transform: scale(1.2); }
            @media (max-width: 768px) { .page-header { grid-template-columns: 1fr; gap: 40px; padding: 60px 20px; text-align: center; } .header-content { order: 1; } .team-showcase { order: 2; align-items: center; transform: translateY(20px); animation: slideInUp 0.8s ease-out 0.6s forwards; min-width: auto; } .section-title { font-size: 42px; } .team-avatars img, .avatar-more { width: 40px; height: 40px; } .avatar-more { font-size: 11px; } .team-card { padding: 20px; } .popup-content { margin: 20px; padding: 30px 20px; } .team-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; } .stats-header { top: 80px; left: 20px; } .stat-card { padding: 40px 20px; } .stat-description { font-size: 14px; } .progress-indicator { bottom: 20px; } }
            @media (max-width: 480px) { .section-title { font-size: 36px; } .team-avatars img, .avatar-more { width: 36px; height: 36px; } .avatar-more { font-size: 10px; } .stat-description { font-size: 12px; } .team-card { padding: 16px; } .team-stat-item { font-size: 12px; } }
        `}</style>
        <section className="hero-section">
            <header className="page-header">
                <div className="header-content">
                    <p className="section-pre-title">Why Choose Alpine Tech</p>
                    <h1 className="section-title">Your Trusted Partner For Total Comfort</h1>
                    <p className="section-subtitle">Experience unmatched HVAC expertise with over a decade of proven reliability, cutting-edge solutions, and customer-first service that keeps your home comfortable year-round.</p>
                </div>
                
                <div className="team-showcase">
                    <div 
                      className="team-card" 
                      tabIndex={0} 
                      role="button" 
                      aria-label="View our expert team"
                      onMouseEnter={handleTeamCardMouseEnter}
                      onMouseLeave={handleTeamCardMouseLeave}
                      onClick={handleTeamCardClick}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') showPopup(); }}
                    >
                        <div className="team-label">Meet Our Expert Team</div>
                        <div className="team-avatars">
                            <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" alt="Team member 1" width={44} height={44}/>
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" alt="Team member 2" width={44} height={44}/>
                            <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" alt="Team member 3" width={44} height={44}/>
                            <div className="avatar-more">+9</div>
                        </div>
                        <div className="team-stats">
                            <div className="team-stat-item">
                                <span className="team-stat-number">12</span>
                                <span>Specialist Teams</span>
                            </div>
                            <div className="team-stat-dot"></div>
                            <div className="team-stat-item">
                                <span className="team-stat-number">13+</span>
                                <span>Years Experience</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </section>

        {isPopupOpen && (
            <div 
              className={cn("team-popup", { active: isPopupOpen })}
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="popup-title"
              onClick={hidePopup}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handleTeamCardMouseLeave}
            >
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <button className="popup-close" aria-label="Close team popup" onClick={hidePopup}>&times;</button>
                    <h2 id="popup-title" className="popup-title">Meet Our Expert Teams</h2>
                    <div className="team-grid">
                        {expertTeamsData.map(team => (
                            <div key={team.id} className="team-member">
                                <div className="team-image-placeholder" />
                                <h4>{team.name}</h4>
                                <p>{team.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        <section className="stats-section">
            <div ref={stickyWrapperRef} className="sticky-wrapper">
                <div className="sticky-container">
                    <div ref={statsHeaderRef} className="stats-header">
                        <p className="stats-pre-title-header">Our Track Record</p>
                        <h3 className="stats-title-header">Proven Excellence</h3>
                    </div>
                    
                    <div ref={filmStripRef} className="film-strip">
                        {stats.map((stat, index) => (
                            <div key={stat.id} id={stat.id} ref={(el) => { statCardsRef.current[index] = el; }} className="stat-card">
                                <span className="stat-number">{`0${stat.suffix || ''}`}</span>
                                <p className="stat-description">
                                    {stat.description}
                                    <span className="stat-highlight">{stat.highlight}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div ref={progressIndicatorRef} className="progress-indicator">
                        {stats.map((_, index) => (
                            <button
                                key={`dot-${index}`}
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => handleDotClick(index)}
                                ref={(el) => { progressDotsRef.current[index] = el; }}
                                className="progress-dot"
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}