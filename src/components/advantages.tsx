"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility for classnames
import { Button } from '@/components/ui/button'; // Assuming a Button component like in shadcn/ui

// Data for team members - using original image URLs
const teamMembers = [
  { name: 'Alex Thompson', role: 'Lead Technician', src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Mike Rodriguez', role: 'HVAC Specialist', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Sarah Chen', role: 'Installation Expert', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'David Wilson', role: 'Service Manager', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Lisa Johnson', role: 'Customer Care', src: 'https://images.unsplash.com/photo-1494790108377-2616b2234843?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'James Brown', role: 'Field Supervisor', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Emma Davis', role: 'Quality Assurance', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  { name: 'Carlos Martinez', role: 'Senior Technician', src: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
];

// Data for the scrolling statistics cards
const stats = [
    { id: 'card-1', value: 13, duration: 1200, suffix: '', description: 'Years of Proven HVAC Expertise', highlight: 'Serving Our Community Since 2011' },
    { id: 'card-2', value: 12, duration: 1500, suffix: '+', description: 'Certified Technicians on Staff', highlight: 'Fully Licensed & Insured' },
    { id: 'card-3', value: 100, duration: 1500, suffix: '%', description: 'Customer Satisfaction Rate', highlight: 'Every Job Guaranteed' },
    { id: 'card-4', value: 24, duration: 1000, suffix: '/7', description: 'Emergency Service Availability', highlight: 'Ready When You Need Us Most' },
];

export function Advantages() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isStickySectionVisible, setIsStickySectionVisible] = useState(false);
    
    const stickyWrapperRef = useRef<HTMLDivElement>(null);
    const filmStripRef = useRef<HTMLDivElement>(null);
    const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressDotsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const stickyWrapper = stickyWrapperRef.current;
            const filmStrip = filmStripRef.current;
            if (!stickyWrapper || !filmStrip) return;

            const wrapperRect = stickyWrapper.getBoundingClientRect();
            
            // Check if the sticky container is active on screen
            const isVisible = wrapperRect.top <= 0 && wrapperRect.bottom >= window.innerHeight;
            setIsStickySectionVisible(isVisible);
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

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const animateValue = (obj: HTMLElement, start: number, end: number, duration: number, suffix: string) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easedProgress = progress * (2 - progress); // ease-out
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
        }, { threshold: 0.3 }); // Using 0.3 threshold like original
        
        statCardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsPopupOpen(false);
        };
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPopupOpen]);
    
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
        <div className="bg-gradient-to-tr from-[#e0f7fa] via-[#b3e5fc] to-[#d1e5f0] text-[#2d3748] overflow-x-hidden">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center relative bg-[radial-gradient(circle_at_20%_80%,rgba(91,157,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(91,157,255,0.1)_0%,transparent_50%)]">
                <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start max-w-7xl mx-auto px-5 py-10 md:py-20 w-full z-10">
                    <div className="max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-700 md:order-1 text-center md:text-left">
                        <p className="flex items-center justify-center md:justify-start text-sm font-semibold tracking-[2px] text-gray-500 uppercase mb-5">
                            <span className="text-lg font-bold text-[#5B9DFF] mr-2">•</span>Why Choose Alpine Tech
                        </p>
                        <h1 className="text-[clamp(36px,6vw,64px)] font-bold text-gray-800 leading-tight mb-7 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">Your Trusted Partner For Total Comfort</h1>
                        <p className="text-lg text-gray-600 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">Experience unmatched HVAC expertise with over a decade of proven reliability, cutting-edge solutions, and customer-first service that keeps your home comfortable year-round.</p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end gap-5 animate-in fade-in md:slide-in-from-right-5 slide-in-from-bottom-5 duration-700 delay-500 md:order-2">
                        <div 
                            className="bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg shadow-blue-500/10 transition-all duration-300 cursor-pointer w-full max-w-sm md:min-w-[320px] text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9DFF] focus-visible:ring-offset-2"
                            onClick={() => setIsPopupOpen(true)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsPopupOpen(true)}
                            tabIndex={0}
                            role="button"
                            aria-label="View our expert team"
                        >
                            <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">Meet Our Expert Team</div>
                            <div className="flex items-center justify-center relative mb-4">
                                {teamMembers.slice(0, 3).map((member, index) => (
                                    <Image key={member.name} src={member.src} alt={member.name} width={44} height={44} className="rounded-full border-[3px] border-white -ml-2 first:ml-0 hover:scale-110 hover:z-10 transition-transform shadow-md" />
                                ))}
                                <div className="w-11 h-11 rounded-full border-[3px] border-white -ml-2 bg-gradient-to-br from-[#5B9DFF] to-blue-400 text-white flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform shadow-md">
                                    +9
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-[13px] text-gray-600 font-medium">
                                <div className="flex items-center gap-2"><span className="font-bold text-[#5B9DFF]">12</span><span>Certified Technicians</span></div>
                                <div className="w-1 h-1 bg-[#5B9DFF] rounded-full"></div>
                                <div className="flex items-center gap-2"><span className="font-bold text-[#5B9DFF]">13+</span><span>Years Experience</span></div>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            {/* Team Popup */}
            {isPopupOpen && (
                 <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] flex items-center justify-center p-5 animate-in fade-in"
                    onClick={() => setIsPopupOpen(false)}
                    role="dialog"
                    aria-modal="true"
                 >
                    <div 
                        className="bg-white rounded-2xl p-7 md:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in-95"
                        onClick={e => e.stopPropagation()}
                    >
                        <Button variant="ghost" size="icon" className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-full" onClick={() => setIsPopupOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close team popup</span>
                        </Button>
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Meet Our Expert Team</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-8">
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center p-4 rounded-2xl transition-all duration-300 hover:bg-gray-100/70 hover:border-[#5B9DFF] hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 border border-transparent">
                                    <Image src={member.src} alt={member.name} width={90} height={90} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-[3px] border-[#5B9DFF] mb-4" />
                                    <h4 className="font-semibold text-sm md:text-base">{member.name}</h4>
                                    <p className="text-gray-500 text-xs md:text-sm">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            )}

            {/* Stats Section - THIS IS THE SCROLL-LOCKED SECTION */}
            <section className="stats-section relative">
                <div ref={stickyWrapperRef} className="h-[400vh] relative">
                    <div className="sticky top-0 h-screen w-full overflow-hidden bg-white/85 backdrop-blur-xl border-y border-white/80">
                        <div className={cn(
                            "absolute top-10 left-10 z-50 transition-all duration-500",
                            isStickySectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                        )}>
                            <p className="flex items-center text-xs font-bold text-[#5B9DFF] tracking-[2px] uppercase"><span className="w-8 h-0.5 bg-[#5B9DFF] mr-3"></span>Our Track Record</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-2">Proven Excellence</h3>
                        </div>
                        
                        <div ref={filmStripRef} className="flex h-full w-[400%]">
                            {stats.map((stat, index) => (
                                <div key={stat.id} id={stat.id} ref={el => statCardsRef.current[index] = el} className="w-1/4 h-full flex flex-col justify-center items-center p-10 text-center relative">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,157,255,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 stat-bg"></div>
                                    <span className="stat-number text-[clamp(64px,12vw,128px)] text-[#5B9DFF] font-bold leading-none z-10">{`0${stat.suffix}`}</span>
                                    <p className="stat-description text-gray-800 font-semibold text-base tracking-wider uppercase max-w-sm mt-6 opacity-0 translate-y-8 transition-all duration-700 z-10">
                                        {stat.description}
                                        <span className="block text-[#5B9DFF] font-bold mt-2.5 text-sm tracking-normal normal-case">{stat.highlight}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        <div className={cn(
                            "absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-50 transition-opacity duration-300",
                             isStickySectionVisible ? 'opacity-100' : 'opacity-0'
                        )}>
                            {stats.map((_, index) => (
                                <button
                                    key={`dot-${index}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    onClick={() => handleDotClick(index)}
                                    ref={el => progressDotsRef.current[index] = el}
                                    className="progress-dot w-2.5 h-2.5 rounded-full bg-blue-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9DFF] focus-visible:ring-offset-2"
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* The `<style jsx>` block is perfect for complex, state-driven styles that are tricky with Tailwind. */}
            <style jsx>{`
                .is-active .stat-description {
                    opacity: 0.9;
                    transform: translateY(0);
                    transition-delay: 200ms;
                }
                .is-active .stat-bg {
                    opacity: 1;
                }
                .progress-dot.active {
                    background-color: #5B9DFF;
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
}

// IMPORTANT: For Next.js <Image> component to work with external URLs,
// you must add the hostname to your `next.config.js` file:
/*
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
*/