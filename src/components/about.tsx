"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">About Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Peak of Home Comfort</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              For over a decade, Alpine Tech has been the trusted name in residential and commercial HVAC services. We are dedicated to providing reliable, top-tier solutions that guarantee your comfort and satisfaction.
            </p>
            <Button asChild>
              <Link href="/about">Learn Our Full Story</Link>
            </Button>
          </div>
          <Image
            src="https://placehold.co/600x400.png"
            data-ai-hint="team portrait"
            width={600}
            height={400}
            alt="About"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </div>
    </section>
  )
}
