// src/components/layout/footer.tsx

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/portfolio', label: 'Our Work' },
];

const socialLinks = [
    { href: '#', label: 'Facebook', icon: Facebook },
    { href: '#', label: 'Twitter', icon: Twitter },
    { href: '#', label: 'LinkedIn', icon: Linkedin },
];

export function Footer() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=35+Aladelola+Street,+Ikosi,+Ketu,+LAGOS";

  return (
    <footer className="bg-gray-900 text-white border-t border-neutral-800">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          
          {/* Column 1: Brand & Social */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" aria-label="Return to homepage" className="mb-4 inline-block">
              {/* Assuming your Logo component has a version suitable for dark backgrounds or is a neutral color SVG */}
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Providing top-tier HVAC solutions with reliability and expertise.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.label} 
                  href={social.href} 
                  aria-label={`Visit our ${social.label} page`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-blue-500"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 2: Company Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Company</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-300 transition-colors hover:text-blue-500"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Column 3: Contact Information */}
          <div className="md:col-span-4 lg:col-span-5">
            <h3 className="text-sm font-semibold text-neutral-100 mb-4">Contact Us</h3>
            <address className="flex flex-col gap-4 text-sm text-neutral-300 not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-neutral-400 mt-0.5" />
                <div>
                  35 Aladelola Street, Ikosi, Ketu, LAGOS
                  <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-blue-500 font-medium hover:underline text-xs">
                    View on Google Maps
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-neutral-400 mt-0.5" />
                <div className='flex flex-col'>
                  <a href="tel:+2348162038620 " className="transition-colors hover:text-blue-500">+234 909 090 4363</a>
                  <a href="tel:+2349090904363" className="transition-colors hover:text-blue-500">+234 816 203 8620</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-neutral-400 mt-0.5" />
                <a href="mailto:alpinetechhvac@gmail.com" className="transition-colors hover:text-blue-500">
                  alpinetechhvac@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>
        
        {/* Footer Bottom Bar */}
        <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Alpine Tech. All Rights Reserved.
          </p>
          <nav className="flex items-center gap-4 text-xs text-neutral-400">
            <Link 
              href="/privacy-policy" 
              className="font-medium transition-colors hover:text-blue-500"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-700" aria-hidden="true">|</span>
            <Link 
              href="/terms-of-service" 
              className="font-medium transition-colors hover:text-blue-500"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
        
      </div>
    </footer>
  );
}