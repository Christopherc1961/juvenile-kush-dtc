"use client";

import { useEffect, useState } from "react";
import { isTwentyOne, persistAgeOk, readAgeOk } from "@/lib/age";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setOk(readAgeOk());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="min-h-dvh bg-bg" />;
  }

  if (ok) return <>{children}</>;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!dob) {
      setError("Enter your date of birth.");
      return;
    }
    if (!isTwentyOne(dob)) {
      setError("You must be 21 or older to enter this store.");
      return;
    }
    persistAgeOk(dob);
    setOk(true);
  }

  return (
    <div className="grain relative flex min-h-dvh items-center justify-center bg-bg px-5 py-16 text-fg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,163,90,0.12),transparent_55%)]" />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-surface p-7 shadow-[0_0_0_1px_rgba(244,239,228,0.06)]">
        <p className="font-display text-sm tracking-[0.28em] text-gold">
          Kush × Juvenile
        </p>
        <h1 className="mt-3 text-5xl leading-none text-fg">21+ Only</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This official DTC store sells smoking accessories and collab merch.
          Products are for legal herb consumers. You must be 21 or older to
          enter, browse, or buy.
        </p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setError("");
              }}
              max={new Date().toISOString().slice(0, 10)}
              required
            />
          </div>
          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" size="lg">
            Enter store
          </Button>
        </form>
        <p className="mt-5 text-[11px] leading-relaxed text-subtle">
          Age is verified at entry and again at checkout. A checkbox is not
          enough — we store your confirmation locally in this browser. By
          entering you confirm you are 21+ and that it is legal to view smoking
          accessories where you are.
        </p>
      </div>
    </div>
  );
}
