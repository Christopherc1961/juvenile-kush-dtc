import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct, type Product, type Variant } from "./catalog";
import { shippingFor } from "./money";
import { uid } from "./utils";

export type CartLine = {
  key: string;
  slug: string;
  variantId?: string;
  qty: number;
};

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartLine[];
  address: Address;
  subtotal: number;
  shipping: number;
  total: number;
  campaign?: string;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number, variantId?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

function lineKey(slug: string, variantId?: string) {
  return variantId ? `${slug}::${variantId}` : slug;
}

export function resolveLine(line: CartLine): {
  product: Product;
  variant?: Variant;
  unit: number;
  name: string;
} | null {
  const product = getProduct(line.slug);
  if (!product) return null;
  const variant = product.variants?.find((v) => v.id === line.variantId);
  const unit = variant?.price ?? product.price;
  const name = variant ? `${product.name} · ${variant.label}` : product.name;
  return { product, variant, unit, name };
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (slug, qty = 1, variantId) => {
        const product = getProduct(slug);
        if (!product) return;
        const variant =
          variantId ??
          (product.variants && product.variants.length ? product.variants[0].id : undefined);
        const key = lineKey(slug, variant);
        const existing = get().lines.find((l) => l.key === key);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.key === key ? { ...l, qty: l.qty + qty } : l,
            ),
            open: true,
          });
        } else {
          set({
            lines: [...get().lines, { key, slug, variantId: variant, qty }],
            open: true,
          });
        }
      },
      setQty: (key, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.key !== key) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        });
      },
      remove: (key) => set({ lines: get().lines.filter((l) => l.key !== key) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "juvkush_cart",
      partialize: (s) => ({ lines: s.lines }),
      onRehydrateStorage: () => (state) => {
        if (state) state.open = false;
      },
    },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    const r = resolveLine(l);
    return r ? sum + r.unit * l.qty : sum;
  }, 0);
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}

const ORDERS_KEY = "juvkush_orders";

export function saveOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const full: Order = {
    ...order,
    id: uid("ord").toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  const prev = listOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([full, ...prev].slice(0, 20)));
  return full;
}

export function listOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
  } catch {
    return [];
  }
}

export function getOrder(id: string) {
  return listOrders().find((o) => o.id === id);
}
