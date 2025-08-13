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

const duplicatedProjects = [...projects, ...projects];

function ProjectCard({ title, category, description, image }: Project) {
    return (
        <div
            className="project-card group relative h-[450px] flex-none rounded-lg overflow-hidden flex items-end bg-cover bg-center border"
            style={{ 
              backgroundImage: `url(${image})`,
              borderColor: '#30363d',
              flex: '0 0 32%',
              marginRight: '2%',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></div>
            <div className="relative z-10 p-6 md:p-8 text-white">
                <span className="project-category inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: '#5d99f7', color: '#f0f6fc'}}>
                    {category}
                </span>
                <h3 className="project-title text-2xl font-bold leading-tight mb-2">
                    {title}
                </h3>
                <p className="project-description text-sm leading-relaxed" style={{color: '#c9d1d9'}}>
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
        if (!trackRef.current) return;
        trackRef.current.style.transform = `translateX(${parseFloat(getComputedStyle(trackRef.current).transform.split(',')[4] || '0') - 1}px)`;

        const cardWidth = trackRef.current.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(trackRef.current.children[0]).marginRight);
        const scrollWidth = cardWidth * projects.length;

        if (Math.abs(parseFloat(getComputedStyle(trackRef.current).transform.split(',')[4] || '0')) >= scrollWidth) {
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
            className="w-full text-white py-20 relative overflow-hidden"
            style={{ 
              backgroundColor: "#0d1117",
              backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')"
            }}
        >
            <div className="w-[90%] max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-16">
                    <a href="#portfolio" className="inline-flex items-center gap-2 text-xs font-bold tracking-wider mb-6" style={{color: "#c9d1d9"}}>
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: "#5d99f7"}}></span>
                        OUR PORTFOLIO
                    </a>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        A Showcase<br />Of Our Work
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{color: "#c9d1d9"}}>
                        From large-scale commercial VRF systems to residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects.
                    </p>
                </div>
            </div>

            <div
                ref={viewportRef}
                className="slider-viewport"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
                <div ref={trackRef} className="flex will-change-transform">
                    {duplicatedProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-8 md:mt-16">
                <Link href="/portfolio" passHref>
                    <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300" style={{boxShadow: '0 4px 14px 0 rgba(93, 153, 247, 0.39)'}}>
                        View More Projects
                    </button>
                </Link>
            </div>
        </section>
    );
}
