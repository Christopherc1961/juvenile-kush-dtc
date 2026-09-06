"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getOrder, resolveLine, type Order } from "@/lib/cart";
import { formatMoney } from "@/lib/money";

export const Route = createFileRoute("/order/$id")({
  component: OrderPage,
  head: () => ({ meta: [{ title: "Order confirmed — JUVENILE × KUSH" }] }),
});

function OrderPage() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrder(id) ?? null);
  }, [id]);

  if (order === undefined) {
    return <div className="min-h-[40vh] bg-bg" />;
  }
  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-4xl">Order not found</h1>
        <p className="mt-3 text-sm text-muted">
          Preview orders live in this browser only.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">Confirmed</p>
      <h1 className="mt-2 text-5xl leading-none">It’s in the bag.</h1>
      <p className="mt-4 text-sm text-muted">
        Preview order {order.id}. Nothing was charged. A live store would send
        this to fulfillment after 21+ ID verify.
      </p>
      <div className="mt-8 rounded-lg border border-border bg-surface p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Ship to</p>
        <p className="mt-2 text-sm">
          {order.address.firstName} {order.address.lastName}
          <br />
          {order.address.line1}
          {order.address.line2 ? (
            <>
              <br />
              {order.address.line2}
            </>
          ) : null}
          <br />
          {order.address.city}, {order.address.state} {order.address.zip}
        </p>
        <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
          {order.items.map((l) => {
            const r = resolveLine(l);
            if (!r) return null;
            return (
              <li key={l.key} className="flex justify-between gap-4">
                <span>
                  {l.qty}× {r.name}
                </span>
                <span className="tabular-nums">{formatMoney(r.unit * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex justify-between font-medium">
          <span>Total</span>
          <span className="tabular-nums">{formatMoney(order.total)}</span>
        </p>
      </div>
      <Button asChild className="mt-8 w-full">
        <Link to="/">Back to the drop</Link>
      </Button>
    </div>
  );
}
