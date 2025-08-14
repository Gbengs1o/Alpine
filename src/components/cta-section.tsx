import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-slide">
          Ready to Experience the Peak of Home Comfort?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in-slide [animation-delay:200ms]">
          Don't wait for the next heatwave or cold snap. Contact our expert team today for a free, no-obligation consultation and discover the perfect HVAC solution for your space.
        </p>
        <div className="animate-fade-in-slide [animation-delay:400ms]">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">
                Get a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
