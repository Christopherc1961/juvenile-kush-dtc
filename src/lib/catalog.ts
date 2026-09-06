export type Category = "bats" | "grinders" | "trays" | "hats" | "tees" | "kits";

export type Variant = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  category: Category;
  price: number;
  compareAt?: number;
  badge?: string;
  fromPrice?: boolean;
  description: string;
  bullets: string[];
  images: string[];
  variants?: Variant[];
  kitItems?: { slug: string; qty: number; variantId?: string }[];
  featured?: boolean;
  meta?: string;
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kits", label: "Kits" },
  { id: "bats", label: "Bats" },
  { id: "grinders", label: "Grinders" },
  { id: "trays", label: "Trays" },
  { id: "hats", label: "Hats" },
  { id: "tees", label: "Tees" },
];

const TIP =
  'Featuring the patented "Big Hit Tip" — increased airflow for a fuller draw and a smooth, even burn. Never hand-roll again.';

const BAT_MATERIALS = [
  "Unbleached wood pulp fibers",
  "Bleach free · chlorine free · vegan · non-GMO",
  "For legal herb consumers. Does not contain cannabis, nicotine, or tobacco.",
];

export const products: Product[] = [
  {
    slug: "big-hit-station",
    name: "Big Hit Station",
    short: "100ct + tray + camo grinder",
    category: "kits",
    price: 4999,
    compareAt: 5397,
    badge: "Free ship",
    featured: true,
    description:
      "The campaign kit. 100ct King Bats, a medium rolling tray, and the Black Camo 55mm grinder — a full station that clears the $50 free-ship line.",
    bullets: [
      "100ct King Size Bats with Big Hit Tip",
      "Medium rolling tray",
      "Black Camo 55mm 4-piece grinder",
      "Designed to land at free shipping",
    ],
    images: [
      "/products/bats-100-king-a.jpg",
      "/products/grinder-camo-a.jpg",
      "/products/tray-m-a.jpg",
    ],
    kitItems: [
      { slug: "juvenile-100ct-bats", qty: 1 },
      { slug: "juvenile-rolling-tray-medium", qty: 1 },
      { slug: "juvenile-grinder-55mm", qty: 1 },
    ],
  },
  {
    slug: "gold-standard",
    name: "Gold Standard",
    short: "Gold Bats + etched grinder + large tray",
    category: "kits",
    price: 5499,
    compareAt: 5697,
    badge: "Premium",
    featured: true,
    description:
      "The luxury drop. King Size Gold Bats in a glass tube, the Gold Etched 63mm grinder, and the large tray.",
    bullets: [
      "Gold Bats King Size (glass tube)",
      "Gold Etched 63mm grinder",
      "Large rolling tray",
    ],
    images: [
      "/products/bats-gold-a.jpg",
      "/products/grinder-etched-a.jpg",
      "/products/tray-l-a.jpg",
    ],
    kitItems: [
      { slug: "juvenile-gold-bats", qty: 1, variantId: "single" },
      { slug: "juvenile-grinder-gold-etched", qty: 1 },
      { slug: "juvenile-rolling-tray", qty: 1 },
    ],
  },
  {
    slug: "daily-driver",
    name: "Daily Driver",
    short: "50ct custom + medium tray",
    category: "kits",
    price: 2499,
    compareAt: 2698,
    badge: "Repeat",
    featured: true,
    description:
      "The paid-social workhorse. Custom 50ct Bats plus a medium tray — the gap between a 6ct trial and a 100ct brick.",
    bullets: ["50ct custom 1¼ Bats", "Medium rolling tray"],
    images: ["/products/bats-50ct.jpg", "/products/tray-m-a.jpg"],
    kitItems: [
      { slug: "juvenile-50ct-bats", qty: 1 },
      { slug: "juvenile-rolling-tray-medium", qty: 1 },
    ],
  },
  {
    slug: "starter-hit",
    name: "Starter Hit",
    short: "6ct + small tray",
    category: "kits",
    price: 999,
    compareAt: 1098,
    badge: "Trial",
    featured: true,
    description:
      "Prove the tip. A 6ct of 1¼ Bats and a small tray — first purchase, low commitment.",
    bullets: ["6ct 1¼ Bats", "Small rolling tray"],
    images: ["/products/bats-6ct-a.jpg", "/products/tray-s-a.jpg"],
    kitItems: [
      { slug: "juvenile-6ct-bats", qty: 1, variantId: "single" },
      { slug: "juvenile-rolling-tray-small", qty: 1 },
    ],
  },
  {
    slug: "merch-drop",
    name: "Merch Drop",
    short: "Tee + hat + 6ct",
    category: "kits",
    price: 4799,
    compareAt: 5097,
    badge: "Culture",
    featured: true,
    description:
      "Identity first. Collab tee, snapback, and a 6ct of Bats. Lower regulatory heat than smoking claims — still 21+.",
    bullets: [
      "Juvenile × Kush tee (you pick size on the tee PDP if bought solo; kit ships size M unless noted at checkout)",
      "Hat — Black & Camo",
      "6ct 1¼ Bats",
    ],
    images: [
      "/products/tee-a.jpg",
      "/products/hat-camo-a.jpg",
      "/products/bats-6ct-a.jpg",
    ],
    kitItems: [
      { slug: "juvenile-x-kush-t-shirt", qty: 1, variantId: "M" },
      { slug: "juvenile-x-kush-hat-camo", qty: 1 },
      { slug: "juvenile-6ct-bats", qty: 1, variantId: "single" },
    ],
  },
  {
    slug: "catalog-fan-kit",
    name: "Catalog Fan Kit",
    short: "100ct + tee",
    category: "kits",
    price: 4299,
    compareAt: 4698,
    badge: "Music-led",
    featured: true,
    description:
      "For the catalog. 100ct King Bats and the collab tee — music-led, not a consumption claim.",
    bullets: ["100ct King Size Bats", "Juvenile × Kush tee (kit default size M)"],
    images: ["/products/bats-100-king-a.jpg", "/products/tee-a.jpg"],
    kitItems: [
      { slug: "juvenile-100ct-bats", qty: 1 },
      { slug: "juvenile-x-kush-t-shirt", qty: 1, variantId: "M" },
    ],
  },
  {
    slug: "juvenile-50ct-bats",
    name: "50ct Custom Bats — 1¼",
    short: "Custom 50 pack",
    category: "bats",
    price: 1699,
    badge: "DTC exclusive",
    featured: true,
    description: `The paid-social hero pack. Fifty 1¼ Bats with the patented Big Hit Tip — between a 6ct trial and a 100ct brick. ${TIP}`,
    bullets: [
      "1¼ size: 84mm with 26mm tip",
      "Bat top Ø 11.25mm ± 0.05 · bottom Ø 6.5mm ± 0.05",
      "50 Bats per box",
      ...BAT_MATERIALS,
    ],
    images: [
      "/products/bats-50ct.jpg",
      "/products/bats-100-114-a.png",
      "/brand/big-hit-tip.jpg",
    ],
  },
  {
    slug: "juvenile-100ct-bats-1-1-4",
    name: "100ct Bats — 1¼",
    short: "100ct 1¼",
    category: "bats",
    price: 2199,
    featured: true,
    description: `Kush × Juvenile Bats, 1¼ size, 100 count. ${TIP}`,
    bullets: [
      "1¼ size: 84mm with 26mm tip",
      "Bat top Ø 11.25mm ± 0.05 · bottom Ø 6.5mm ± 0.05",
      "100 Bats per box",
      ...BAT_MATERIALS,
    ],
    images: ["/products/bats-100-114-a.png", "/products/bats-100-114-b.png"],
  },
  {
    slug: "juvenile-100ct-bats",
    name: "100ct Bats — King Size",
    short: "100ct King",
    category: "bats",
    price: 2199,
    featured: true,
    description: `Kush × Juvenile Bats, King size, 100 count. ${TIP}`,
    bullets: [
      "King size: 109mm with 26mm tip",
      "Bat top Ø 12.25mm ± 0.05 · bottom Ø 6.5mm ± 0.05",
      "100 Bats per box",
      ...BAT_MATERIALS,
    ],
    images: [
      "/products/bats-100-king-a.jpg",
      "/products/bats-100-king-b.jpg",
      "/products/bats-100-king-c.jpg",
    ],
  },
  {
    slug: "juvenile-6ct-bats",
    name: "6ct Bats — 1¼",
    short: "6ct 1¼",
    category: "bats",
    price: 399,
    fromPrice: true,
    description: `Trial pack. Six 1¼ Bats with the Big Hit Tip in a durable slide box. ${TIP}`,
    bullets: [
      "1¼ size: 84mm with 26mm tip",
      "Durable slide box",
      "6 Bats per box · 24 boxes per display",
      ...BAT_MATERIALS,
    ],
    images: [
      "/products/bats-6ct-a.jpg",
      "/products/bats-6ct-b.jpg",
      "/products/bats-6ct-c.jpg",
      "/products/bats-6ct-d.jpg",
    ],
    variants: [
      { id: "single", label: "Single 6ct", price: 399 },
      { id: "display", label: "Display (24 pack)", price: 4056 },
    ],
  },
  {
    slug: "juvenile-3ct-bats",
    name: "3ct Bats — King Size",
    short: "3ct King",
    category: "bats",
    price: 399,
    fromPrice: true,
    description: `Trial pack. Three King Size Bats with the Big Hit Tip in a durable slide box. ${TIP}`,
    bullets: [
      "King size: 109mm with 26mm tip",
      "Durable slide box",
      "3 Bats per box · 24 boxes per display",
      ...BAT_MATERIALS,
    ],
    images: [
      "/products/bats-3ct-a.jpg",
      "/products/bats-3ct-b.jpg",
      "/products/bats-3ct-c.jpg",
      "/products/bats-3ct-d.jpg",
    ],
    variants: [
      { id: "single", label: "Single 3ct", price: 399 },
      { id: "display", label: "Display (24 pack)", price: 3576 },
    ],
  },
  {
    slug: "juvenile-gold-bats",
    name: "Gold Bats — King Size",
    short: "Gold Bats",
    category: "bats",
    price: 1399,
    fromPrice: true,
    badge: "Gold",
    featured: true,
    description:
      'King Size Gold Bats in a protective glass tube. Same patented Big Hit Tip, plus shimmering gold leaf. Unbleached wood pulp fibers + 24K gold leaf. Does not contain cannabis, nicotine, or tobacco.',
    bullets: [
      "King size: 109mm with 26mm tip",
      "Unbleached wood pulp fibers + 24K gold leaf",
      "Packaged in a glass tube",
      "1 Bat per tube · 4 tubes per display",
      "Bleach free · chlorine free · vegan · non-GMO",
    ],
    images: [
      "/products/bats-gold-a.jpg",
      "/products/bats-gold-c.jpg",
      "/products/bats-gold-d.jpg",
      "/products/bats-gold-e.jpg",
      "/products/bats-gold-b.jpg",
    ],
    variants: [
      { id: "single", label: "Single (glass tube)", price: 1399 },
      { id: "box", label: "4 Count Box", price: 4796 },
    ],
  },
  {
    slug: "juvenile-grinder-gold-black",
    name: "Grinder — Black & Gold",
    short: "Black & Gold grinder",
    category: "grinders",
    price: 2199,
    fromPrice: true,
    featured: true,
    description:
      "Medical-grade anodized aluminum. Diamond-shaped teeth, 4-piece / 3-chamber, magnetic closure, scraping tool.",
    bullets: [
      "Medical-grade anodized aluminum",
      "4-piece, 3-chamber design",
      "Includes scraping tool · magnetic closure",
      "Available in 55mm and 63mm",
    ],
    images: [
      "/products/grinder-goldblack-a.jpg",
      "/products/grinder-goldblack-b.jpg",
      "/products/grinder-goldblack-c.jpg",
      "/products/grinder-goldblack-d.jpg",
    ],
    variants: [
      { id: "55", label: "55mm", price: 2199 },
      { id: "63", label: "63mm", price: 2499 },
    ],
  },
  {
    slug: "juvenile-grinder-55mm",
    name: "Grinder — Black Camo 55mm",
    short: "Camo 55mm",
    category: "grinders",
    price: 2199,
    featured: true,
    description:
      "Black camo 55mm grinder. Same 4-piece build as the rest of the collab line.",
    bullets: [
      "Medical-grade anodized aluminum",
      "4-piece, 3-chamber · 55mm",
      "Scraping tool · magnetic closure · easy to clean",
    ],
    images: [
      "/products/grinder-camo-a.jpg",
      "/products/grinder-camo-c.jpg",
      "/products/grinder-camo-b.jpg",
      "/products/grinder-camo-d.jpg",
    ],
  },
  {
    slug: "juvenile-grinder-gold-etched",
    name: "Grinder — Gold Etched 63mm",
    short: "Gold Etched 63mm",
    category: "grinders",
    price: 2999,
    badge: "Gold",
    featured: true,
    description:
      "63mm gold-etched collab grinder. Larger chamber, same diamond teeth and magnetic closure.",
    bullets: [
      "Medical-grade anodized aluminum",
      "4-piece, 3-chamber · 63mm",
      "Gold etched finish",
      "Scraping tool · magnetic closure",
    ],
    images: [
      "/products/grinder-etched-a.jpg",
      "/products/grinder-etched-c.jpg",
      "/products/grinder-etched-b.jpg",
      "/products/grinder-etched-d.jpg",
    ],
  },
  {
    slug: "juvenile-rolling-tray",
    name: "Rolling Tray — Large",
    short: "Large tray",
    category: "trays",
    price: 1299,
    description:
      "Thick tin tray, glossy scratch-resistant finish, rounded high corners. 13.5\" × 10.5\" × 1.25\". Printed with the collab art.",
    bullets: [
      '13.5" × 10.5" × 1.25"',
      "Thick, durable tin",
      "Smooth glossy finish, scratch resistant",
      "Rounded high corners — home station size",
    ],
    images: ["/products/tray-l-a.jpg", "/products/tray-l-b.jpg"],
  },
  {
    slug: "juvenile-rolling-tray-medium",
    name: "Rolling Tray — Medium",
    short: "Medium tray",
    category: "trays",
    price: 999,
    description:
      "Medium collab tray in thick tin. Same print family as large and small.",
    bullets: [
      "Medium station size",
      "Thick, durable tin · glossy finish",
      "Rounded high corners",
    ],
    images: ["/products/tray-m-a.jpg", "/products/tray-m-b.jpg"],
  },
  {
    slug: "juvenile-rolling-tray-small",
    name: "Rolling Tray — Small",
    short: "Small tray",
    category: "trays",
    price: 699,
    description:
      "Small collab tray — travel and nightstand size, thick tin, glossy finish.",
    bullets: ["Compact size", "Thick, durable tin · glossy finish"],
    images: ["/products/tray-s-a.jpg", "/products/tray-m-b.jpg"],
  },
  {
    slug: "juvenile-x-kush-hat-camo",
    name: "Hat — Black & Camo",
    short: "Camo hat",
    category: "hats",
    price: 2199,
    featured: true,
    description:
      "Official Juvenile × Kush snapback. Black crown, camo bill, embroidered collab mark. One size. 21+ merch.",
    bullets: [
      "Structured snapback · one size",
      "Black & camo colorway",
      "Embroidered Juvenile × Kush mark",
    ],
    images: [
      "/products/hat-camo-a.jpg",
      "/products/hat-camo-b.jpg",
      "/products/hat-camo-c.jpg",
    ],
  },
  {
    slug: "juvenile-x-kush-hat-silver",
    name: "Hat — Black & Silver",
    short: "Black & silver hat",
    category: "hats",
    price: 2199,
    description:
      "Official Juvenile × Kush snapback. Black with silver embroidery. One size. 21+ merch.",
    bullets: [
      "Structured snapback · one size",
      "Black & silver colorway",
      "Embroidered Juvenile × Kush mark",
    ],
    images: [
      "/products/hat-silver-a.jpg",
      "/products/hat-silver-b.jpg",
      "/products/hat-silver-c.jpg",
    ],
  },
  {
    slug: "juvenile-x-kush-hat-white",
    name: "Hat — White",
    short: "White hat",
    category: "hats",
    price: 2199,
    description:
      "Official Juvenile × Kush snapback. White colorway, embroidered collab mark. One size. 21+ merch.",
    bullets: [
      "Structured snapback · one size",
      "White colorway",
      "Embroidered Juvenile × Kush mark",
    ],
    images: [
      "/products/hat-white-a.jpg",
      "/products/hat-white-b.jpg",
      "/products/hat-white-c.jpg",
    ],
  },
  {
    slug: "juvenile-x-kush-t-shirt",
    name: "T-Shirt",
    short: "Collab tee",
    category: "tees",
    price: 2499,
    featured: true,
    description:
      "Black unisex tee with the collab graphic. 100% cotton. Secret stash pocket.",
    bullets: [
      "100% cotton — unisex fit",
      "Secret stash pocket",
      "Sizes S–3XL",
      "21+ merch. Not a youth design.",
    ],
    images: [
      "/products/tee-a.jpg",
      "/products/tee-b.jpg",
      "/products/tee-c.jpg",
      "/products/stash.jpg",
    ],
    variants: [
      { id: "S", label: "S", price: 2499 },
      { id: "M", label: "M", price: 2499 },
      { id: "L", label: "L", price: 2499 },
      { id: "XL", label: "XL", price: 2499 },
      { id: "2XL", label: "2XL", price: 2499 },
      { id: "3XL", label: "3XL", price: 2499 },
    ],
  },
  {
    slug: "juvenile-x-kush-t-shirt-gold",
    name: "T-Shirt — Gold",
    short: "Gold foil tee",
    category: "tees",
    price: 2499,
    badge: "Gold",
    featured: true,
    description:
      "Black unisex tee with gold-foil collab graphic. 100% cotton. Secret stash pocket.",
    bullets: [
      "100% cotton — unisex fit",
      "Gold foil graphic",
      "Secret stash pocket",
      "Sizes S–3XL",
    ],
    images: [
      "/products/tee-gold-a.jpg",
      "/products/tee-gold-b.jpg",
      "/products/stash.jpg",
    ],
    variants: [
      { id: "S", label: "S", price: 2499 },
      { id: "M", label: "M", price: 2499 },
      { id: "L", label: "L", price: 2499 },
      { id: "XL", label: "XL", price: 2499 },
      { id: "2XL", label: "2XL", price: 2499 },
      { id: "3XL", label: "3XL", price: 2499 },
    ],
  },
];

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string) {
  return bySlug.get(slug);
}

export function productsByCategory(cat: Category | "all") {
  if (cat === "all") return products;
  return products.filter((p) => p.category === cat);
}

export function kitContents(product: Product) {
  if (!product.kitItems) return [];
  return product.kitItems
    .map((item) => {
      const p = getProduct(item.slug);
      if (!p) return null;
      const variant = p.variants?.find((v) => v.id === item.variantId);
      return { product: p, qty: item.qty, variant };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export const HERO_KIT_SLUG = "big-hit-station";
