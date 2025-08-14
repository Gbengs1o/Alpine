import Image from 'next/image';

const projects = [
  {
    title: "Raumplus",
    category: "VRF Unit Installation",
    image: "https://placehold.co/600x400.png",
    hint: "office building"
  },
  {
    title: "Braithwaite Memorial Hospital, PHC",
    category: "VRF Unit Supply & Installation",
    image: "https://placehold.co/600x400.png",
    hint: "hospital exterior"
  },
  {
    title: "KAPHUB",
    category: "Ceiling Concealed & RAC Installation",
    image: "https://placehold.co/600x400.png",
    hint: "modern office"
  },
  {
    title: "BABCOCK University MRI Room",
    category: "Ceiling Concealed Units",
    image: "https://placehold.co/600x400.png",
    hint: "university building"
  },
  {
    title: "Ashaka Cement, Gombe",
    category: "VRF Unit Installation",
    image: "https://placehold.co/600x400.png",
    hint: "industrial factory"
  },
  {
    title: "St. Jude's Anglican Church, Magodo",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "church building"
  },
  {
    title: "Terrakulture Arena, VI, Lagos",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "event center"
  },
  {
    title: "RCCG, Throne of Grace",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "prayer pavilion"
  },
  {
    title: "Eko Theater (Multiple Locations)",
    category: "Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "movie theater"
  },
  {
    title: "U-Turn Events Centre",
    category: "Light Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "events hall"
  },
  {
    title: "Crown Pavilion, Agege",
    category: "Residential",
    image: "https://placehold.co/600x400.png",
    hint: "modern house"
  },
  {
    title: "Ashydale Hotel, Ijebu Ode",
    category: "Light Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "hotel exterior"
  },
  {
    title: "Sugarland Hotel, Ikotun",
    category: "Light Commercial",
    image: "https://placehold.co/600x400.png",
    hint: "luxury hotel"
  },
  {
    title: "The AHI Residence",
    category: "Residential",
    image: "https://placehold.co/600x400.png",
    hint: "apartment building"
  },
  {
    title: "Premier Hotel & Resort",
    category: "RAC Supply & Installation",
    image: "https://placehold.co/600x400.png",
    hint: "beach resort"
  },
];

export function PortfolioGallery() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
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
