"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isTwentyOne } from "@/lib/age";
import {
  cartTotals,
  resolveLine,
  saveOrder,
  useCart,
  type Address,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — JUVENILE × KUSH" }] }),
});

const US_STATES = [
  "AL","AZ","AR","CA","CO","CT","DE","FL","GA","ID","IL","IN","IA","KS","KY","LA",
  "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND",
  "OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
  "DC",
];

function Checkout() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const totals = useMemo(() => cartTotals(lines), [lines]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "LA",
    zip: "",
    dob: "",
  });

  function set<K extends keyof Address>(key: K, value: Address[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-4xl">Bag is empty</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop the drop</Link>
        </Button>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.line1 || !form.city || !form.zip) {
      setError("Fill every required field.");
      return;
    }
    if (!form.dob || !isTwentyOne(form.dob)) {
      setError("Checkout is 21+ only. Confirm a valid date of birth.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(form.zip)) {
      setError("Enter a valid US ZIP.");
      return;
    }
    setBusy(true);
    const campaign =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("utm_campaign") ||
          undefined
        : undefined;
    const order = saveOrder({
      items: lines,
      address: form,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      campaign,
    });
    clear();
    void navigate({ to: "/order/$id", params: { id: order.id } });
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={submit} className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            21+ checkout
          </p>
          <h1 className="mt-2 text-5xl leading-none">Ship it</h1>
          <p className="mt-2 text-sm text-muted">
            Preview checkout — no card is charged. Age is checked again here.
          </p>
        </div>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            Contact
          </legend>
          <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} />
          <Field
            className="sm:col-span-2"
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => set("email", v)}
          />
          <Field
            className="sm:col-span-2"
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(v) => set("phone", v)}
            required={false}
          />
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            Ship to
          </legend>
          <Field
            className="sm:col-span-2"
            label="Address"
            value={form.line1}
            onChange={(v) => set("line1", v)}
          />
          <Field
            className="sm:col-span-2"
            label="Apt / suite"
            value={form.line2}
            onChange={(v) => set("line2", v)}
            required={false}
          />
          <Field label="City" value={form.city} onChange={(v) => set("city", v)} />
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              className="flex h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            >
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <Field label="ZIP" value={form.zip} onChange={(v) => set("zip", v)} />
        </fieldset>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth (21+)</Label>
          <Input
            id="dob"
            type="date"
            value={form.dob}
            onChange={(e) => set("dob", e.target.value)}
            required
          />
        </div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" required className="mt-1 size-4 accent-gold" />
          I am 21 or older. These products are smoking accessories / merch and
          do not contain cannabis, nicotine, or tobacco. I will not share with
          minors.
        </label>
        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          Place order · {formatMoney(totals.total)}
        </Button>
      </form>
      <aside className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-2xl tracking-[0.08em]">Order</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((l) => {
            const r = resolveLine(l);
            if (!r) return null;
            return (
              <li key={l.key} className="flex gap-3 text-sm">
                <img
                  src={r.product.images[0]}
                  alt=""
                  className="size-14 rounded-sm bg-paper object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate">{r.name}</p>
                  <p className="text-muted tabular-nums">
                    {l.qty} × {formatMoney(r.unit)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
          <Row k="Subtotal" v={formatMoney(totals.subtotal)} />
          <Row
            k="Shipping"
            v={totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}
          />
          <Row k="Total" v={formatMoney(totals.total)} strong />
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "font-medium" : ""}`}>
      <span className="text-muted">{k}</span>
      <span className="tabular-nums">{v}</span>
    </div>
  );
}
