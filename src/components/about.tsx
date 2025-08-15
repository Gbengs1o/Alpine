
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Award, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Custom hook to detect when an element is in the viewport.
 * Used for triggering scroll-based animations.
 */
const useScrollAnimation = (options?: IntersectionObserverInit) => {
    const [isInView, setIsInView] = React.useState(false);
    const ref = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1, ...options }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return { ref, isInView };
};

export default function About() {
    const { ref, isInView } = useScrollAnimation();

    const getAnimClass = (baseClass: string = '') => {
      return `transition-all ease-out duration-1000 ${baseClass} ${isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`;
    };

    return (
        <section
            id="about"
            ref={ref}
            className="w-full overflow-hidden py-20 md:py-28 lg:py-32 bg-[#f8f9fa] text-[#212529]"
        >
            <div className="container px-4 md:px-6">
                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
                    
                    <div className="flex flex-col space-y-8">
                        <div className={getAnimClass('')} style={{transitionDelay: `0ms`}}>
                            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#212529]">
                                <span className="h-2 w-2 rounded-full bg-[#5d99f7]" />
                                WHO WE ARE
                            </div>
                        </div>

                        <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${getAnimClass('')}`} style={{transitionDelay: `100ms`}}>
                            Your Peak of Comfort, Built on a Foundation of Trust.
                        </h2>
                        
                        <p className={`max-w-[600px] text-[#6c757d] text-lg leading-relaxed ${getAnimClass('')}`} style={{transitionDelay: `200ms`}}>
                            <span className="relative group">
                                <Link href="/mountain" className="font-bold text-[#5d99f7] hover:underline underline-offset-4 decoration-2">
                                    Alpine
                                </Link>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-[#212529] text-white text-xs font-semibold rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none invisible group-hover:visible">
                                    Click to learn more about our story
                                    <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#212529]"></span>
                                </span>
                            </span>
                            {' '}Tech isn't just a service; it's a promise of reliability. We combine top-tier technology with a team that's genuinely dedicated to ensuring your comfort and complete satisfaction.
                        </p>

                        <ul className="space-y-4 text-base">
                            <li className={`flex items-start gap-4 ${getAnimClass('')}`} style={{transitionDelay: `300ms`}}>
                                <div className="mt-1 flex-shrink-0 rounded-full bg-blue-100 p-2"><Award className="h-5 w-5 text-[#5d99f7]" /></div>
                                <div><strong className="font-semibold text-[#212529]">13+ Years of Proven Experience:</strong><span className="text-[#6c757d]"> A long history of delivering lasting HVAC solutions.</span></div>
                            </li>
                            <li className={`flex items-start gap-4 ${getAnimClass('')}`} style={{transitionDelay: `400ms`}}>
                                <div className="mt-1 flex-shrink-0 rounded-full bg-blue-100 p-2"><Users className="h-5 w-5 text-[#5d99f7]" /></div>
                                <div><strong className="font-semibold text-[#212529]">12+ Dedicated Technicians:</strong><span className="text-[#6c757d]"> A skilled, professional team ready to tackle any challenge.</span></div>
                            </li>
                            <li className={`flex items-start gap-4 ${getAnimClass('')}`} style={{transitionDelay: `500ms`}}>
                                <div className="mt-1 flex-shrink-0 rounded-full bg-green-100 p-2"><Leaf className="h-5 w-5 text-green-600" /></div>
                                <div><strong className="font-semibold text-[#212529]">100% Eco-Friendly Focus:</strong><span className="text-[#6c757d]"> Committed to sustainable practices and energy efficiency.</span></div>
                            </li>
                        </ul>

                        <div className={`pt-4 ${getAnimClass('')}`} style={{transitionDelay: `700ms`}}>
                            <Button asChild size="lg" className="bg-[#5d99f7] text-white hover:bg-[#4a88e5]">
                                <Link href="/about">
                                    Discover Our Full Story
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    
                    <div className="h-full w-full">
                        <div className="sticky top-28">
                             <div className={`relative w-full max-w-lg mx-auto ${getAnimClass('')}`} style={{transitionDelay: `300ms`}}>
                                <div className="absolute -inset-2.5 bg-gradient-to-r from-[#5d99f7] to-blue-400 rounded-2xl opacity-20 blur-xl transition-opacity duration-500" />
                                <Image
                                    src="https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/3-1.jpg"
                                    data-ai-hint="professional hvac technician smiling at a worksite"
                                    width={600}
                                    height={450}
                                    alt="A smiling, professional technician from the Alpine Tech HVAC Team"
                                    className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-2xl object-cover object-center shadow-xl border-4 border-white"
                                />
                                <div className="absolute bottom-5 right-5 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg text-right transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
                                    <div className="font-bold text-lg text-[#212529]">Alpine Tech</div>
                                    <div className="text-sm text-[#6c757d]">13 Years of Excellence</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
