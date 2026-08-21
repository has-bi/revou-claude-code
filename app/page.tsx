"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, LayoutGrid, RotateCcw, X } from "lucide-react";
import Slide, { EASE } from "@/components/slides/slide";
import Stage from "@/components/slides/stage";
import { SLIDES } from "@/lib/slides-data";
import { resolveSwipe } from "@/lib/gestures";
import { cn } from "@/lib/utils";

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
};

function EdgeButton({
  side,
  onClick,
  disabled,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * 0.28,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-50 no-print",
        side === "left" ? "left-5" : "right-5",
        "w-10 h-10 hidden pointer-fine:flex items-center justify-center rounded-full",
        "border-2 border-neutral-300 bg-white/90 backdrop-blur-xs",
        "opacity-0 hover:opacity-100 disabled:opacity-0",
        "hover:border-neutral-600 hover:shadow-xs",
        "transition-opacity duration-300 group"
      )}
    >
      <Icon
        size={16}
        className="text-neutral-600 group-hover:text-neutral-950 transition-colors"
      />
    </motion.button>
  );
}

/**
 * Always-visible controls for touch devices.
 *
 * The edge buttons above are hover-revealed, which means they never appear on a
 * phone — so touch gets its own thumb-reachable bar with 44px targets.
 */
function TouchBar({
  current,
  total,
  onPrev,
  onNext,
  onOpenOverview,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenOverview: () => void;
}) {
  const btn =
    "w-11 h-11 flex items-center justify-center rounded-full text-neutral-700 disabled:text-neutral-300 active:bg-neutral-100 transition-colors";

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden pointer-coarse:flex no-print">
      <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm shadow-sm px-1.5 py-1">
        <button onClick={onPrev} disabled={current === 0} aria-label="Previous slide" className={btn}>
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onOpenOverview}
          aria-label="Show all slides"
          className="px-3 h-11 flex items-center gap-2 rounded-full text-neutral-700 active:bg-neutral-100 transition-colors"
        >
          <span className="font-mono text-xs tracking-[0.2em] tabular-nums">
            {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <LayoutGrid size={15} className="text-neutral-400" />
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          aria-label="Next slide"
          className={btn}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/**
 * A 16:9 slide scaled into a portrait phone lands around 0.2× — body text ends
 * up ~5px tall and the deck stops being reviewable. Landscape roughly doubles
 * it, so nudge rather than silently rendering something unreadable.
 */
function RotateHint() {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 hidden pointer-coarse:portrait:flex no-print px-4">
      <div className="flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm shadow-sm px-4 py-2.5">
        <RotateCcw size={14} className="text-neutral-400 shrink-0" />
        <span className="text-[11px] text-neutral-500 leading-tight">
          Putar HP ke landscape biar kebaca
        </span>
      </div>
    </div>
  );
}

function Overview({
  open,
  onOpenChange,
  current,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-md" />
        <Dialog.Content
          className="fixed inset-0 z-[70] overflow-y-auto p-6 sm:p-10 focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <Dialog.Title className="font-mono text-xs tracking-[0.35em] uppercase text-neutral-500">
                All Slides
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close overview"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-500 hover:text-neutral-950 transition-colors"
              >
                <X size={17} />
              </Dialog.Close>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => onSelect(i)}
                  className={cn(
                    "group text-left rounded-2xl border p-5 transition-colors",
                    "aspect-video flex flex-col justify-between",
                    i === current
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-500 bg-white"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-neutral-400 tabular-nums">
                      {String(slide.id).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-300">
                      {slide.layout}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold leading-tight text-neutral-900 line-clamp-2">
                      {slide.title}
                    </p>
                    {slide.subtitle && (
                      <p className="text-sm text-neutral-500 font-light mt-1.5 line-clamp-2">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-wider text-neutral-400">
              <span>← → / SPACE — navigate</span>
              <span>HOME / END — first / last</span>
              <span>O — overview</span>
              <span>ESC — close</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback((next: number) => {
    setCurrent((prev) => {
      const clamped = Math.max(0, Math.min(next, SLIDES.length - 1));
      setDir(clamped >= prev ? 1 : -1);
      return clamped;
    });
  }, []);

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      // Let the dialog own the keyboard while it's open.
      if (overviewOpen) return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
        case "o":
        case "O":
        case "g":
        case "G":
          e.preventDefault();
          setOverviewOpen(true);
          break;
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [next, prev, goTo, total, overviewOpen]);

  // ── Swipe ───────────────────────────────────────────────────────
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const intent = resolveSwipe(t.clientX - start.x, t.clientY - start.y);

    if (intent === "next") next();
    else if (intent === "prev") prev();
  };

  return (
    <div
      className="relative h-full overflow-hidden bg-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress — scaleX avoids layout reflow */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] w-full bg-neutral-900 z-50 no-print"
        style={{ transformOrigin: "left" }}
        animate={{ scaleX: (current + 1) / total }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <Stage>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: EASE }}
            className="absolute inset-0"
          >
            <Slide slide={SLIDES[current]} />
          </motion.div>
        </AnimatePresence>
      </Stage>

      <EdgeButton side="left" onClick={prev} disabled={current === 0} />
      <EdgeButton side="right" onClick={next} disabled={current === total - 1} />

      <TouchBar
        current={current}
        total={total}
        onPrev={prev}
        onNext={next}
        onOpenOverview={() => setOverviewOpen(true)}
      />

      <RotateHint />

      {/* Desktop counter — doubles as the overview trigger */}
      <button
        onClick={() => setOverviewOpen(true)}
        aria-label="Show all slides"
        className="fixed bottom-6 right-8 z-50 hidden pointer-fine:flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors no-print"
      >
        <span className="text-xs font-mono tracking-[0.3em] tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <LayoutGrid size={13} className="opacity-0 hover:opacity-100 transition-opacity" />
      </button>

      <Overview
        open={overviewOpen}
        onOpenChange={setOverviewOpen}
        current={current}
        onSelect={(i) => {
          goTo(i);
          setOverviewOpen(false);
        }}
      />
    </div>
  );
}
