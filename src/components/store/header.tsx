"use client";

import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", hash: "slow-motion", label: "The #1" },
  { to: "/", hash: "kits", label: "Kits" },
  { to: "/shop", label: "Shop" },
  { to: "/", hash: "bats", label: "Bats" },
  { to: "/", hash: "merch", label: "Merch" },
  { to: "/legal", label: "21+" },
];

export function Header() {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const [hydrated, setHydrated] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => setHydrated(true), []);
  const count = hydrated ? cartCount(lines) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div
        className="flex h-8 items-center justify-center overflow-hidden bg-gold text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
        aria-hidden="true"
      >
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              21+ · Free shipping $50+ · Official Kush × Juvenile DTC · Big Hit
              Station $49.99
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setMenu(true)}
        >
          <Menu />
        </Button>
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-[1.65rem] tracking-[0.14em] text-fg">
            Juvenile
          </span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-gold">
            × Kush · Official
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) =>
            n.hash ? (
              <a
                key={n.label}
                href={`${n.to}#${n.hash}`}
                className="text-xs font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.label}
                to={n.to}
                className="text-xs font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open cart"
          onClick={() => setOpen(true)}
        >
          <ShoppingBag />
          {count > 0 ? (
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-ink tabular-nums">
              {count}
            </span>
          ) : null}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          menu ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          className={cn(
            "absolute inset-0 bg-ink/70 transition-opacity duration-200",
            menu ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          onClick={() => setMenu(false)}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-72 flex-col gap-1 bg-surface p-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menu ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.12em]">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X />
            </Button>
          </div>
          {NAV.map((n) =>
            n.hash ? (
              <a
                key={n.label}
                href={`${n.to}#${n.hash}`}
                onClick={() => setMenu(false)}
                className="rounded-md px-3 py-3 text-sm uppercase tracking-[0.16em] hover:bg-raised"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setMenu(false)}
                className="rounded-md px-3 py-3 text-sm uppercase tracking-[0.16em] hover:bg-raised"
              >
                {n.label}
              </Link>
            ),
          )}
        </aside>
      </div>
    </header>
  );
}
