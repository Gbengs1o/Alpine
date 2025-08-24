"use client";

import Link from 'next/link';

// No changes to types or data
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

// We still duplicate the projects for the CSS animation to be seamless
const duplicatedProjects = [...projects, ...projects];

function ProjectCard({ title, category, description, image }: Project) {
    return (
        <div
            className="project-card group relative flex-none rounded-lg overflow-hidden flex items-end bg-cover bg-center border
                       h-[350px] sm:h-[400px] md:h-[450px]
                       w-[280px] sm:w-[320px] md:w-[400px]
                       mr-3 sm:mr-4 md:mr-6"
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


// FIXED: Renamed component to PascalCase
export default function ServiceGallery() {
    return (
        <section
            id="portfolio"
            className="w-full text-white py-12 sm:py-16 md:py-20 relative overflow-hidden"
            style={{ 
              backgroundColor: "#0d1117",
              backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')"
            }}
        >
            {/* Added CSS keyframes animation */}
            <style jsx>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }

                .slider-track {
                    /* The animation moves the entire duplicated track by 100% of its own width. 
                       Since the track is 2x the width of one set of cards, this moves it exactly
                       one set's width to the left, creating a perfect loop. */
                    animation: scroll 60s linear infinite;
                }

                .slider-viewport:hover .slider-track {
                    animation-play-state: paused;
                }
            `}</style>
            
            
            <div
                className="slider-viewport" // Renamed for clarity
                style={{ 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
                }}
            >
                {/* REMOVED all refs and JS-based animation logic. Now it's pure CSS. */}
                <div className="flex slider-track">
                    {duplicatedProjects.map((project, index) => (
                        // FIXED: Using a more robust key
                        <ProjectCard key={`${project.title}-${index}`} {...project} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-4">
                <Link href="/portfolio">
                    <button className="bg-blue-600 text-white font-semibold px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base" 
                            style={{boxShadow: '0 4px 14px 0 rgba(93, 153, 247, 0.39)'}}>
                        View More Projects
                    </button>
                </Link>
            </div>
        </section>
    );
}