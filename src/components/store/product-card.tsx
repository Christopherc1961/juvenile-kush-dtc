import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg bg-paper text-ink shadow-[0_0_0_1px_rgba(18,15,11,0.06)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(196,163,90,0.55)]",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-paper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge ? (
          <Badge className="absolute left-3 top-3" variant="inverse">
            {product.badge}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-ink/10 px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-subtle">
          {product.category}
        </p>
        <h3 className="font-sans text-sm font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-auto pt-2 font-medium tabular-nums text-ink">
          {product.fromPrice ? "From " : ""}
          {formatMoney(product.price)}
          {product.compareAt ? (
            <span className="ml-2 text-xs text-subtle line-through">
              {formatMoney(product.compareAt)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
