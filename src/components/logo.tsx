import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <svg
        width="130"
        height="50"
        viewBox="0 0 130 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.0001 0C11.1929 0 0 11.1929 0 25.0001C0 38.8072 11.1929 50 25.0001 50C38.8072 50 50 38.8072 50 25.0001C50 11.1929 38.8072 0 25.0001 0ZM32.6501 20.3251L27.1501 12.9751C26.7751 12.4501 25.9501 12.4501 25.5751 12.9751L19.9251 20.4751C19.5501 21.0001 19.9251 21.6751 20.5501 21.6751H32.0751C32.7001 21.6751 33.0751 21.0001 32.6501 20.3251ZM14.7251 32.8501L22.8001 22.3501C23.5501 21.3751 24.9751 21.3751 25.7251 22.3501L30.1501 28.2751L34.2001 22.9501C34.5751 22.4251 35.4001 22.4251 35.7751 22.9501L40.2751 28.9501C40.6501 29.4751 40.1251 30.1501 39.5251 30.1501H15.4501C14.8501 30.1501 14.3251 29.4751 14.7251 28.9501L17.5501 32.8501H14.7251Z"
          fill="#004175"
        />
        <text
          x="58"
          y="22"
          fontFamily="'Eras Medium ITC', sans-serif"
          fontSize="22"
          fill="#014074"
          fontWeight="500"
        >
          ALPINE
        </text>
        <text
          x="58"
          y="42"
          fontFamily="'Eras Medium ITC', sans-serif"
          fontSize="22"
          fill="#014074"
          fontWeight="500"
        >
          TECH
        </text>
        <text
          x="58"
          y="50"
          fontFamily="'Eras Medium ITC', sans-serif"
          fontSize="8"
          fill="#418C38"
          fontWeight="500"
        >
          HVAC SERVICES
        </text>
      </svg>
    </div>
  );
}