// src/components/header.tsx or wherever your component lives

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/#about', label: 'ABOUT' },
  { href: '/#portfolio', label: 'PORTFOLIO' },
  { href: '/#services', label: 'SERVICES' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-[66px] max-w-[760px] items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center">
          <Logo className="w-[130px] h-[50px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[60px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-eras text-xs font-normal text-black transition-colors hover:text-gray-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-[22px]">
            <button
                className="flex h-[40px] w-[60px] items-center justify-center rounded-full"
                style={{ boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.25)' }}
                aria-label="Actions"
            >
                <Menu className="h-[16px] w-[26px] text-black" />
            </button>
            
            <button 
                className="h-[40px] w-[150px] rounded-[7px] font-eras text-xs text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'rgb(0, 65, 117)' }}
            >
                CALL US
            </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
                <button
                    className="flex h-[40px] w-[60px] items-center justify-center rounded-full"
                    style={{ boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.25)' }}
                    aria-label="Open menu"
                >
                    <Menu className="h-[16px] w-[26px] text-black" />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                       <Logo className="w-[130px] h-[50px]" />
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
                      className="font-eras text-lg font-normal text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4">
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
