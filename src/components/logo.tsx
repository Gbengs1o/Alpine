import { MountainSnow } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <MountainSnow className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-primary tracking-tight">
        Alpine Comfort
      </span>
    </div>
  );
}
