"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
// Added new icons for the updates
import { Menu, Snowflake, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
// The original logo is now only used in the side panel
import { Logo } from '@/components/logo';

// "Contact Us" link has been removed from the array
const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/portfolio', label: 'Our Work' },
];

// Added the social media links array
const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const googleMapsUrl = 'https://www.google.com/maps';
  const phoneNumber = '+2349090904363';
  const formattedPhoneNumber = '+234 909 090 4363';
  const telLink = `tel:${phoneNumber}`;

  const headerBaseClasses = 'sticky top-0 z-50 transition-all duration-300 ease-in-out';
  // CHANGE: `mix-blend-difference` is now applied to the header on desktop (`md:`) when scrolled.
  // This is the key change that makes the content inside adapt to the background.
  const headerScrolledClasses = 'bg-black/50 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none md:mix-blend-difference';
  const headerTopClasses = 'bg-[#4a7aa2]';
  const buttonPillClasses = 'flex items-center justify-center rounded-full bg-white/10 px-4 h-10 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20';

  // CHANGE: The glassy button style is back!
  const glassyButtonClasses = 'rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all hover:bg-white/20';


  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header className={`${headerBaseClasses} ${isScrolled ? headerScrolledClasses : headerTopClasses}`}>
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-1 items-center justify-start">
            {isScrolled ? (
              // --- SCROLLED STATE: Alpine Logo ---
              // CHANGE: Re-applied the glassy button styles. Text is forced to white to work with the parent's blend mode.
              <Link href="/" className={`flex items-center gap-2 px-4 py-1 text-white ${glassyButtonClasses}`} aria-label="Return to homepage">
                <Snowflake className="h-7 w-7 animate-spin [animation-duration:20s]" />
                <span className="text-2xl font-bold">Alpine</span>
              </Link>
            ) : (
              // --- INITIAL STATE: Menu and Location buttons ---
              <div className="flex items-center gap-2">
                <SheetTrigger asChild>
                  <button aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                    <Menu className="h-5 w-5 text-white" />
                  </button>
                </SheetTrigger>
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={buttonPillClasses}
                >
                  <MapPin className="mr-1.5 h-4 w-4" />
                  EN / FR
                </a>
              </div>
            )}
          </div>

          {/* CENTER SECTION: Only visible in the initial state with the ALPINE Logo */}
          {!isScrolled && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className="hidden items-center gap-2 text-white md:flex" aria-label="Homepage">
                <Snowflake className="h-8 w-8" />
                <span className="text-3xl font-bold">Alpine</span>
              </Link>
            </div>
          )}

          <div className="flex flex-1 items-center justify-end">
            {isScrolled ? (
              // --- SCROLLED STATE: Hamburger Menu ---
              // CHANGE: Re-applied the glassy button styles here as well.
               <SheetTrigger asChild>
                  <button aria-label="Open menu" className={`flex h-10 w-10 items-center justify-center text-white ${glassyButtonClasses}`}>
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
            ) : (
              // --- INITIAL STATE: Phone and "Get a Quote" button ---
              <div className="flex items-center gap-2 md:gap-4">
                <a href={telLink} className={`${buttonPillClasses} hidden lg:flex`}>
                  <Phone className="mr-2 h-4 w-4 text-white" />
                  <span>{formattedPhoneNumber}</span>
                </a>
                <Button asChild className="h-10 rounded-full bg-white/10 px-4 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:shadow-md md:px-6">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* --- SIDE PANEL (SHEET) --- */}
      <SheetContent side="right" className="flex w-full max-w-xs flex-col bg-white p-6 sm:max-w-sm">
          {/* Original Logo at the top of the side panel */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="mb-8 block">
             <Logo className="h-9 w-auto" />
          </Link>

          <nav className="mb-10 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-semibold text-neutral-800 transition-colors hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto"> {/* Pushes content below it to the bottom */}
            <Button 
                asChild
                className="h-14 w-full rounded-full bg-blue-600 text-base font-semibold text-white transition-all hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>

            <div className="mt-8 border-t pt-6">
                <a href={telLink} className="flex items-center justify-center gap-2 text-lg font-semibold text-neutral-700 hover:text-blue-600">
                    <Phone className="h-5 w-5" />
                    <span>Call Us Now</span>
                </a>
            </div>

            {/* Social Media Icons section */}
            <div className="mt-6 flex items-center justify-center gap-6">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="h-6 w-6 text-neutral-500 transition-colors hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
      </SheetContent>
    </Sheet>
  );
}