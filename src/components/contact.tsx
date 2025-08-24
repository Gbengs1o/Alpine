"use client";

// --- IMPORTS ---
import { useState } from 'react'; // We only need useState
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

// --- COMPONENT ---
export function Contact() {
  // State for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // The email address where you want to receive messages
  const recipientEmail = "alpinetechhvac@gmail.com";

  // Create the subject line for the email
  const subject = `New Message from ${name} (from your website)`;

  // Create the body of the email
  const body = `
You have received a new message from your website contact form.
-------------------------------------------------------------
Name: ${name}
Email: ${email}
-------------------------------------------------------------
Message:
${message}
  `;

  // Create the full mailto link, ensuring the content is properly encoded
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // --- JSX ---
  return (
    <section 
      id="contact" 
      className="w-full py-24 lg:py-32 bg-gray-50 text-gray-800"
    >
      <main className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col items-center">
        {/* ... Intro JSX ... */}
        <a href="#contact" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-gray-900 mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          GET IN TOUCH
        </a>
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight mb-6">
          Ready to Start Your Project?
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mb-16">
          Whether you have a question, need a quote, or are ready to discuss your project, 
          we’re here to provide clear, honest answers and expert guidance.
        </p>

        <div className="grid lg:grid-cols-5 gap-12 w-full">
          {/* ... Info Section (Left Side) is unchanged ... */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe in building lasting relationships based on the principles of reliability, professionalism, and integrity. When you contact us, you're not just getting a service; you're gaining a partner dedicated to ensuring your complete satisfaction and comfort.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Direct Contact Information</h3>
              <div className="space-y-6">
                <InfoItem icon={<MapPin className="w-6 h-6" />} title="Office Address">
                  <p>35 Aladelola Street, Ikosi, Ketu, LAGOS</p>
                  <Button variant="link" asChild className="p-0 h-auto text-blue-600">
                    <Link href="https://www.google.com/maps/search/?api=1&query=35+Aladelola+Street,+Ikosi,+Ketu,+LAGOS" target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </Link>
                  </Button>
                </InfoItem>
                <InfoItem icon={<Phone className="w-6 h-6" />} title="Phone">
                  <a href="tel:2348162038620" className="block hover:text-blue-600 transition-colors">234 909 090 4363</a>
                  <a href="tel:2349090904363" className="block hover:text-blue-600 transition-colors">234 816 203 8620</a>
                </InfoItem>
                <InfoItem icon={<Mail className="w-6 h-6" />} title="Email">
                  <a href="mailto:alpinetechhvac@gmail.com" className="hover:text-blue-600 transition-colors">alpinetechhvac@gmail.com</a>
                </InfoItem>
              </div>
            </div>
          </div>
          
          {/* Form Section (Right Side) */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send Your Inquiry</CardTitle>
                <CardDescription>Fill out the form below. Clicking "Send" will open your email app to send the message.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                    <Textarea id="message" rows={5} placeholder="Please describe your needs or question..." value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                  {/* The button is now a Link */}
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                    <a href={mailtoLink}>
                      Open Email & Send
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}

// Helper component for consistent info item styling
const InfoItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
      {icon}
    </div>
    <div className="text-gray-600">
      <h4 className="font-semibold text-lg text-gray-900 mb-1">{title}</h4>
      {children}
    </div>
  </div>
);