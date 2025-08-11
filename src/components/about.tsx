import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Image
            src="https://placehold.co/600x500.png"
            width="600"
            height="500"
            alt="About us"
            data-ai-hint="friendly technician team"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">About Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Your Trusted Partner in Home Comfort
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed">
              For over a decade, Alpine Comfort Solutions has been committed to providing top-notch HVAC services to our community. Our team of certified technicians is dedicated to ensuring your home's heating and cooling systems are efficient, reliable, and perfectly suited to your needs.
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed">
              We believe in honest service, transparent pricing, and quality workmanship. Your comfort is our priority, and we strive to exceed your expectations on every job.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
