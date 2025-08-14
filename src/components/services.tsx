"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define the type for our custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        speed?: string;
        autoplay?: boolean;
        loop?: boolean;
      }, HTMLElement>;
    }
  }
}


const servicesSummary = [
  {
    lottieSrc: "https://lottie.host/853538fb-6abe-48b6-9ff6-2ef0bea08c22/Nq1FdjK1vp.lottie",
    title: "Equipment Sourcing",
    description: "Official partners with GREE, we supply top-tier HVAC systems at competitive prices.",
  },
  {
    lottieSrc: "https://lottie.host/ec1fb587-bc15-4a0a-8eef-a5d1505da1e7/VRXlLcwxdX.lottie",
    title: "Professional Installation",
    description: "Flawless execution for residential, commercial, and industrial projects, ensuring peak performance.",
  },
  {
    lottieSrc: "https://lottie.host/e3016043-5898-4174-837f-8713834637d4/iE0Szpx2sl.lottie",
    title: "Maintenance & Repairs",
    description: "Flexible plans and expert repairs to keep your systems running smoothly and efficiently.",
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Complete HVAC Solutions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From sourcing the best equipment to expert installation and reliable maintenance, we are your trusted partner for total comfort.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {servicesSummary.map((service, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                    <dotlottie-wc 
                      src={service.lottieSrc}
                      style={{width: '200px', height: '200px'}}
                      speed="1" 
                      autoplay 
                      loop>
                    </dotlottie-wc>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                </div>
            ))}
        </div>
        <div className="flex justify-center">
            <Button asChild size="lg">
                <Link href="/services">View All Services</Link>
            </Button>
        </div>
      </div>
    </section>
  )
}
