"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, productsByCategory, type Category } from "@/lib/catalog";
import { ProductCard } from "@/components/store/product-card";
import { cn } from "@/lib/utils";

type Search = { cat?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  component: Shop,
  head: () => ({
    meta: [{ title: "Shop the collab — JUVENILE × KUSH" }],
  }),
});

function Shop() {
  const { cat } = Route.useSearch();
  const active = (CATEGORIES.some((c) => c.id === cat) ? cat : "all") as
    | Category
    | "all";
  const items = productsByCategory(active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">Catalog</p>
      <h1 className="mt-2 text-5xl leading-none md:text-6xl">Shop the drop</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Every live SKU from the Kush × Juvenile collab, plus the 50ct custom
        pack and campaign kits. 21+.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={c.id === "all" ? {} : { cat: c.id }}
            className={cn(
              "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors",
              active === c.id
                ? "border-gold bg-gold text-ink"
                : "border-border text-muted hover:border-gold/50 hover:text-fg",
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
