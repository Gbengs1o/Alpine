"use client";

import { Wrench, Package, HardHat, ShieldCheck, CheckCircle2, DraftingCompass, Wind } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const installationSteps = [
  {
    icon: DraftingCompass,
    title: "1. Consultation & Design",
    description: "We start by understanding your unique needs and assessing your space to design the most efficient and cost-effective HVAC solution.",
  },
  {
    icon: HardHat,
    title: "2. Precision Installation",
    description: "Our certified technicians handle everything from pipework to unit placement with meticulous attention to detail, ensuring perfect integration.",
  },
  {
    icon: Wind,
    title: "3. System Commissioning",
    description: "We thoroughly test and calibrate your new system, guaranteeing it operates at peak performance and providing you with complete control.",
  },
];

export function Services() {
  return (
    <div id="services" className="bg-white text-gray-800">
      {/* Page Header */}
      <header className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-24 text-center">
        <div className="container max-w-4xl mx-auto px-4">
          <p className="flex items-center justify-center text-sm font-bold tracking-wider text-muted-foreground uppercase mb-4">
            <span className="text-lg font-bold text-primary mr-2">•</span>OUR SERVICES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary mb-4">Total Climate Control, End-to-End</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide a complete suite of professional HVAC services. From sourcing the best equipment to expert installation and reliable maintenance, we are your trusted partner for comfort.
          </p>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-16">
        {/* Service 1: Equipment Sourcing */}
        <section id="sourcing" className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-slide">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                  <Package className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Equipment Sourcing & Supply</h2>
              </div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                As official partners with leading manufacturers like GREE, we procure world-class HVAC systems at unbeatable prices. We have the expertise to recommend and deploy the perfect equipment for any requirement.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Official GREE Partners</h4>
                    <p className="text-muted-foreground text-sm">Since 2012, offering premier, eco-friendly air conditioning solutions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">All Popular Brands</h4>
                    <p className="text-muted-foreground text-sm">We are equipped to supply and install any major HVAC brand specified by our clients.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Cost-Effective Procurement</h4>
                    <p className="text-muted-foreground text-sm">Our long-standing relationships ensure you get top-tier equipment without breaking the bank.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-80 md:h-full rounded-2xl overflow-hidden shadow-xl animate-fade-in-slide [animation-delay:200ms]">
                <Image
                  src="https://placehold.co/600x800.png"
                  alt="Warehouse with HVAC units"
                  width={600}
                  height={800}
                  data-ai-hint="air conditioner units"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Service 2: Installation */}
        <section id="installation" className="mb-24 py-16 bg-secondary/20 rounded-3xl">
          <div className="container max-w-5xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                <HardHat className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Professional Installation</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
              Our installation process is designed for flawless execution across residential, commercial, and industrial projects, ensuring your system is perfectly tailored to your needs for optimal performance.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {installationSteps.map((step, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200/60 animate-fade-in-slide" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 text-accent mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service 3: Maintenance */}
        <section id="maintenance" className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-full rounded-2xl overflow-hidden shadow-xl animate-fade-in-slide [animation-delay:200ms]">
              <Image
                src="https://placehold.co/600x800.png"
                alt="Technician performing HVAC maintenance"
                width={600}
                height={800}
                data-ai-hint="hvac maintenance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
            <div className="animate-fade-in-slide">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                  <Wrench className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Maintenance & Repairs</h2>
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                We offer flexible maintenance plans and expert repair services to keep your systems running smoothly, stocking all critical parts to ensure fast, effective solutions.
              </p>
              <div className="space-y-6">
                <div className="bg-secondary/30 p-6 rounded-xl border border-gray-200/50">
                  <h4 className="font-bold text-lg text-primary">Pay As You Go</h4>
                  <p className="text-muted-foreground text-sm">On-demand routine servicing, including cleaning of indoor/outdoor units. You're billed per unit serviced—perfect for flexible maintenance needs.</p>
                </div>
                <div className="bg-secondary/30 p-6 rounded-xl border border-gray-200/50">
                  <h4 className="font-bold text-lg text-primary">Annual Service Contract</h4>
                  <p className="text-muted-foreground text-sm">For complete peace of mind, we take full responsibility for servicing your units every three months for a full year, prompting you for appointments based on our schedule.</p>
                </div>
              </div>
               <p className="text-sm text-muted-foreground mt-6 italic">
                In all cases, if a fault is found, we provide a detailed estimate and only proceed with repairs upon your approval.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mt-24 py-16 bg-gradient-to-r from-primary to-blue-800 text-white rounded-3xl">
          <div className="container max-w-3xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-4">Ready to Upgrade Your Comfort?</h3>
            <p className="text-lg text-primary-foreground/80 mb-8">
                Let our experts provide a tailored solution for your home or business. Get in touch for a free, no-obligation consultation.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/#contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
