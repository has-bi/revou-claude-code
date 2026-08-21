"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { DESIGN_H, DESIGN_W, stageScale } from "@/lib/gestures";

/**
 * The deck is authored once against a fixed 1920×1080 design space and then
 * scaled to fit whatever viewport it lands in.
 *
 * This is the same trick reveal.js uses internally, and it buys the two things
 * this deck actually needs:
 *
 *   1. Every typographic relationship is locked. A 25px body line is always
 *      exactly 25/1080ths of the slide height — on a projector, a laptop, or a
 *      phone. No clamp(), no vw guesswork, no "looks fine here, breaks there".
 *   2. Mobile review is free. The phone gets a faithful miniature of the real
 *      slide rather than a reflowed approximation of it.
 */
export { DESIGN_W, DESIGN_H };

// useLayoutEffect warns during SSR; this is a client-only measurement anyway.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Stage({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(stageScale(width, height));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-white"
    >
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale ?? 0})`,
          transformOrigin: "center center",
          // Avoid a flash of unscaled 1920px content before the first measure.
          visibility: scale === null ? "hidden" : "visible",
          position: "relative",
        }}
        className="shrink-0"
      >
        {children}
      </div>
    </div>
  );
}
