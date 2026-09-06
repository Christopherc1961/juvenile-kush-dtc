import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => ({ meta: [{ title: "21+ · Claims · Shipping — JUVENILE × KUSH" }] }),
});

function Legal() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-muted">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">Compliance</p>
      <h1 className="mt-2 text-5xl leading-none text-fg">The fine print</h1>
      <p className="mt-6">
        Not legal advice. This page is the public claim sheet and 21+ policy for
        the campaign landing. Counsel signs off before paid media.
      </p>

      <h2 className="mt-10 text-3xl text-fg">21+</h2>
      <p className="mt-3">
        Entry requires date of birth. Checkout requires it again. We do not sell
        to anyone under 21. Production should add independent age + identity
        verification against reliable data sources — a checkbox alone is not
        enough under FDA online-retailer guidance for covered tobacco products.
      </p>

      <h2 className="mt-10 text-3xl text-fg">What we sell</h2>
      <p className="mt-3">
        Smoking accessories (bats / pre-rolled cones, grinders, trays) and
        collab merch (hats, tees). Products do not contain cannabis, nicotine,
        or tobacco. Sold for legal herb consumers.
      </p>

      <h2 className="mt-10 text-3xl text-fg">Claims we make</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Official Kush® × Juvenile collaboration</li>
        <li>Patented “Big Hit Tip”</li>
        <li>Increased airflow / even burn (construction, not health)</li>
        <li>Materials listed on each PDP (unbleached wood pulp, 24K gold leaf on Gold Bats, aluminum grinders, tin trays, cotton tees)</li>
        <li>Counts, sizes, and prices as listed</li>
      </ul>

      <h2 className="mt-10 text-3xl text-fg">Claims we do not make</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Health, wellness, “safe,” cessation, or medical benefit</li>
        <li>Modified-risk (“safer than…”)</li>
        <li>That the product contains cannabis, nicotine, or tobacco</li>
        <li>Youth appeal, school/college targeting, cartoon characters aimed at minors</li>
      </ul>

      <h2 className="mt-10 text-3xl text-fg">Advertising</h2>
      <p className="mt-3">
        This landing is the destination for adult-targeted Meta ads (21+
        targeting). Paid/gifted posts must disclose the material connection
        (FTC Endorsement Guides).
      </p>
      <p className="mt-3">
        The page embeds Juvenile’s official YouTube video for “Slow Motion”
        (feat. Soulja Slim) — his only Billboard Hot 100 #1. A YouTube embed is
        not a sync license for paid social, pre-roll, or TV. Master +
        composition must be cleared in writing before that video or audio is
        used in ads.
      </p>

      <h2 className="mt-10 text-3xl text-fg">Shipping</h2>
      <p className="mt-3">
        Free shipping on orders $50+ in this preview (contiguous US). Some
        states restrict online sale or shipment of certain smoking products —
        production must maintain a counsel-owned deny-ship list. No free sample
        promotions until counsel clears.
      </p>

      <h2 className="mt-10 text-3xl text-fg">Privacy on this preview</h2>
      <p className="mt-3">
        Cart, age confirmation, and demo orders are stored in your browser
        only. No payment is processed.
      </p>
    </article>
  );
}
