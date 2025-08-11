import { Wrench, ShieldCheck, Thermometer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Expert Installation',
    description: 'Professional installation of top-tier HVAC systems tailored to your home\'s needs for maximum efficiency and comfort.'
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Reliable Repairs',
    description: 'Fast and effective repair services to get your system back up and running. We handle all makes and models, 24/7.'
  },
  {
    icon: <Thermometer className="h-10 w-10 text-primary" />,
    title: 'Preventive Maintenance',
    description: 'Keep your HVAC system in peak condition with our comprehensive maintenance plans, preventing costly breakdowns.'
  }
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">Our Services</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">Comprehensive HVAC Solutions</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From routine check-ups to complete system overhauls, Alpine Comfort Solutions provides a full range of services to keep you comfortable.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col items-center text-center">
                <CardHeader className="items-center pb-4">
                    {service.icon}
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
