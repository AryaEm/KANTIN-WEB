'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90',
        hero: 'bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground shadow-lg hover:scale-[1.02]',
        glass: 'border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10',
        teal: 'border border-white/20 bg-white/5 backdrop-blur hover:bg-teal-400 hover:text-black hover:shadow-xl hover:shadow-teal-400/10 hover:scale-105'
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6',
        xl: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
