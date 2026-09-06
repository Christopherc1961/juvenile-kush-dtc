import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "bg-gold/15 text-gold-bright",
        outline: "border border-border text-muted",
        inverse: "bg-ink text-gold",
        paper: "bg-paper text-ink",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
