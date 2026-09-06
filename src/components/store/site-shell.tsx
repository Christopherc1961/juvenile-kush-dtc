"use client";

import { AgeGate } from "./age-gate";
import { CartDrawer } from "./cart-drawer";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AgeGate>
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </div>
    </AgeGate>
  );
}
