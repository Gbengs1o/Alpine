"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
    const [lottieSrc, setLottieSrc] = useState(servicesData[0].lottieSrc);
    const [isDesktop, setIsDesktop] = useState(true);
    const lottieContainerRef = useRef<HTMLDivElement>(null);
    const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 991);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        const container = lottieContainerRef.current;
        if (container) {
            container.style.opacity = '0';
            setTimeout(() => {
                setLottieSrc(servicesData[activeIndex].lottieSrc);
                container.style.opacity = '1';
            }, 150);
        }
    }, [activeIndex]);

    const handleInteraction = (index: number) => {
        if (!isDesktop && activeIndex === index) {
            setActiveIndex(-1); // Collapse on mobile if clicking the same item
        } else {
            setActiveIndex(index);
        }
    };
    
    return (
        <section className="bg-[#f0f4f8] md:py-12">
            <div className="max-w-7xl mx-auto my-8 md:my-12 bg-white md:p-20 p-5 relative overflow-hidden md:shadow-lg md:rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:gap-20">
                    <div className="md:flex-1 md:min-w-[45%] order-1 md:order-1 p-5 md:p-0">
                        <div ref={lottieContainerRef} className="w-full transition-opacity duration-300">
                           {lottieSrc && (
                             <dotlottie-wc
                                 src={lottieSrc}
                                 style={{ width: '100%', height: 'auto' }}
                                 speed="1"
                                 autoplay
                                 loop
                                 controls={false}
                             />
                           )}
                        </div>
                    </div>
                    <div className="md:flex-1 md:min-w-[50%] order-2 md:order-2">
                        <div className="hidden md:block">
                            <p className="flex items-center text-sm font-bold tracking-wider text-gray-600 uppercase mb-5">
                                <span className="text-lg font-bold text-[#5B9DFF] mr-2">•</span>OUR SERVICES
                            </p>
                            <h2 className="text-5xl font-bold leading-tight mb-5 text-gray-800">Comprehensive<br/>HVAC Solutions</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-10">
                                From sourcing and installation to repairs and ongoing maintenance, we provide end-to-end solutions for residential and commercial clients.
                            </p>
                        </div>

                        <div className="border-t border-gray-200">
                            {servicesData.map((service, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button 
                                        key={service.title}
                                        className={cn(
                                            "w-full py-6 text-left border-b border-gray-200 transition-colors duration-300",
                                            { "border-b-[#5B9DFF]": isActive }
                                        )}
                                        onClick={() => isDesktop ? null : handleInteraction(index)}
                                        onMouseEnter={() => isDesktop ? setActiveIndex(index) : null}
                                        aria-expanded={isActive}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className={cn(
                                                "text-xl md:text-2xl font-semibold text-gray-400 transition-colors duration-300",
                                                { "text-black": isActive }
                                            )}>
                                                {service.title}
                                            </h3>
                                            <div className={cn(
                                                "flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-gray-300 text-gray-400 text-2xl transition-all duration-300",
                                                { "bg-[#5B9DFF] border-[#5B9DFF] text-white": isActive }
                                            )}>
                                                <span>→</span>
                                            </div>
                                        </div>
                                        <div 
                                            className="overflow-hidden transition-all duration-400 ease-in-out"
                                            style={{
                                                maxHeight: isActive ? `${descriptionRefs.current[index]?.scrollHeight ?? 0}px` : '0px',
                                                opacity: isActive ? 1 : 0,
                                                marginTop: isActive ? '15px' : '0'
                                            }}
                                        >
                                            <p 
                                                ref={el => descriptionRefs.current[index] = el}
                                                className="text-gray-600 text-base leading-relaxed pr-0 md:pr-14"
                                            >
                                                {service.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="hidden md:block absolute bottom-0 left-0 w-full h-[120px] bg-[url('https://i.imgur.com/gO07v1h.png')] bg-repeat-x bg-bottom bg-auto z-10" />
            </div>
        </section>
    );
}
