"use client";

import { useEffect, useState } from "react";
import Slide from "@/components/slides/slide";
import { SLIDES } from "@/lib/slides-data";

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrent((c) => Math.min(c + 1, total - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrent((c) => Math.max(c - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrent(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrent(total - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Slide content */}
      <Slide slide={SLIDES[current]} />

      {/* Left nav button */}
      <button
        onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
        disabled={current === 0}
        aria-label="Previous slide"
        className="fixed left-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 disabled:opacity-10 transition-opacity duration-200 p-3 rounded-full hover:bg-neutral-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right nav button */}
      <button
        onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
        disabled={current === total - 1}
        aria-label="Next slide"
        className="fixed right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 disabled:opacity-10 transition-opacity duration-200 p-3 rounded-full hover:bg-neutral-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4">
        <span className="text-xs text-neutral-400 tracking-wide">Claude Code for Productivity</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-neutral-400">
            {current + 1} / {total}
          </span>
          <span className="text-xs text-neutral-300">← → Space · Home End</span>
        </div>
      </footer>
    </div>
  );
}
