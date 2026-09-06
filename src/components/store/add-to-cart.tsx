"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function AddToCart({
  product,
  size = "lg",
  className,
}: {
  product: Product;
  size?: "default" | "lg" | "sm";
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const variants = product.variants;
  const [variantId, setVariantId] = useState(variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const unit = useMemo(() => {
    return variants?.find((v) => v.id === variantId)?.price ?? product.price;
  }, [product.price, variantId, variants]);

  return (
    <div className={cn("space-y-4", className)}>
      {variants && variants.length > 1 ? (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            {product.category === "tees" ? "Size" : "Option"}
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "min-h-11 rounded-md border px-3 text-sm transition-colors",
                  variantId === v.id
                    ? "border-gold bg-gold text-ink"
                    : "border-border bg-raised text-fg hover:border-gold/50",
                )}
              >
                {v.label}
                {v.price !== product.price ? (
                  <span className="ml-2 tabular-nums opacity-80">
                    {formatMoney(v.price)}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-md border border-border">
          <button
            type="button"
            className="grid size-11 place-items-center"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button
            type="button"
            className="grid size-11 place-items-center"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
        <Button
          size={size}
          className="flex-1"
          onClick={() => add(product.slug, qty, variantId)}
        >
          Add · {formatMoney(unit * qty)}
        </Button>
      </div>
    </div>
  );
}
