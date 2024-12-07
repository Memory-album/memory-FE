import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#4848f9] text-white rounded-[10px] font-bold text-[18px] hover:bg-[#3d3dcf]',
        prevBtn: 'text-[#6E6E6E]',
        loginBtn: 'text-white rounded-[10px] font-bold text-[18px]',
        homeBtn:
          'text-[16px] bg-[#4848f9] text-white rounded-[10px] font-bold hover:bg-[#3d3dcf] shadow-[0_0_10px_1px_rgba(141,146,255,0.42)]',
        uploadBtn:
          'text-lg bg-[#4848f9] disabled:bg-[#DAE2FF] text-white font-bold rounded-[10px] hover:bg-[#3d3dcf]',
      },
      size: {
        default: 'w-[280px] h-[50px] px-4 py-2',
        mainPage: 'w-[328px] h-[52px] px-4 py-2',
        prevBtn: 'w-[34px] h-[34px]',
        homeBtn: 'w-[328px] h-[52px]',
        uploadBtn: 'w-[60px] h-[40px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
