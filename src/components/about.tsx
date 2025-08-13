import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const timelineData = [
    {
        year: "2011 - Our Foundation",
        description: "With 13 years of practice, Alpine Tech was founded on a mission to deliver affordable, high-quality air conditioning solutions across Lagos."
    },
    {
        year: "2012 - A Key Partnership",
        description: "We became official partners with the GREE brand, allowing us to procure and deploy world-class, eco-friendly HVAC equipment for our clients."
    },
    {
        year: "Today - A Trusted Provider",
        description: "Now a dedicated team of over 12 experienced technicians, we are a trusted name for residential and commercial HVAC services, committed to 100% customer satisfaction."
    }
];


export function About() {
  return (
    <section id="about" className="bg-[#f0f4f8] py-16 px-4 md:py-20 lg:py-28">
      <div className="container max-w-6xl mx-auto">
        <header className="mb-10 text-left md:mb-16">
            <p className="flex items-center text-xs font-bold tracking-wider text-gray-600 uppercase md:text-sm">
                <span className="text-lg font-bold text-blue-500 mr-2">•</span>WHO WE ARE
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl leading-tight">
                Delivering Comfort, Built on Trust.
            </h2>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:gap-16">
                
                <div className="text-center lg:text-left lg:w-80 lg:flex-none lg:sticky lg:top-28 self-start">
                    <Image
                        src="https://placehold.co/110x110.png"
                        data-ai-hint="team portrait"
                        alt="Alpine Tech HVAC services team"
                        width={110}
                        height={110}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#f0f4f8] mx-auto lg:mx-0 mb-4"
                    />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">About Alpine Tech</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        <Link href="#" className="text-blue-500 font-semibold border-b border-blue-500/40 hover:text-gray-800 hover:border-gray-800 transition-colors">Alpine</Link> Tech is a professional company offering dependable residential and commercial <Link href="#" className="text-blue-500 font-semibold border-b border-blue-500/40 hover:text-gray-800 hover:border-gray-800 transition-colors">HVAC</Link> services. We handle everything from supply and installation to repair and maintenance, all backed by exceptional customer service.
                    </p>
                </div>

                <div className="flex-1 mt-8 lg:mt-0">
                    <div className="border-t-2 lg:border-t-0 border-[#f0f4f8] pt-8 lg:pt-0">
                        {timelineData.map((item, index) => (
                            <div key={item.year} className="relative pl-9 pb-6 last:pb-0">
                                <div className="absolute left-0 top-1 w-3.5 h-3.5 bg-blue-500 rounded-full ring-4 ring-white"></div>
                                {index < timelineData.length - 1 && (
                                     <div className="absolute left-[6px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-gray-200"></div>
                                )}
                                <h4 className="text-base md:text-lg font-bold text-gray-800 mb-2">{item.year}</h4>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t-2 border-[#f0f4f8] lg:border-t-0 text-center lg:text-left">
                        <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
                            <Link href="#">Learn Our Full Story</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
}
