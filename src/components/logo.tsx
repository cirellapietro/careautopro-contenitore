import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Car className="h-6 w-6 text-accent" />
      <span className="font-headline text-xl font-bold text-primary dark:text-primary-foreground">
        CareAutoPro
      </span>
    </div>
  );
}
