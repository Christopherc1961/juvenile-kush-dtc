export const FREE_SHIP_CENTS = 5000;
export const FLAT_SHIP_CENTS = 699;

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function shippingFor(subtotalCents: number) {
  if (subtotalCents <= 0) return 0;
  return subtotalCents >= FREE_SHIP_CENTS ? 0 : FLAT_SHIP_CENTS;
}

export function centsUntilFreeShip(subtotalCents: number) {
  return Math.max(0, FREE_SHIP_CENTS - subtotalCents);
}
