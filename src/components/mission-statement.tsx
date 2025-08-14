"use client";

import { MapPin, Phone, Mail } from 'lucide-react';

export function MissionStatement() {
  return (
    <section id="about" className="bg-[#f0f4f8]">
      <div className="container max-w-7xl mx-auto">
        {/* Mission & Contact Section */}
        <div className="bg-white rounded-lg shadow-lg -mt-16 relative z-20 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                    <blockquote className="border-l-4 border-accent pl-6 text-lg text-muted-foreground italic">
                    Delivering affordable air conditioning solutions for both residential and commercial spaces, employing top-tier systems and adhering strictly to industry standards to establish a comfortable living and working environment.
                    </blockquote>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
                    <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Office Address</h4>
                            <p className="text-muted-foreground">35 Aladelola Street, Ikosi, Ketu, LAGOS</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Phone</h4>
                            <p className="text-muted-foreground">234 909 090 4363<br/>234 816 203 8620</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <a href="mailto:alpinetechhvac@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">alpinetechhvac@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
