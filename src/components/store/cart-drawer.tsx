"use client";

import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cartCount,
  cartTotals,
  resolveLine,
  useCart,
} from "@/lib/cart";
import { centsUntilFreeShip, formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const { subtotal, shipping, total } = cartTotals(lines);
  const remain = centsUntilFreeShip(subtotal);
  const count = cartCount(lines);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        className={cn(
          "absolute inset-0 bg-ink/70 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="font-display text-2xl tracking-[0.1em]">Bag</p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted tabular-nums">
              {count} item{count === 1 ? "" : "s"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted">Your bag is empty.</p>
              <Button
                className="mt-5"
                onClick={() => setOpen(false)}
                variant="outline"
              >
                Continue shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const r = resolveLine(line);
                if (!r) return null;
                return (
                  <li key={line.key} className="flex gap-3">
                    <img
                      src={r.product.images[0]}
                      alt=""
                      className="size-20 rounded-sm bg-paper object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.name}</p>
                      <p className="text-sm tabular-nums text-gold">
                        {formatMoney(r.unit)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-md border border-border">
                          <button
                            className="grid size-9 place-items-center"
                            aria-label="Decrease"
                            onClick={() => setQty(line.key, line.qty - 1)}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            className="grid size-9 place-items-center"
                            aria-label="Increase"
                            onClick={() => setQty(line.key, line.qty + 1)}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          className="text-xs uppercase tracking-[0.12em] text-subtle hover:text-fg"
                          onClick={() => remove(line.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-raised">
              <div
                className="h-full bg-gold transition-[width] duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / 5000) * 100)}%`,
                }}
              />
            </div>
            <p className="mb-4 text-xs text-muted">
              {remain > 0
                ? `${formatMoney(remain)} away from free shipping.`
                : "Free shipping unlocked."}
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? "Free" : formatMoney(shipping)}
              </span>
            </div>
            <div className="mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span className="tabular-nums">{formatMoney(total)}</span>
            </div>
            <Button asChild className="mt-4 w-full" size="lg">
              <Link to="/checkout" onClick={() => setOpen(false)}>
                Checkout
              </Link>
            </Button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
