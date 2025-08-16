"use client";

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AskAiButtonProps {
  onClick: () => void;
}

export function AskAiButton({ onClick }: AskAiButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Make the button appear after a short delay on mount
    const initialTimeout = setTimeout(() => setVisible(true), 1000);

    // Then, make it pop up every 5 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 1000); // Re-appear after a short delay for the animation
    }, 50000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 ease-in-out",
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      aria-label="Ask AI Assistant"
    >
      <Sparkles className="w-5 h-5" />
      <span>Ask AI</span>
    </button>
  );
}
