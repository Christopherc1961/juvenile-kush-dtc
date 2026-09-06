import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl tracking-[0.08em] text-fg">
            Juvenile × Kush
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Official DTC for the collab. Premium bats with the patented Big Hit
            Tip, grinders, trays, and merch. For legal herb consumers 21+.
            Products do not contain cannabis, nicotine, or tobacco.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="/#kits" className="hover:text-fg">
                Kits
              </a>
            </li>
            <li>
              <Link to="/shop" className="hover:text-fg">
                Full catalog
              </Link>
            </li>
            <li>
              <Link
                to="/product/$slug"
                params={{ slug: "big-hit-station" }}
                className="hover:text-fg"
              >
                Big Hit Station
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link to="/legal" className="hover:text-fg">
                21+ · Claims · Shipping
              </Link>
            </li>
            <li>Must be 21 to purchase.</li>
            <li>No free samples of covered tobacco products.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-[11px] uppercase tracking-[0.16em] text-subtle">
        21+ only · Not for sale to minors · Kush® is a registered mark of its
        owner · Juvenile name and likeness used under license
      </div>
    </footer>
  );
}
