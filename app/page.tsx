"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slide from "@/components/slides/slide";
import { SLIDES } from "@/lib/slides-data";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : 64, opacity: 0 }),
};

function NavButton({
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
      className={[
        "fixed top-1/2 -translate-y-1/2 z-50",
        side === "left" ? "left-5" : "right-5",
        "w-10 h-10 flex items-center justify-center rounded-full",
        "border-2 border-neutral-300 bg-white/90 backdrop-blur-sm",
        "opacity-0 hover:opacity-100 disabled:opacity-0",
        "hover:border-neutral-600 hover:shadow-sm",
        "transition-opacity duration-300 group",
      ].join(" ")}
    >
      {side === "left"
        ? <ChevronLeft size={16} className="text-neutral-600 group-hover:text-neutral-950 transition-colors" />
        : <ChevronRight size={16} className="text-neutral-600 group-hover:text-neutral-950 transition-colors" />
      }
    </motion.button>
  );
}

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const total = SLIDES.length;

  const goTo = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (current < total - 1) goTo(current + 1);
      } else if (e.key === "ArrowLeft") {
        if (current > 0) goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, total]);

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Progress bar — scaleX avoids layout reflow */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] w-full bg-neutral-900 z-50"
        style={{ transformOrigin: "left" }}
        animate={{ scaleX: (current + 1) / total }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Slides */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Slide slide={SLIDES[current]} />
        </motion.div>
      </AnimatePresence>

      <NavButton side="left" onClick={() => goTo(current - 1)} disabled={current === 0} />
      <NavButton side="right" onClick={() => goTo(current + 1)} disabled={current === total - 1} />

      {/* Slide counter */}
      <div className="fixed bottom-6 right-8 z-50 select-none pointer-events-none">
        <span className="text-xs font-mono tracking-[0.3em] text-neutral-500">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
