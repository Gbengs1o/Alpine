"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const teamMembers = [
  { name: 'Alex Thompson', role: 'Lead Technician', src: 'https://placehold.co/200x200.png', hint: 'man portrait' },
  { name: 'Mike Rodriguez', role: 'HVAC Specialist', src: 'https://placehold.co/200x200.png', hint: 'man portrait' },
  { name: 'Sarah Chen', role: 'Installation Expert', src: 'https://placehold.co/200x200.png', hint: 'woman portrait' },
  { name: 'David Wilson', role: 'Service Manager', src: 'https://placehold.co/200x200.png', hint: 'man portrait' },
  { name: 'Lisa Johnson', role: 'Customer Care', src: 'https://placehold.co/200x200.png', hint: 'woman portrait' },
  { name: 'James Brown', role: 'Field Supervisor', src: 'https://placehold.co/200x200.png', hint: 'man portrait' },
  { name: 'Emma Davis', role: 'Quality Assurance', src: 'https://placehold.co/200x200.png', hint: 'woman portrait' },
  { name: 'Carlos Martinez', role: 'Senior Technician', src: 'https://placehold.co/200x200.png', hint: 'man portrait' },
];

const stats = [
    { id: 'card-1', value: 13, duration: 1200, suffix: '', description: 'Years of Proven HVAC Expertise', highlight: 'Serving Our Community Since 2011' },
    { id: 'card-2', value: 12, duration: 1500, suffix: '+', description: 'Certified Technicians on Staff', highlight: 'Fully Licensed & Insured' },
    { id: 'card-3', value: 100, duration: 1500, suffix: '%', description: 'Customer Satisfaction Rate', highlight: 'Every Job Guaranteed' },
    { id: 'card-4', value: 24, duration: 1000, suffix: '/7', description: 'Emergency Service Availability', highlight: 'Ready When You Need Us Most' },
];

export function Advantages() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
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
            if (wrapperRect.top > 0 || wrapperRect.bottom < window.innerHeight) return;

            const scrollDistance = stickyWrapper.offsetHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, (-wrapperRect.top) / scrollDistance));
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
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
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
        }, { threshold: 0.5 });
        
        statCardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

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


    return (
        <section className="bg-gradient-to-b from-[#e0f7fa] via-[#b3e5fc] to-[#d1e5f0] overflow-x-hidden">
            {/* Hero Section */}
            <div className="min-h-screen flex items-center relative bg-[radial-gradient(circle_at_20%_80%,rgba(91,157,255,0.1)_0%,transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(91,157,255,0.1)_0%,transparent_50%)]">
                <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start max-w-7xl mx-auto px-5 py-10 w-full z-10">
                    <div className="max-w-xl animate-fade-in-slide">
                        <p className="flex items-center text-sm font-semibold tracking-widest text-gray-500 uppercase mb-5">
                            <span className="text-lg font-bold text-blue-500 mr-2">•</span>Why Choose Alpine Tech
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight mb-6" style={{animationDelay: '0.2s'}}>Your Trusted Partner For Total Comfort</h1>
                        <p className="text-lg text-gray-600" style={{animationDelay: '0.4s'}}>Experience unmatched HVAC expertise with over a decade of proven reliability, cutting-edge solutions, and customer-first service that keeps your home comfortable year-round.</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-5 animate-fade-in-slide md:min-w-[320px]" style={{animationDelay: '0.6s'}}>
                        <div 
                            className="bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg shadow-blue-500/10 transition-all duration-300 cursor-pointer w-full text-center hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
                            onClick={() => setIsPopupOpen(true)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsPopupOpen(true)}
                            tabIndex={0}
                            role="button"
                        >
                            <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">Meet Our Expert Team</div>
                            <div className="flex items-center justify-center relative mb-4">
                                {teamMembers.slice(0, 3).map((member, index) => (
                                    <Image key={member.name} src={member.src} data-ai-hint={member.hint} alt={member.name} width={44} height={44} className="rounded-full border-2 border-white -ml-2 first:ml-0 hover:scale-110 transition-transform cursor-pointer shadow-md" />
                                ))}
                                <div className="w-11 h-11 rounded-full border-2 border-white -ml-2 bg-gradient-to-br from-blue-500 to-blue-400 text-white flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110 transition-transform shadow-md">
                                    +9
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-xs text-gray-500 font-medium">
                                <div className="flex items-center gap-2"><span className="font-bold text-blue-500">12</span><span>Certified Technicians</span></div>
                                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                <div className="flex items-center gap-2"><span className="font-bold text-blue-500">13+</span><span>Years Experience</span></div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Team Popup */}
            {isPopupOpen && (
                 <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] flex items-center justify-center"
                    onClick={() => setIsPopupOpen(false)}
                 >
                    <div 
                        className="bg-white rounded-2xl p-6 md:p-10 w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in-0 zoom-in-95"
                        onClick={e => e.stopPropagation()}
                    >
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={() => setIsPopupOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Meet Our Expert Team</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center p-4 rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1">
                                    <Image src={member.src} data-ai-hint={member.hint} alt={member.name} width={90} height={90} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-4 border-blue-500 mb-4" />
                                    <h4 className="font-semibold text-sm md:text-base">{member.name}</h4>
                                    <p className="text-gray-500 text-xs md:text-sm">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            )}

            {/* Stats Section */}
            <div className="relative">
                <div ref={stickyWrapperRef} className="h-[400vh] relative">
                    <div className="sticky top-0 h-screen w-full overflow-hidden bg-white/80 backdrop-blur-xl border-y border-white/70">
                        <div className="absolute top-10 left-10 z-10">
                            <p className="flex items-center text-xs font-bold text-blue-500 tracking-wider uppercase"><span className="w-8 h-0.5 bg-blue-500 mr-3"></span>Our Track Record</p>
                            <h3 className="text-2xl font-bold text-gray-800">Proven Excellence</h3>
                        </div>
                        <div ref={filmStripRef} className="flex h-full w-[400%]">
                            {stats.map((stat, index) => (
                                <div key={stat.id} id={stat.id} ref={el => statCardsRef.current[index] = el} className="w-1/4 h-full flex flex-col justify-center items-center p-5 text-center relative">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,157,255,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 stat-bg"></div>
                                    <span className="stat-number text-6xl md:text-8xl lg:text-9xl text-blue-500 font-bold leading-none z-10">{stat.value > 0 ? `0${stat.suffix}`: `0` }</span>
                                    <p className="stat-description text-gray-800 font-semibold text-sm md:text-base tracking-wider uppercase max-w-sm mt-6 opacity-0 transform translate-y-5 transition-all duration-700 delay-300 z-10">
                                        {stat.description}
                                        <span className="block text-blue-500 font-bold mt-2 text-xs">{stat.highlight}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                            {stats.map((_, index) => (
                                <div key={`dot-${index}`} ref={el => progressDotsRef.current[index] = el} className="w-2.5 h-2.5 rounded-full bg-blue-200 transition-all duration-300"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .is-active .stat-description {
                    opacity: 0.9;
                    transform: translateY(0);
                }
                .is-active .stat-bg {
                    opacity: 1;
                }
                .progress-dot.active {
                    background-color: #5B9DFF;
                    transform: scale(1.2);
                }
            `}</style>
        </section>
    );
}
