import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-medium tracking-tight cursor-pointer select-none",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Primary call to action — the only place the accent fills a shape. */
        default:
          "bg-accent text-accent-foreground shadow-[var(--shadow-soft)] hover:bg-accent-hover hover:shadow-[var(--shadow-lift)]",
        /** Neutral high-contrast alternative to the accent. */
        solid:
          "bg-foreground text-background hover:opacity-90 shadow-[var(--shadow-soft)]",
        outline:
          "border border-border bg-card text-foreground hover:border-border-strong hover:bg-elevated",
        subtle: "bg-muted text-foreground hover:bg-elevated",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto rounded-none px-0 text-foreground underline-offset-4 hover:text-accent hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-[0.95rem]",
        lg: "h-12 px-7 text-base",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
