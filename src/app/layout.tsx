import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SplashScreen } from '@/components/splash-screen';
import { AiChat } from '@/components/ai-chat';

export const metadata: Metadata = {
  title: 'Alpine Tech',
  description: 'Your Peak of Home Comfort',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module" async></script>
      </head>
      <body className="font-eras antialiased bg-background text-foreground">
        <SplashScreen />
        {children}
        <AiChat />
        <Toaster />
      </body>
    </html>
  );
}
