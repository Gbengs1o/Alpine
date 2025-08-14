"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Award, Leaf, ArrowRight } from "lucide-react"

export function About() {
  return (
    <section 
      id="about" 
      className="w-full py-20 md:py-28 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* Content Side */}
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
              About Alpine Tech
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
              Your Peak of Home Comfort
            </h2>

            <p className="max-w-[600px] text-muted-foreground text-base md:text-lg">
              For over <strong>thirteen years</strong>, Alpine Tech has been the trusted name in residential and commercial HVAC services. With a dedicated team of <strong>12+ experienced technicians</strong>, we deliver reliable, top-tier solutions that guarantee your comfort and complete satisfaction.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-white border shadow-sm">
                <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold text-primary">13+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border shadow-sm">
                <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-xl font-bold text-primary">12+</div>
                <div className="text-sm text-muted-foreground">Expert Technicians</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border shadow-sm col-span-2 md:col-span-1">
                <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Eco-Friendly</div>
              </div>
            </div>

            <div>
              <Button asChild size="lg">
                <Link href="/about">
                  Discover Our Full Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-2.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="hvac team professional"
              width={600}
              height={400}
              alt="Alpine Tech HVAC Team"
              className="relative z-10 mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center shadow-xl border-4 border-white"
            />
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg text-right">
                <div className="text-sm font-semibold text-primary">13 Years of Excellence</div>
                <div className="text-xs text-muted-foreground">Trusted by thousands</div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
