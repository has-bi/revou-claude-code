"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "@/lib/slides-data";
import { Slide } from "@/components/slides/slide";

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          setCurrent(0);
          break;
        case "End":
          e.preventDefault();
          setCurrent(total - 1);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, total]);

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden flex flex-col">
      {/* Slide content */}
      <div className="flex-1 overflow-hidden">
        <Slide slide={slides[current]} />
      </div>

      {/* Left nav button */}
      <button
        onClick={goPrev}
        disabled={current === 0}
        aria-label="Previous slide"
        className="fixed left-6 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 disabled:opacity-10 transition-opacity duration-200 text-gray-500 p-2 rounded-full hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right nav button */}
      <button
        onClick={goNext}
        disabled={current === total - 1}
        aria-label="Next slide"
        className="fixed right-6 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 disabled:opacity-10 transition-opacity duration-200 text-gray-500 p-2 rounded-full hover:bg-gray-100 disabled:cursor-not-allowed"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Footer */}
      <footer className="flex items-center justify-between px-16 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-300 tracking-wide">
          Claude Code for Productivity
        </span>
        <span className="text-xs text-gray-400 tabular-nums">
          {current + 1} / {total}
        </span>
        <span className="text-xs text-gray-300">
          ← → Space · Home · End
        </span>
      </footer>
    </div>
  );
}
