"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Lightbulb,
  BrainCircuit,
  Rocket,
} from "lucide-react";
import type { SlideAccent, SlideData } from "@/lib/slides-data";
import { cn } from "@/lib/utils";

/*
  Everything here is authored against the fixed 1920×1080 stage (see stage.tsx),
  so sizes are literal px and there are no responsive variants — the stage is
  always exactly 1920 wide, and Stage scales the result to fit the viewport.
*/

/** Shared cubic-bezier. Motion v13 types easing as a strict 4-tuple. */
export const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.52, ease: EASE } },
};

const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } },
};

const cardFade: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

const ACCENT_ICONS: Record<SlideAccent, ReactNode> = {
  brain: <BrainCircuit size={72} className="text-neutral-300 mb-10" strokeWidth={1.5} />,
  rocket: <Rocket size={72} className="text-neutral-300 mb-10" strokeWidth={1.5} />,
};

function GhostNumber({ num, size }: { num: string; size: number }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-[-0.06em] right-[-0.02em] font-black text-neutral-900/5 leading-none select-none pointer-events-none z-0"
      style={{ fontSize: size }}
    >
      {num}
    </div>
  );
}

function SlideNumber({ num, className }: { num: string; className?: string }) {
  return (
    <motion.p
      variants={fadeUp}
      className={cn(
        "font-mono text-deck-mono tracking-[0.35em] uppercase text-neutral-500",
        className
      )}
    >
      {num}
    </motion.p>
  );
}

function BodyLines({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line === "") return <div key={i} className="h-3" />;

        const isCheckmark = line.startsWith("✓") || line.startsWith("✅");
        const isCross = line.startsWith("❌");
        const isIndented = line.startsWith("  ");

        // Strip the emoji prefix so the icon replaces it rather than doubling up.
        const displayText = isCheckmark || isCross ? line.slice(2) : line;

        if (isCheckmark) {
          return (
            <div key={i} className="flex gap-3 items-start">
              <CheckCircle2 size={24} className="shrink-0 mt-[5px] text-emerald-500" />
              <p className="text-deck-body leading-relaxed text-emerald-700">{displayText}</p>
            </div>
          );
        }

        if (isCross) {
          return (
            <div key={i} className="flex gap-3 items-start">
              <XCircle size={24} className="shrink-0 mt-[5px] text-red-500" />
              <p className="text-deck-body leading-relaxed text-red-600">{displayText}</p>
            </div>
          );
        }

        return (
          <p
            key={i}
            className={cn(
              "text-deck-body leading-relaxed",
              isIndented ? "pl-7 text-neutral-500" : "text-neutral-700"
            )}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function PointCard({ point, index }: { point: { label: string; items: string[] }; index: number }) {
  const labelIsCheck = point.label.startsWith("✓") || point.label.startsWith("✅");
  const labelIsCross = point.label.startsWith("❌");
  const cleanLabel = labelIsCheck || labelIsCross ? point.label.slice(2) : point.label;

  return (
    <motion.div
      variants={cardFade}
      className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 hover:border-neutral-400 hover:bg-white transition-colors duration-200 group relative overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute top-5 right-6 font-black text-neutral-200 text-4xl leading-none select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {point.label && (
        <div className="flex items-center gap-2 mb-5 pr-14">
          {labelIsCheck && <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />}
          {labelIsCross && <XCircle size={18} className="shrink-0 text-red-400" />}
          <p className="text-deck-card-label font-black tracking-[0.15em] uppercase text-neutral-500 group-hover:text-neutral-700 transition-colors leading-tight">
            {cleanLabel}
          </p>
        </div>
      )}
      <ul className="space-y-3">
        {point.items.map((it, j) => {
          const isCheck = it.startsWith("✓") || it.startsWith("✅");
          const displayIt = isCheck ? it.slice(2) : it;
          const isNumbered = /^\d+\./.test(it);
          return (
            <li
              key={j}
              className={cn(
                "text-deck-card-item leading-snug flex gap-2 items-start",
                isCheck ? "text-emerald-700 font-medium" : "text-neutral-700"
              )}
            >
              {isCheck ? (
                <CheckCircle2 size={19} className="shrink-0 mt-0.5 text-emerald-500" />
              ) : !isNumbered ? (
                <ChevronRight size={19} className="shrink-0 mt-0.5 text-neutral-400" />
              ) : null}
              <span>{displayIt}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 border-l-4 border-neutral-400 pl-6 py-1">
      <Lightbulb size={24} className="shrink-0 mt-0.5 text-neutral-500" />
      <p className="text-deck-callout font-semibold text-neutral-700 leading-relaxed">{text}</p>
    </div>
  );
}

function HeroLayout({ slide }: { slide: SlideData }) {
  const num = String(slide.id).padStart(2, "0");
  return (
    <div className="relative h-full flex flex-col justify-center px-32 overflow-hidden">
      <GhostNumber num={num} size={576} />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[65%]"
      >
        <SlideNumber num={num} className="mb-14" />
        {slide.accent && <motion.div variants={fadeUp}>{ACCENT_ICONS[slide.accent]}</motion.div>}
        <motion.h1
          variants={fadeUp}
          className="text-deck-hero font-black leading-[0.9] tracking-[-0.03em] text-neutral-950 mb-10"
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p
            variants={fadeUp}
            className="text-deck-hero-sub text-neutral-600 font-light leading-relaxed max-w-4xl"
          >
            {slide.subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

function WideLayout({ slide }: { slide: SlideData }) {
  const { title, subtitle, body, bodyExtra, points } = slide;
  const num = String(slide.id).padStart(2, "0");
  const count = points?.length ?? 0;

  return (
    <div className="relative h-full flex flex-col overflow-hidden px-24 py-16">
      <GhostNumber num={num} size={422} />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col h-full"
      >
        <div className="flex items-end gap-12 mb-10 pb-8 border-b-2 border-neutral-300">
          <SlideNumber num={num} className="shrink-0 pb-1" />
          <div>
            <motion.h1
              variants={fadeUp}
              className="text-deck-title-wide font-black leading-tight tracking-tight text-neutral-950"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} className="text-deck-sub text-neutral-600 font-light mt-2">
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="mb-8">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {points && (
          <motion.div
            variants={cardStagger}
            className={cn(
              "grid gap-5 flex-1 min-h-0",
              count === 2 && "grid-cols-2",
              count === 3 && "grid-cols-3",
              count === 4 && "grid-cols-2",
              count >= 5 && "grid-cols-3"
            )}
          >
            {points.map((point, i) => (
              <PointCard key={i} point={point} index={i} />
            ))}
          </motion.div>
        )}

        {typeof bodyExtra === "string" && (
          <motion.div variants={fadeUp} className="mt-7">
            <Callout text={bodyExtra} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function SplitLayout({ slide }: { slide: SlideData }) {
  const { body, bodyExtra, points, code, example } = slide;
  const num = String(slide.id).padStart(2, "0");

  return (
    <div className="relative h-full grid overflow-hidden" style={{ gridTemplateColumns: "5fr 7fr" }}>
      <GhostNumber num={num} size={422} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-between px-20 py-16 border-r-2 border-neutral-300 relative z-10"
      >
        <SlideNumber num={num} />
        <div className="flex-1 flex flex-col justify-center py-10">
          <motion.h1
            variants={fadeUp}
            className="text-deck-title font-black leading-none tracking-tight text-neutral-950 mb-7"
          >
            {slide.title}
          </motion.h1>
          {slide.subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-deck-sub text-neutral-600 font-light leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>
          )}
        </div>
        <div />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="overflow-y-auto px-16 py-16 flex flex-col justify-center relative z-10 scrollbar-none"
      >
        {example && (
          <motion.div variants={fadeUp} className="mb-10">
            <div
              className={cn(
                "inline-flex items-center gap-3 rounded-full px-6 py-3 border text-deck-card-item font-medium",
                example.type === "bad"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              )}
            >
              {example.type === "bad" ? (
                <XCircle size={20} className="text-red-500 shrink-0" />
              ) : (
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
              )}
              <span className="text-deck-card-label font-black tracking-[0.15em] uppercase opacity-60">
                {example.type === "bad" ? "Before" : "After"}
              </span>
              <span className="w-px h-5 bg-current opacity-20 shrink-0" />
              <span className="leading-snug">{example.label}</span>
            </div>
          </motion.div>
        )}

        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="mb-10">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {code && (
          <motion.div variants={fadeUp} className="mb-10">
            <pre className="font-mono text-deck-code bg-neutral-950 text-neutral-100 rounded-3xl px-10 py-7 leading-relaxed whitespace-pre-wrap border border-neutral-700">
              {code}
            </pre>
          </motion.div>
        )}

        {points && points.length > 0 && (
          <motion.div
            variants={cardStagger}
            className={cn("grid gap-5 mb-10", points.length === 1 ? "grid-cols-1" : "grid-cols-2")}
          >
            {points.map((point, i) => (
              <PointCard key={i} point={point} index={i} />
            ))}
          </motion.div>
        )}

        {bodyExtra && (
          <motion.div variants={fadeUp}>
            {typeof bodyExtra === "string" ? (
              <Callout text={bodyExtra} />
            ) : (
              <BodyLines lines={bodyExtra} />
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

const LAYOUTS = {
  hero: HeroLayout,
  wide: WideLayout,
  split: SplitLayout,
} as const;

export default function Slide({ slide }: { slide: SlideData }) {
  const Layout = LAYOUTS[slide.layout];
  return <Layout slide={slide} />;
}
