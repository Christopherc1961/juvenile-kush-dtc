import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,color,border-color,transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gold text-ink hover:bg-gold-bright",
        secondary:
          "bg-raised text-fg border border-border hover:border-gold/50",
        outline:
          "border border-gold/60 text-gold-bright bg-transparent hover:bg-gold hover:text-ink",
        ghost: "text-fg hover:bg-raised",
        inverse: "bg-fg text-ink hover:bg-gold-bright",
        link: "text-gold underline-offset-4 hover:underline h-auto min-h-0 px-0",
      },
      size: {
        default: "h-11 min-h-11 px-5 text-sm",
        sm: "h-9 min-h-9 px-3 text-xs",
        lg: "h-12 min-h-12 px-7 text-base",
        icon: "size-11 min-h-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
