"use client";

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AddToCart } from "@/components/store/add-to-cart";
import { ProductCard } from "@/components/store/product-card";
import { Badge } from "@/components/ui/badge";
import { getProduct, kitContents, products } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.product.name} — JUVENILE × KUSH`
          : "Product",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl">Not in this drop</h1>
      <Link to="/shop" className="mt-4 inline-block text-gold">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);
  const kit = kitContents(product);
  const img = product.images[active] ?? product.images[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">
        <Link to="/shop" className="hover:text-fg">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {product.category}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-lg bg-paper">
            <img
              src={img}
              alt={product.name}
              className="aspect-square w-full object-contain p-6"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-md bg-paper ${
                    i === active ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square w-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          {product.badge ? <Badge>{product.badge}</Badge> : null}
          <h1 className="mt-3 text-5xl leading-none md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl tabular-nums text-gold">
            {product.fromPrice ? "From " : ""}
            {formatMoney(product.price)}
            {product.compareAt ? (
              <span className="ml-3 text-base text-subtle line-through">
                {formatMoney(product.compareAt)}
              </span>
            ) : null}
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            {product.description}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-fg">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>
          {kit.length > 0 ? (
            <div className="mt-6 rounded-lg border border-border bg-raised p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gold">
                In this kit
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {kit.map((k) => (
                  <li key={k.product.slug}>
                    {k.qty}× {k.product.name}
                    {k.variant ? ` · ${k.variant.label}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-subtle">
            21+ only. For legal herb consumers. Does not contain cannabis,
            nicotine, or tobacco. Free shipping on orders $50+.
          </p>
        </div>
      </div>
      {related.length > 0 ? (
        <div className="mt-20">
          <h2 className="mb-6 text-3xl">Also in the drop</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
