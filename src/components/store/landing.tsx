"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProduct,
  products,
  type Category,
  type Product,
} from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/lib/cart";
import { ProductCard } from "./product-card";
import { SlowMotionPlayer } from "./slow-motion";

const kitSlugs = [
  "big-hit-station",
  "daily-driver",
  "gold-standard",
  "starter-hit",
  "merch-drop",
  "catalog-fan-kit",
];

function SectionHead({
  kicker,
  title,
  id,
}: {
  kicker: string;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-28">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{kicker}</p>
      <h2 className="mt-2 text-4xl leading-none md:text-5xl">{title}</h2>
    </div>
  );
}

export function Landing() {
  const add = useCart((s) => s.add);
  const hero = getProduct("big-hit-station")!;
  const kits = kitSlugs.map((s) => getProduct(s)!).filter(Boolean);
  const bats = products.filter((p) => p.category === "bats");
  const grinders = products.filter((p) => p.category === "grinders");
  const trays = products.filter((p) => p.category === "trays");
  const merch = products.filter((p) => p.category === "hats" || p.category === "tees");

  return (
    <div>
      <section className="grain relative border-b border-border">
        <div className="absolute inset-0">
          <img
            src="/brand/hero-still.jpg"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">
              Campaign landing · 21+
            </p>
            <h1 className="mt-4 text-[clamp(3.4rem,10vw,6.4rem)] leading-[0.88] text-fg">
              Never
              <br />
              hand-roll
              <br />
              again.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Official Kush® × Juvenile DTC. Patented Big Hit Tip bats, grinders,
              trays, hats, tees. Same offer as the Meta campaign — Big Hit
              Station at {formatMoney(hero.price)}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/product/$slug" params={{ slug: hero.slug }}>
                  Shop Big Hit Station
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#slow-motion">Play Slow Motion</a>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-gold" /> 21+ ID at checkout
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-gold" /> Free ship $50+
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="size-3.5 text-gold" /> Accessories only
              </li>
            </ul>
          </div>
          <div className="relative pb-10">
            <div className="overflow-hidden rounded-xl bg-paper p-3">
              <img
                src="/products/bats-100-king-a.jpg"
                alt="100ct King Size Juvenile Bats"
                className="aspect-square w-full object-contain"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 hidden w-36 overflow-hidden rounded-lg border border-border bg-paper shadow-lg md:block md:w-44">
              <img
                src="/products/bats-gold-a.jpg"
                alt="Gold Bats"
                className="aspect-square w-full object-contain p-2"
              />
            </div>
            <div className="absolute -right-2 top-8 hidden w-32 overflow-hidden rounded-lg border border-border bg-paper shadow-lg md:block md:w-40">
              <img
                src="/products/grinder-camo-a.jpg"
                alt="Camo grinder"
                className="aspect-square w-full object-contain p-2"
              />
            </div>
          </div>
        </div>
      </section>

      <SlowMotionPlayer />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="overflow-hidden rounded-lg bg-ink">
            <img
              src="/brand/big-hit-tip.jpg"
              alt="Close-up of the Big Hit Tip mouthpiece"
              className="aspect-[4/3] w-full object-cover opacity-95"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">
              Patented
            </p>
            <h2 className="mt-2 text-5xl leading-none">The Big Hit Tip</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Juvenile Bats hit you the right way. A wider-bore tip built for
              airflow — bold draws, even burn, no hand-roll. Find your time to
              shine with Golden Bats or keep it natural with unbleached.
            </p>
            <p className="mt-3 text-sm text-subtle">
              We do not claim health, wellness, safety, cessation, or medical
              benefit. Accessories only. No cannabis, nicotine, or tobacco in
              the product.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/product/$slug" params={{ slug: "juvenile-50ct-bats" }}>
                Shop 50ct custom
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead
          id="kits"
          kicker="Match the ad"
          title="Kits built to $50+"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kits.map((kit) => (
            <KitTile key={kit.slug} product={kit} onAdd={() => add(kit.slug)} />
          ))}
        </div>
      </section>

      <CatalogBlock id="bats" kicker="Core repeat" title="Bats" items={bats} />
      <CatalogBlock
        kicker="Station"
        title="Grinders"
        items={grinders}
        tone="surface"
      />
      <CatalogBlock kicker="Station" title="Trays" items={trays} />

      <section id="merch" className="scroll-mt-28 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHead kicker="Identity" title="Hats & tees" />
          <p className="mb-8 max-w-xl text-sm text-muted">
            Culture SKUs. Lower regulatory heat than smoking claims. Still 21+.
            Secret stash pocket on every tee.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {merch.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            The collaboration
          </p>
          <h2 className="mt-2 text-5xl leading-none">
            New Orleans
            <br />
            bounce, on paper.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Some collaborations just make sense. Kush® and Juvenile combining
            high-quality smoking accessories with an iconic sound and persona —
            a celebration of music and the sessions around it.
          </p>
          <blockquote className="mt-6 border-l-2 border-gold pl-4 text-sm italic text-fg">
            “That’s really when it all started, I heard Melle Mel saying, ‘Don’t
            push me, ‘cuz I’m close to the edge’, and that was it. I was only
            seven-years-old, but I knew I had to rap.”
            <footer className="mt-2 not-italic text-xs uppercase tracking-[0.14em] text-muted">
              — Juvenile
            </footer>
          </blockquote>
        </div>
        <div className="overflow-hidden rounded-xl bg-paper p-3">
          <img
            src="/products/tee-gold-a.jpg"
            alt="Juvenile × Kush gold foil tee"
            className="aspect-square w-full object-contain"
          />
        </div>
      </section>

      <section id="shop" className="scroll-mt-28 border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHead kicker="Full drop" title="Everything in the collab" />
          <div className="mb-6 flex flex-wrap gap-2">
            {(
              [
                ["bats", "Bats"],
                ["grinders", "Grinders"],
                ["trays", "Trays"],
                ["hats", "Hats"],
                ["tees", "Tees"],
                ["kits", "Kits"],
              ] as [Category, string][]
            ).map(([id, label]) => (
              <a
                key={id}
                href={`/shop?cat=${id}`}
                className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-gold hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
          <Button asChild>
            <Link to="/shop">
              Open full catalog
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <Faq />
    </div>
  );
}

function KitTile({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-raised">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block bg-paper"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="aspect-[4/3] w-full object-contain p-4"
        />
        {product.badge ? (
          <Badge className="absolute left-3 top-3" variant="inverse">
            {product.badge}
          </Badge>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-3xl leading-none tracking-[0.06em]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted">{product.short}</p>
        <p className="mt-3 font-medium tabular-nums">
          {formatMoney(product.price)}
          {product.compareAt ? (
            <span className="ml-2 text-xs text-subtle line-through">
              {formatMoney(product.compareAt)}
            </span>
          ) : null}
        </p>
        <div className="mt-5 flex gap-2">
          <Button className="flex-1" onClick={onAdd}>
            Add kit
          </Button>
          <Button asChild variant="secondary">
            <Link to="/product/$slug" params={{ slug: product.slug }}>
              Details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function CatalogBlock({
  id,
  kicker,
  title,
  items,
  tone,
}: {
  id?: string;
  kicker: string;
  title: string;
  items: Product[];
  tone?: "surface";
}) {
  return (
    <section className={tone === "surface" ? "bg-surface" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead id={id} kicker={kicker} title={title} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is the Big Hit Tip?",
    a: "A patented wider-bore tip on Juvenile Bats designed for increased airflow and an even burn. It is a construction claim, not a health claim.",
  },
  {
    q: "Do these products contain cannabis, nicotine, or tobacco?",
    a: "No. Bats are unbleached paper cones. Grinders, trays, hats, and tees are accessories and merch. Sold for legal herb consumers 21+.",
  },
  {
    q: "Why 21+?",
    a: "Site age-gates 21+. Checkout asks for date of birth again. We do not sell to minors. Independent ID verification is the production standard; this preview records DOB locally.",
  },
  {
    q: "What is in the Big Hit Station?",
    a: "100ct King Size Bats, a medium rolling tray, and the Black Camo 55mm grinder. Priced at $49.99 so the kit clears free shipping.",
  },
  {
    q: "Is this the same offer as the Meta ad?",
    a: "Yes. This landing is the dedicated DTC page for the campaign: same hero kit, same $50 free-ship threshold, same 21+ framing, no extra claims.",
  },
  {
    q: "Can I get free samples?",
    a: "No. Free samples are not offered. Counsel must clear sampling if a SKU is treated as a covered tobacco product.",
  },
];

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionHead kicker="Details" title="FAQ" />
      <div className="divide-y divide-border border-y border-border">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-fg [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {f.q}
                <span className="text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
