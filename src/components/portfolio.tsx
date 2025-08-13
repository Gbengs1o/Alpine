"use client";

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Define the type for a single project
type Project = {
    title: string;
    category: string;
    description: string;
    image: string;
};

// --- DATA SOURCE ---
// This data can come from a CMS, an API, or be static like this.
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

// Create a duplicated list for the "infinite" scroll effect
const duplicatedProjects = [...projects, ...projects];

// --- ProjectCard Sub-Component ---
function ProjectCard({ title, category, description, image }: Project) {
    return (
        <div
            className="group relative h-[450px] flex-none rounded-lg overflow-hidden flex items-end bg-cover bg-center border border-slate-700
                       w-[80%] sm:w-[48%] md:w-[32%] mr-4 md:mr-[2%]"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

            <div className="relative z-10 p-6 md:p-8 text-white">
                <span className="inline-block bg-blue-500 text-white px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
                    {category}
                </span>
                <h3 className="text-2xl font-bold leading-tight mb-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}


// --- Main Portfolio Component ---
export function Portfolio() {
    const trackRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();

    const animateScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        track.style.transition = 'none';
        const currentTransform = new DOMMatrix(getComputedStyle(track).transform).e;
        let newTransform = currentTransform - 1;

        const cardWidth = (track.children[0] as HTMLElement).offsetWidth + parseFloat(getComputedStyle(track.children[0]).marginRight);
        const scrollWidth = cardWidth * projects.length;

        if (Math.abs(newTransform) >= scrollWidth) {
            newTransform = 0;
        }

        track.style.transform = `translateX(${newTransform}px)`;
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
        return () => {
            clearTimeout(startTimeout);
            stopAutoScroll();
        };
    }, [startAutoScroll]);

    return (
        <section
            id="portfolio"
            className="w-full bg-[#0d1117] py-20 relative overflow-hidden"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')" }}
        >
            <div className="w-[90%] max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-16">
                    <a href="#portfolio" className="inline-flex items-center gap-2 text-xs font-bold tracking-wider mb-6 text-slate-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        OUR PORTFOLIO
                    </a>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                        A Showcase<br />Of Our Work
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        From large-scale commercial VRF systems to residential units, we deliver top-tier HVAC solutions. Explore some of our featured projects.
                    </p>
                </div>
            </div>

            <div
                className="slider-viewport"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
            >
                <div ref={trackRef} className="flex will-change-transform">
                    {duplicatedProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-8 md:mt-16">
                <Link href="/portfolio" passHref>
                    <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300">
                        View More Projects
                    </button>
                </Link>
            </div>
        </section>
    );
}
