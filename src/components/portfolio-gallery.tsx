"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const projects = [
  // --- Existing Projects with Updated Images ---
  {
    title: "Raumplus",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0022.jpg",
    hint: "office building"
  },
  {
    title: "Braithwaite Memorial Hospital, PHC",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/Generate-an-image-offff.png",
    hint: "hospital exterior"
  },
  {
    title: "KAPHUB",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0013.jpg",
    hint: "modern office"
  },
  {
    title: "BABCOCK University MRI Room",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/22.jpg",
    hint: "university building"
  },
  {
    title: "Ashaka Cement, Gombe",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/27.jpg",
    hint: "industrial factory"
  },
  {
    title: "St. Jude's Anglican Church, Magodo",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0014.jpg",
    hint: "church building"
  },
  {
    title: "Terrakulture Arena, VI, Lagos",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0015.jpg",
    hint: "event center"
  },
  {
    title: "RCCG, Throne of Grace",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0016.jpg",
    hint: "prayer pavilion"
  },
  {
    title: "Eko Theater (Multiple Locations)",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/18.jpg",
    hint: "movie theater"
  },
  {
    title: "U-Turn Events Centre",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0017.jpg",
    hint: "events hall"
  },
  {
    title: "Crown Pavilion, Agege",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0018.jpg",
    hint: "modern house"
  },
  {
    title: "Ashydale Hotel, Ijebu Ode",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0019.jpg",
    hint: "hotel exterior"
  },
  {
    title: "Sugarland Hotel, Ikotun",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0020.jpg",
    hint: "luxury hotel"
  },
  {
    title: "The AHI Residence",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/36.jpg",
    hint: "apartment building"
  },
  {
    title: "Premier Hotel & Resort",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0012.jpg",
    hint: "beach resort"
  },

  // --- New Projects Added from Your Links ---
  {
    title: "Commercial Ducting Work",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0006.jpg",
    hint: "ducting"
  },
  {
    title: "Office Ceiling Unit",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0007.jpg",
    hint: "ceiling unit"
  },
  {
    title: "VRF Outdoor Condensers",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0004.jpg",
    hint: "outdoor units"
  },
  {
    title: "Large Scale VRF Installation",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250820-WA0005.jpg",
    hint: "commercial building"
  },
  {
    title: "Residential Wall Unit",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0084.jpg",
    hint: "indoor AC"
  },
  {
    title: "New Home A/C Installation",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0085.jpg",
    hint: "new installation"
  },
  {
    title: "Piping and Infrastructure",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0082.jpg",
    hint: "HVAC piping"
  },
  {
    title: "Commercial Site Prep",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0083.jpg",
    hint: "construction site"
  },
  {
    title: "System Drawing & Plans",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0031.jpg",
    hint: "technical drawing"
  },
  {
    title: "HVAC System Blueprint",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0028.jpg",
    hint: "blueprint"
  },
  {
    title: "Industrial Cooling System",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0079.jpg",
    hint: "industrial cooling"
  },
  {
    title: "Multi-Unit Residential",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0080.jpg",
    hint: "apartment block"
  },
  {
    title: "Retail Space HVAC",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0081.jpg",
    hint: "retail store"
  },
  {
    title: "Complex Piping Network",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0075.jpg",
    hint: "copper pipes"
  },
  {
    title: "Ceiling Concealed Unit",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0076.jpg",
    hint: "ceiling unit"
  },
  {
    title: "VRF System Installation",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0077.jpg",
    hint: "VRF system"
  },
  {
    title: "Outdoor Unit Placement",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0078.jpg",
    hint: "outdoor condenser"
  },
  {
    title: "Office Building Rooftop Units",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0073.jpg",
    hint: "rooftop units"
  },
  {
    title: "Multiple Condenser Setup",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0074.jpg",
    hint: "condenser bank"
  },
  {
    title: "Work in Progress",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0071.jpg",
    hint: "installation"
  },
  {
    title: "Ducting and Ventilation",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0072.jpg",
    hint: "ventilation"
  },
  {
    title: "Commercial Unit Servicing",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0068.jpg",
    hint: "servicing"
  },
  {
    title: "Interior Unit Installation",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0069.jpg",
    hint: "indoor unit"
  },
  {
    title: "Hotel Room A/C",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0070.jpg",
    hint: "hotel AC"
  },
  {
    title: "Outdoor VRF System",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0064.jpg",
    hint: "outdoor VRF"
  },
  {
    title: "Commercial Rooftop Installation",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0065.jpg",
    hint: "rooftop unit"
  },
  {
    title: "Multi-story Building Project",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0066.jpg",
    hint: "large building"
  },
  {
    title: "Corporate Office Cooling",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0067.jpg",
    hint: "office exterior"
  },
  {
    title: "Piping Network Detail",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0059.jpg",
    hint: "pipe detail"
  },
  {
    title: "Precision Installation",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0060.jpg",
    hint: "precision work"
  },
  {
    title: "Residential Outdoor Unit",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0061-1.jpg",
    hint: "home condenser"
  },
  {
    title: "A/C Unit on Stand",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0062.jpg",
    hint: "AC stand"
  },
  {
    title: "Wall-Mounted Condenser",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0063.jpg",
    hint: "wall mount"
  },
  {
    title: "Office Space Interior Unit",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0053.jpg",
    hint: "office interior"
  },
  {
    title: "Commercial Building Exterior",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0054.jpg",
    hint: "building exterior"
  },
  {
    title: "High-Capacity Outdoor Unit",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0055.jpg",
    hint: "large condenser"
  },
  {
    title: "Rooftop Piping Infrastructure",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0057.jpg",
    hint: "rooftop pipes"
  },
  {
    title: "Ground Level Condensers",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0048.jpg",
    hint: "ground units"
  },
  {
    title: "Commercial System Installation",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0050.jpg",
    hint: "system installation"
  },
  {
    title: "Multi-unit VRF Project",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0051.jpg",
    hint: "VRF project"
  },
  {
    title: "Bank of Outdoor Units",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0052.jpg",
    hint: "multiple units"
  },
  {
    title: "Interior Piping Work",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0045.jpg",
    hint: "interior pipes"
  },
  {
    title: "Warehouse Cooling System",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0046.jpg",
    hint: "warehouse"
  },
  {
    title: "Building-wide AC System",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0047.jpg",
    hint: "AC system"
  },
  {
    title: "Ventilation Ducting",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0040.jpg",
    hint: "ducting"
  },
  {
    title: "Cassette Unit Installation",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0041.jpg",
    hint: "cassette unit"
  },
  {
    title: "Exposed Ductwork",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0042.jpg",
    hint: "ductwork"
  },
  {
    title: "Ceiling Infrastructure",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0043.jpg",
    hint: "ceiling"
  },
  {
    title: "Commercial Interior",
    category: "Light Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0044.jpg",
    hint: "commercial interior"
  },
  {
    title: "Outdoor Unit Assembly",
    category: "VRF",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0036.jpg",
    hint: "assembly"
  },
  {
    title: "Piping and Wiring",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0037.jpg",
    hint: "wiring"
  },
  {
    title: "Site Installation",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0038.jpg",
    hint: "on site"
  },
  {
    title: "Large Commercial Project",
    category: "Commercial",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0039.jpg",
    hint: "large project"
  },
  {
    title: "Residential Outdoor Setup",
    category: "Residential",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0033.jpg",
    hint: "residential setup"
  },
  {
    title: "Final Connections",
    category: "Installation",
    image: "https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/IMG-20250819-WA0029.jpg",
    hint: "final connections"
  }
];

const categories = ["All", "VRF", "Commercial", "Residential", "Light Commercial", "Installation"];

export function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory, projects]); // Added projects to dependency array

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-full transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className={cn(
                "group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-slide"
              )}
               style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  data-ai-hint={project.hint}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}