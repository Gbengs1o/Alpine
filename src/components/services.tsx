"use client";

import { Wrench, Package, HardHat, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const servicesData = [
  {
    icon: Package,
    title: "Equipment Sourcing & Supply",
    description: "As official partners with major equipment manufacturers like GREE, we procure world-class HVAC systems at unbeatable prices. We also deploy other popular brands when specified by the client.",
    details: [
      "Official GREE brand partners since 2012.",
      "Access to a wide range of popular HVAC brands.",
      "Cost-effective procurement for top-tier equipment.",
      "Solutions for both residential and commercial needs."
    ],
    image: "https://placehold.co/600x400.png",
    imageHint: "air conditioner units",
  },
  {
    icon: HardHat,
    title: "Professional Installation",
    description: "Our experienced team provides comprehensive installation for residential, commercial, and industrial projects, ensuring optimal performance and energy efficiency from day one.",
    details: [
      "Pipe installation, unit placement, and system commissioning.",
      "Expertise with all major HVAC brands and system types.",
      "Focus on energy efficiency and cost-effectiveness.",
      "Tailored solutions for any property size or type."
    ],
    image: "https://placehold.co/600x400.png",
    imageHint: "technician installing ac",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "We offer flexible maintenance plans and expert repair services to keep your systems running smoothly. We stock all critical parts to ensure fast and effective solutions.",
    details: [
      "'Pay As You Go' for on-demand routine servicing.",
      "'Annual Service Contracts' for proactive, scheduled maintenance.",
      "Transparent fault reporting and repair estimates.",
      "Fully-equipped workshop for residential and light commercial repairs."
    ],
    image: "https://placehold.co/600x400.png",
    imageHint: "hvac maintenance",
  },
];

const ServiceCard = ({ service, reverse = false }: { service: typeof servicesData[0], reverse?: boolean }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 transition-shadow hover:shadow-xl duration-300">
    <div className={`grid grid-cols-1 md:grid-cols-2 items-center`}>
      <div className={`p-8 md:p-12 ${reverse ? 'md:order-2' : ''}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <service.icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{service.description}</p>
        <ul className="space-y-3 text-sm">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`h-64 md:h-full ${reverse ? 'md:order-1' : ''}`}>
        <Image
          src={service.image}
          alt={service.title}
          width={600}
          height={400}
          data-ai-hint={service.imageHint}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/20">
      <div className="container max-w-7xl mx-auto px-4">
        <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <p className="flex items-center justify-center text-sm font-bold tracking-wider text-muted-foreground uppercase mb-4">
            <span className="text-lg font-bold text-primary mr-2">•</span>OUR SERVICES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-primary mb-4">Total Climate Control, End-to-End</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide a complete suite of professional HVAC services. From sourcing the best equipment to expert installation and reliable maintenance, we are your trusted partner for comfort.
          </p>
        </header>

        <div className="space-y-12">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} reverse={index % 2 !== 0} />
          ))}
        </div>

        <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ready to Upgrade Your Comfort?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let our experts provide a tailored solution for your home or business. Get in touch for a free consultation.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Request a Quote</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
