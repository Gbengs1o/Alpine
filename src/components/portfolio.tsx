import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const portfolioImages = [
  { src: "https://placehold.co/600x400.png", alt: "Project 1", hint: "HVAC installation" },
  { src: "https://placehold.co/600x400.png", alt: "Project 2", hint: "air conditioner" },
  { src: "https://placehold.co/600x400.png", alt: "Project 3", hint: "heating system" },
  { src: "https://placehold.co/600x400.png", alt: "Project 4", hint: "commercial HVAC" },
  { src: "https://placehold.co/600x400.png", alt: "Project 5", hint: "ductwork installation" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">Our Work</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">A Glimpse of Our Quality</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We take pride in our work. Here are some of the projects we've completed for our satisfied customers.
          </p>
        </div>
        <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {portfolioImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                       <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        data-ai-hint={image.hint}
                        className="rounded-lg object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
