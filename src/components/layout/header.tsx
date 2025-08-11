// src/components/header.tsx or wherever your component lives

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Custom Logo component - ensure it renders an image with the correct src
// Example: <img src="/alpine-logo.png" alt="Alpine Logo" />
const Logo = () => (
    // Replicates RECTANGLE 5:29
    <img src="https://via.placeholder.com/130x50.png?text=Alpine+Logo" alt="Alpine Logo" className="w-[130px] h-[50px] object-contain" />
);

// Updated navLinks to match Figma design (GROUP 5:43)
const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#services', label: 'SERVICES' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // The main container for the navbar GROUP 5:34
    // Set height to 66px, added a subtle shadow for depth
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Centering container, max-width matches Figma's 760px */}
      <div className="container flex h-[66px] max-w-[760px] items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation (from GROUP 5:43) */}
        <nav className="hidden md:flex items-center gap-[60px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Styling from TEXT elements (e.g., 5:35)
              // Uses custom 'font-eras', text-xs for 12px, black color
              className="font-eras text-xs font-normal text-black transition-colors hover:text-gray-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-[22px]">
            {/* Ellipse Button (from GROUP 10:51) */}
            <button
                className="flex h-[40px] w-[60px] items-center justify-center rounded-full"
                // Drop shadow from ELLIPSE 5:44
                style={{ boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.25)' }}
                aria-label="Actions"
            >
                {/* Vector icon 10:50, using Lucide for convenience */}
                <Menu className="h-[16px] w-[26px] text-black" />
            </button>
            
            {/* Call US Button (from GROUP 11:54) */}
            <button 
                className="h-[40px] w-[150px] rounded-[7px] font-eras text-xs text-white transition-opacity hover:opacity-90"
                // Background color from RECTANGLE 5:33
                style={{ backgroundColor: 'rgb(0, 65, 117)' }}
            >
                CALL US
            </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
                {/* Re-using the ellipse button style for the mobile trigger */}
                <button
                    className="flex h-[40px] w-[60px] items-center justify-center rounded-full"
                    style={{ boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.25)' }}
                    aria-label="Open menu"
                >
                    <Menu className="h-[16px] w-[26px] text-black" />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Logo />
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex flex-col gap-4 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      // Using the same font style for consistency
                      className="font-eras text-lg font-normal text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4">
                    {/* Replicating the "Call Us" button style for the mobile sheet */}
                    <button
                        className="h-[40px] w-full rounded-[7px] font-eras text-xs text-white"
                        style={{ backgroundColor: 'rgb(0, 65, 117)' }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        CALL US
                    </button>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}