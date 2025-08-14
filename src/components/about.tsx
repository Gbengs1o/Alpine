"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const timelineData = [
  {
    year: '2011',
    title: 'Our Foundation',
    description:
      'With 13 years of practice, Alpine Tech was founded on a mission to deliver affordable, high-quality air conditioning solutions across Lagos.',
  },
  {
    year: '2012',
    title: 'Strategic Partnership',
    description:
      'We became official partners with the GREE brand, allowing us to procure and deploy world-class, eco-friendly HVAC equipment for our clients.',
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description:
      'Now a dedicated team of over 12 experienced technicians, we are a trusted name for residential and commercial HVAC services, committed to 100% customer satisfaction.',
  },
];

const stats = [
    { value: '13+', label: 'Years' },
    { value: '12+', label: 'Technicians' },
    { value: '100%', label: 'Satisfaction' },
]

export function About() {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-slide');
          } else {
            entry.target.classList.remove('animate-fade-in-slide');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section id="about" className="bg-[#f0f4f8] relative">
      <div className="container max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-blue-500/10 bg-gradient-to-br from-white to-[#f8fbff] text-center py-20 px-4 md:py-28">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(91,157,255,0.05)_0%,transparent_70%)] animate-spin" style={{animationDuration: '20s'}}></div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <p className="flex items-center justify-center text-xs md:text-sm font-bold tracking-widest text-gray-700 uppercase mb-5">
                    <span className="text-lg md:text-xl font-bold text-blue-500 mr-2">•</span>WHO WE ARE
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight mb-6">Delivering Comfort, Built on Trust</h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Professional HVAC solutions with over 13 years of excellence in Lagos</p>
            </div>
        </div>

        {/* Company Overview */}
        <div className="bg-white py-16 px-4 md:py-20 lg:py-24 border-b border-blue-500/10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-1 text-center">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm font-semibold px-5 py-2 rounded-full mb-4">Est. 2011</span>
                    <Image
                        src="https://placehold.co/180x180.png"
                        data-ai-hint="company building"
                        alt="Alpine Tech Office"
                        width={180}
                        height={180}
                        className="rounded-2xl object-cover mx-auto mb-8 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
                    />
                    <div className="flex justify-center gap-8">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <span className="text-3xl font-bold text-blue-500 block">{stat.value}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 lg:pl-10 lg:border-l-4 lg:border-blue-500">
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Alpine Tech</h2>
                     <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                        <Link href="#" className="text-blue-500 font-semibold hover:text-gray-800 transition-colors">Alpine</Link> Tech is a professional company offering dependable residential and commercial <Link href="#" className="text-blue-500 font-semibold hover:text-gray-800 transition-colors">HVAC</Link> services. We handle everything from supply and installation to repair and maintenance, all backed by exceptional customer service.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-1">✓</span> Residential & Commercial HVAC Solutions</li>
                        <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-1">✓</span> Official GREE Brand Partnership</li>
                        <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-1">✓</span> Expert Installation & Maintenance</li>
                        <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-1">✓</span> 24/7 Emergency Service Available</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-gradient-to-b from-[#f8fbff] to-[#f0f4f8] py-16 px-4 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600">Building excellence through innovation and dedication</p>
            </div>

            <div className="relative">
              {/* This is the line for the timeline */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-300 to-blue-500/30 transform md:-translate-x-1/2"></div>
              
              {timelineData.map((item, index) => (
                <div key={item.year} ref={el => timelineRefs.current[index] = el} className="relative mb-12 last:mb-0 opacity-0">
                  <div className="md:hidden absolute top-1 left-4 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-md ring-8 ring-white z-10"></div>
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full shadow-md ring-8 ring-white z-10"></div>
                  
                  <div className={cn(
                      "flex flex-col md:flex-row items-center",
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  )}>
                    <div className="md:w-5/12"></div>
                    <div className="md:w-2/12"></div>
                    <div className={cn("w-full md:w-5/12 p-6 bg-white rounded-xl shadow-lg border border-gray-200/80 transition-all duration-500 ml-12 md:ml-0")}>
                      <span className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{item.year}</span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="bg-gradient-to-t from-[#f8fbff] to-[#f0f4f8] text-center py-16 px-4 md:py-24">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Experience Alpine Tech Excellence?</h2>
                <p className="text-base md:text-lg text-gray-600 mb-8">Discover how our 13 years of expertise can transform your comfort experience</p>
                <Link href="/#about" className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                    Learn Our Full Story
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-full"></span>
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
