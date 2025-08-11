import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/40 text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Alpine Tech. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
