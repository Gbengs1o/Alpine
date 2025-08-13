"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Define Lottie component type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        style?: React.CSSProperties;
        speed?: string;
        autoplay?: boolean;
        loop?: boolean;
        controls?: boolean;
      }, HTMLElement>;
    }
  }
}

const servicesData = [
    { 
        title: 'Equipment Sourcing & Supply',
        description: 'We partner with major manufacturers like GREE to procure world-class HVAC equipment at unbeatable prices for our clients.',
        lottieSrc: 'https://lottie.host/853538fb-6abe-48b6-9ff6-2ef0bea08c22/Nq1FdjK1vp.lottie'
    },
    { 
        title: 'Professional Installation',
        description: 'Our experienced team handles every aspect of installation for residential, commercial, and industrial projects, ensuring optimal energy efficiency.',
        lottieSrc: 'https://lottie.host/ec1fb587-bc15-4a0a-8eef-a5d1505da1e7/VRXlLcwxdX.lottie'
    },
    { 
        title: 'Maintenance & Repairs',
        description: "We offer flexible 'Pay As You Go' servicing and comprehensive 'Annual Service Contracts' to keep your systems running smoothly year-round.",
        lottieSrc: 'https://lottie.host/e3016043-5898-4174-837f-8713834637d4/iE0Szpx2sl.lottie'
    }
];

export function Services() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
    const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Accordion and Slider logic
    useEffect(() => {
        const handleResize = () => {
            const newIsDesktop = window.innerWidth >= 1024; // lg breakpoint
            setIsDesktop(newIsDesktop);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Accordion height logic
    useEffect(() => {
        if (isDesktop) {
            const activeDesc = descriptionRefs.current[activeIndex];
            if (activeDesc) {
                // Set height for active item
                descriptionRefs.current.forEach((desc, i) => {
                    if (desc) {
                        desc.style.maxHeight = i === activeIndex ? `${desc.scrollHeight}px` : '0px';
                    }
                });
            }
        }
    }, [activeIndex, isDesktop]);
    

    const handleDesktopInteraction = (index: number) => {
        if (isDesktop) {
            setActiveIndex(index);
        }
    };
    
    // Slider Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderTrackRef = useRef<HTMLDivElement>(null);

    const goToSlide = (slideIndex: number) => {
        const slider = sliderTrackRef.current;
        if(slider) {
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
        setCurrentSlide(slideIndex);
    };

    const nextSlide = () => {
        const newIndex = currentSlide === servicesData.length - 1 ? 0 : currentSlide + 1;
        goToSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = currentSlide === 0 ? servicesData.length - 1 : currentSlide - 1;
        goToSlide(newIndex);
    };

    const LottiePlayer = ({ src, isVisible }: { src: string; isVisible: boolean }) => (
      <div className={cn("lottie-player absolute inset-0 transition-opacity duration-300", isVisible ? "opacity-100 visible" : "opacity-0 invisible")}>
          <dotlottie-wc src={src} style={{ width: '100%', height: '100%' }} speed="1" autoplay loop />
      </div>
    );

    const DesktopLayout = () => (
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-24 items-start">
        <div className="lg:sticky top-20 h-auto lg:h-[calc(100vh-10rem)] self-start">
          <div className="relative w-full max-w-md mx-auto aspect-square bg-white/50 rounded-2xl backdrop-blur-md shadow-lg">
            {servicesData.map((service, index) => (
                <LottiePlayer key={index} src={service.lottieSrc} isVisible={activeIndex === index} />
            ))}
          </div>
        </div>
        <div className="lg:min-h-screen">
            <div className="bg-white/50 border border-white/70 rounded-2xl backdrop-blur-sm overflow-hidden">
                {servicesData.map((service, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <button 
                            key={service.title}
                            className={cn(
                                "w-full p-7 text-left border-b border-gray-200/80 transition-all duration-300 last:border-b-0",
                                { "bg-blue-500/5": isActive },
                                "hover:bg-blue-500/5"
                            )}
                            onMouseEnter={() => handleDesktopInteraction(index)}
                            aria-expanded={isActive}
                        >
                            <div className="flex justify-between items-center gap-4">
                                <h3 className={cn(
                                    "text-xl md:text-2xl font-semibold text-gray-400 transition-colors duration-300",
                                    { "text-gray-800": isActive }
                                )}>
                                    {service.title}
                                </h3>
                                <div className={cn(
                                    "flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-gray-300 bg-white/80 transition-all duration-300",
                                    { "bg-blue-500 border-blue-500 shadow-md": isActive }
                                )}>
                                    <Plus className={cn("h-6 w-6 text-gray-400 transition-transform duration-400", { "text-white rotate-45": isActive })} />
                                </div>
                            </div>
                            <div 
                                className="overflow-hidden transition-all duration-400 ease-in-out"
                                style={{
                                    maxHeight: isActive ? `${descriptionRefs.current[index]?.scrollHeight ?? 0}px` : '0px',
                                    opacity: isActive ? 1 : 0,
                                    marginTop: isActive ? '1rem' : '0'
                                }}
                            >
                                <div ref={el => descriptionRefs.current[index] = el} className="pr-16">
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {service.description}
                                    </p>
                                    <Link href="#" className="inline-block mt-4 font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                                        Learn More &rarr;
                                    </Link>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
    );

    const MobileLayout = () => (
      <div className="lg:hidden">
         <div className="overflow-hidden">
            <div ref={sliderTrackRef} className="flex transition-transform duration-500 ease-in-out">
              {servicesData.map((service, index) => (
                <div key={index} className="flex-shrink-0 w-full px-2.5">
                    <div className="relative w-full max-w-sm mx-auto aspect-square bg-white/50 rounded-2xl backdrop-blur-md shadow-lg">
                        <dotlottie-wc src={service.lottieSrc} style={{ width: '100%', height: '100%' }} speed="1" autoplay loop />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600 max-w-xs mx-auto">{service.description}</p>
                         <Link href="#" className="inline-block mt-4 font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                            Learn More &rarr;
                        </Link>
                    </div>
                </div>
              ))}
            </div>
         </div>
         <div className="flex justify-between items-center mt-8 max-w-xs mx-auto">
            <button onClick={prevSlide} aria-label="Previous service" className="p-3 rounded-full bg-white/70 border border-gray-200 shadow-sm hover:bg-white disabled:opacity-50">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex gap-2">
                {servicesData.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={cn("w-2.5 h-2.5 rounded-full transition-all", currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400')}/>
                ))}
            </div>
             <button onClick={nextSlide} aria-label="Next service" className="p-3 rounded-full bg-white/70 border border-gray-200 shadow-sm hover:bg-white disabled:opacity-50">
                <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
         </div>
      </div>
    );
    
    return (
        <section id="services" className="py-16 md:py-24 px-4 bg-gradient-to-b from-transparent to-blue-500/5">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                    <p className="flex items-center justify-center text-sm font-bold tracking-wider text-gray-600 uppercase mb-4">
                        <span className="text-lg font-bold text-blue-500 mr-2">•</span>OUR SERVICES
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800 mb-4">Comprehensive HVAC Solutions</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        From sourcing and installation to repairs and ongoing maintenance, we provide end-to-end solutions for all clients.
                    </p>
                </header>

                <div className="relative">
                    {isDesktop ? <DesktopLayout /> : <MobileLayout />}
                </div>
            </div>
        </section>
    );
}
