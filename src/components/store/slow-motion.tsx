"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/** Official remastered HD video on Juvenile's YouTube channel. */
export const SLOW_MOTION_ID = "-0llNuv3L4k";

export function SlowMotionPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="slow-motion"
      className="scroll-mt-28 border-b border-border bg-surface"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-lg bg-ink shadow-[0_0_0_1px_rgba(244,239,228,0.08)]">
          {playing ? (
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${SLOW_MOTION_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Juvenile — Slow Motion (Official Video) ft. Soulja Slim"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative block aspect-video w-full overflow-hidden bg-ink"
              aria-label="Play Slow Motion, official video"
            >
              <img
                src={`https://i.ytimg.com/vi/${SLOW_MOTION_ID}/hqdefault.jpg`}
                alt="Slow Motion official video still"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform duration-200 group-hover:scale-105">
                  <Play className="ml-0.5 size-7 fill-ink" />
                </span>
              </span>
            </button>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            Billboard Hot 100 · #1 · two weeks · 2004
          </p>
          <h2 className="mt-2 text-5xl leading-none md:text-6xl">
            Slow Motion
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
            Juvenile feat. Soulja Slim
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            His only Hot 100 number one — from <em>Juve the Great</em>, Cash
            Money / Universal. Playing here via the official YouTube video, tap
            to start. Explicit. 21+.
          </p>
          <p className="mt-4 text-[11px] leading-relaxed text-subtle">
            YouTube embed of the official upload. This is not a paid-ad sync
            license — Meta / TikTok ads still need master + composition in
            writing.
          </p>
        </div>
      </div>
    </section>
  );
}
