"use client";

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

type Project = {
    title: string;
    category: string;
    description: string;
    image: string;
};

const projects: Project[] = [
    {
        title: "Braithwaite Memorial Hospital",
        category: "Commercial / VRF",
        description: "Complete supply and installation of a state-of-the-art VRF system for a critical healthcare environment.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/Generate-an-image-offff.png"
    },
    {
        title: "Ashaka Cement, Gombe",
        category: "Industrial / VRF",
        description: "Installation of a robust VRF unit system to ensure climate control in a demanding industrial facility.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/27.jpg"
    },
    {
        title: "BABCOCK University MRI Room",
        category: "Specialized / Concealed Units",
        description: "Precision supply and installation of ceiling concealed units for a temperature-sensitive MRI room.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/22.jpg"
    },
    {
        title: "Eko Theater Project",
        category: "Commercial",
        description: "Multi-location deployment for Eko Theater branches in Oregun, Igando, Epe, and Badagry.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/18.jpg"
    },
    {
        title: "The AHI Residence",
        category: "Residential",
        description: "High-end residential air conditioning solution, focusing on comfort, efficiency, and aesthetics.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/36.jpg"
    },
    {
        title: "KAPHUB",
        category: "Industrial",
        description: "Large-scale HVAC system implementation.",
        image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/17.jpg"
    }
];

const duplicatedProjects = [...projects, ...projects];

function ProjectCard({ title, category, description, image }: Project) {
    return (
        <div
            className="project-card group relative flex-none rounded-lg overflow-hidden flex items-end bg-cover bg-center border
                       h-[350px] sm:h-[400px] md:h-[450px]
                       w-[280px] sm:w-[320px] md:w-[400px] lg:w-[32%]
                       mr-3 sm:mr-4 md:mr-6 lg:mr-[2%]"
            style={{ 
              backgroundImage: `url(${image})`,
              borderColor: '#30363d',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></div>
            <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8 text-white">
                <span className="project-category inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 md:mb-4" 
                      style={{ backgroundColor: '#5d99f7', color: '#f0f6fc'}}>
                    {category}
                </span>
                <h3 className="project-title text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-2">
                    {title}
                </h3>
                <p className="project-description text-xs sm:text-sm leading-relaxed line-clamp-3" 
                   style={{color: '#c9d1d9'}}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const trackRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();

    const animateScroll = useCallback(() => {
        if (!trackRef.current || !trackRef.current.children[0]) return;
        
        const currentTransform = parseFloat(getComputedStyle(trackRef.current).transform.split(',')[4] || '0');
        trackRef.current.style.transform = `translateX(${currentTransform - 1}px)`;

        const firstCard = trackRef.current.children[0] as HTMLElement;
        const cardWidth = firstCard.getBoundingClientRect().width;
        const cardMarginRight = parseFloat(getComputedStyle(firstCard).marginRight);
        const totalCardWidth = cardWidth + cardMarginRight;
        const scrollWidth = totalCardWidth * projects.length;

        if (Math.abs(currentTransform) >= scrollWidth) {
            trackRef.current.style.transform = 'translateX(0px)';
        }
        animationFrameId.current = requestAnimationFrame(animateScroll);
    }, []);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll();
        animationFrameId.current = requestAnimationFrame(animateScroll);
    }, [animateScroll]);

    const stopAutoScroll = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };

    useEffect(() => {
        const startTimeout = setTimeout(startAutoScroll, 100);
        const viewport = viewportRef.current;
        if(viewport) {
            viewport.addEventListener('mouseenter', stopAutoScroll);
            viewport.addEventListener('mouseleave', startAutoScroll);
        }
        return () => {
            clearTimeout(startTimeout);
            stopAutoScroll();
            if(viewport) {
                viewport.removeEventListener('mouseenter', stopAutoScroll);
                viewport.removeEventListener('mouseleave', startAutoScroll);
            }
        };
    }, [startAutoScroll]);

    return (
        <section
            id="portfolio"
            className="w-full text-white py-12 sm:py-16 md:py-20 relative overflow-hidden"
            style={{ 
              backgroundColor: "#0d1117",
              backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')"
            }}
        >
            <div className="w-[90%] max-w-7xl mx-auto">
                <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                    <a href="#portfolio" className="inline-flex items-center gap-2 text-xs font-bold tracking-wider mb-4 sm:mb-5 md:mb-6" style={{color: "#c9d1d9"}}>
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: "#5d99f7"}}></span>
                        OUR PORTFOLIO
                    </a>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6">
                        A Showcase<br />Of Our Work
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4" style={{color: "#c9d1d9"}}>
                        From large-scale commercial VRF systems to residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects.
                    </p>
                </div>
            </div>

            <div
                ref={viewportRef}
                className="slider-viewport overflow-hidden"
                style={{ 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
                }}
            >
                <div ref={trackRef} className="flex will-change-transform pl-4 sm:pl-6 md:pl-8">
                    {duplicatedProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-4">
                <Link href="/portfolio" passHref>
                    <button className="bg-blue-600 text-white font-semibold px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base" 
                            style={{boxShadow: '0 4px 14px 0 rgba(93, 153, 247, 0.39)'}}>
                        View More Projects
                    </button>
                </Link>
            </div>
        </section>
    );
}