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
    { id: 'card-1', value: 13, duration: 1200, suffix: '', description: 'YEARS OF PROVEN HVAC EXPERTISE & RELIABILITY' },
    { id: 'card-2', value: 12, duration: 1500, suffix: '+', description: 'EXPERIENCED TECHNICIANS DEDICATED TO QUALITY' },
    { id: 'card-3', value: 100, duration: 1500, suffix: '%', description: 'COMMITMENT TO CUSTOMER SATISFACTION ON EVERY JOB' },
    { id: 'card-4', value: 2012, duration: 1000, suffix: '', description: 'TRUSTED PARTNERS WITH THE GREE BRAND SINCE 2012' },
];


export function Advantages() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    // Refs for scroll animations
    const stickyWrapperRef = useRef<HTMLDivElement>(null);
    const filmStripRef = useRef<HTMLDivElement>(null);
    const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const stickyWrapper = stickyWrapperRef.current;
            const filmStrip = filmStripRef.current;
            if (!stickyWrapper || !filmStrip) return;

            const wrapperRect = stickyWrapper.getBoundingClientRect();
            // Only run animation when the wrapper is in the viewport vertically
            if (wrapperRect.top > 0 || wrapperRect.bottom < window.innerHeight) return;

            const scrollDistance = stickyWrapper.offsetHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, (-wrapperRect.top) / scrollDistance));

            const numCards = stats.length;
            const moveDistance = filmStrip.offsetWidth / numCards * (numCards - 1);
            filmStrip.style.transform = `translateX(${-scrollProgress * moveDistance}px)`;
            
            const activeCardIndex = Math.floor(scrollProgress * (numCards - 0.001));

            statCardsRef.current.forEach((card, index) => {
                if (card) {
                    card.classList.toggle('is-active', index === activeCardIndex);
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Number animation logic
    useEffect(() => {
        const animateValue = (obj: HTMLElement, start: number, end: number, duration: number, suffix: string) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Ease-out quad
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

    return (
        <section className="bg-gradient-to-b from-[#e0f7fa] to-[#d1e5f0]">
            <header className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-16 md:py-20 flex flex-col md:flex-row justify-between items-start gap-4">
                <p className="text-gray-500 font-bold text-sm tracking-wider uppercase">
                    <span className="text-[#5B9DFF] text-xl align-[-0.2em] mr-2">•</span>WHY CHOOSE ALPINE TECH
                </p>
                <div className="text-left md:text-right">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">Your Trusted Partner<br/>For Total Comfort</h2>
                    <div className="flex justify-start md:justify-end items-center mt-4" onMouseEnter={() => setIsPopupOpen(true)} onClick={() => setIsPopupOpen(true)}>
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <Image key={member.name} src={member.src} data-ai-hint={member.hint} alt={member.name} width={44} height={44} className="rounded-full border-2 border-[#e0f7fa] -ml-4 first:ml-0 hover:scale-110 transition-transform cursor-pointer" />
                        ))}
                         <div className="w-11 h-11 rounded-full border-2 border-[#e0f7fa] -ml-4 bg-[#5B9DFF] text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-110 transition-transform">
                            +12
                        </div>
                    </div>
                </div>
            </header>

            {isPopupOpen && (
                 <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center"
                    onClick={() => setIsPopupOpen(false)}
                 >
                    <div 
                        className="bg-white rounded-2xl p-5 md:p-10 max-w-[90vw] md:max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={() => setIsPopupOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Meet Our Expert Team</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Image src={member.src} data-ai-hint={member.hint} alt={member.name} width={100} height={100} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-4 border-[#5B9DFF] mb-3" />
                                    <h4 className="font-semibold text-sm md:text-base">{member.name}</h4>
                                    <p className="text-gray-500 text-xs md:text-sm">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            )}

            <div ref={stickyWrapperRef} className="h-[350vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-white/50 backdrop-blur-xl border-y border-white/70">
                    <div ref={filmStripRef} className="flex h-full w-[400%]">
                        {stats.map((stat, index) => (
                            <div key={stat.id} id={stat.id} ref={el => statCardsRef.current[index] = el} className="w-1/4 h-full flex flex-col justify-center items-center p-5 text-center">
                                <span className="stat-number text-6xl md:text-9xl lg:text-[128px] text-[#5B9DFF] font-bold leading-none">{stat.value > 0 ? `0${stat.suffix}`: `0` }</span>
                                <p className="stat-description text-gray-800 font-semibold text-xs md:text-sm tracking-wider uppercase max-w-xs mt-4 opacity-0 transform translate-y-5 transition-all duration-700 delay-300">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .is-active .stat-description {
                    opacity: 0.8;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
}
