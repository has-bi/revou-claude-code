"use client";

import { motion } from "framer-motion";
import { SlideData } from "@/lib/slides-data";
import { cn } from "@/lib/utils";

// ─── Animation variants ──────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } },
};

const cardFade = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Ghost number ─────────────────────────────────────────────────────────────

function GhostNumber({ num, size = "28vw" }: { num: string; size?: string }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-[-0.06em] right-[-0.02em] font-black text-neutral-900/[0.032] leading-none select-none pointer-events-none z-0"
      style={{ fontSize: size }}
    >
      {num}
    </div>
  );
}

// ─── Body lines renderer ─────────────────────────────────────────────────────

function BodyLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => {
        const isCheckmark = line.startsWith("✓") || line.startsWith("✅");
        const isCross = line.startsWith("❌");
        const isIndented = line.startsWith("  ");
        const isBetter = line.startsWith("✅ Better");
        const isBold = !!line.match(
          /^(The result:|What Claude built:|What user actually needed:|What you'll see:|What happens:|Claude's interview|Claude's response|Result:)/
        );
        return (
          <p
            key={i}
            className={cn(
              "text-sm leading-relaxed",
              isIndented && "pl-5 text-neutral-400",
              !isIndented && "text-neutral-600",
              isCheckmark && "text-emerald-600",
              isCross && "text-red-500",
              isBetter && "font-bold text-neutral-900 mt-2",
              isBold && "font-semibold text-neutral-800 mt-3 first:mt-0"
            )}
          >
            {line}
          </p>
        );
      })}
    </>
  );
}

// ─── Point card ──────────────────────────────────────────────────────────────

function PointCard({ point, index }: { point: { label: string; items: string[] }; index: number }) {
  return (
    <motion.div
      variants={cardFade}
      className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 hover:border-neutral-200 hover:bg-neutral-50 transition-all duration-200 group relative overflow-hidden"
    >
      <span className="absolute top-3 right-4 font-black text-neutral-100 text-xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      {point.label && (
        <p className="text-[10px] font-black tracking-[0.15em] uppercase text-neutral-400 group-hover:text-neutral-600 transition-colors mb-3 pr-8">
          {point.label}
        </p>
      )}
      <ul className="space-y-1.5">
        {point.items.map((it, j) => (
          <li
            key={j}
            className={cn(
              "text-xs text-neutral-500 leading-snug flex gap-1.5 items-start",
              it.startsWith("✓") && "text-emerald-600"
            )}
          >
            {!it.match(/^(\d+\.|✓|✅)/) && (
              <span className="text-neutral-300 mt-0.5 shrink-0 leading-none">—</span>
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Layouts ─────────────────────────────────────────────────────────────────

function HeroLayout({ slide }: { slide: SlideData }) {
  const num = String(slide.id).padStart(2, "0");
  return (
    <div className="relative h-screen flex flex-col justify-center px-14 lg:px-20 overflow-hidden">
      <GhostNumber num={num} size="30vw" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[62%]"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[11px] tracking-[0.35em] uppercase text-neutral-300 mb-10"
        >
          {num}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-black leading-[0.9] tracking-[-0.03em] text-neutral-950 mb-8"
          style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p
            variants={fadeUp}
            className="text-base lg:text-lg text-neutral-400 font-light leading-relaxed max-w-sm"
          >
            {slide.subtitle}
          </motion.p>
        )}
        {slide.id === 15 && (
          <motion.div variants={fadeUp} className="mt-14">
            <div className="w-10 h-[2px] bg-neutral-900" />
          </motion.div>
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
    <div className="relative h-screen flex flex-col overflow-hidden px-12 lg:px-16 py-10">
      <GhostNumber num={num} size="22vw" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col h-full"
      >
        {/* Header row */}
        <div className="flex items-end gap-8 mb-7 pb-6 border-b border-neutral-100">
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.35em] uppercase text-neutral-300 shrink-0 pb-0.5"
          >
            {num}
          </motion.p>
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-black leading-tight tracking-[-0.025em] text-neutral-950"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} className="text-sm text-neutral-400 font-light mt-1">
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="mb-5 space-y-1">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {/* Point cards grid */}
        {points && (
          <motion.div
            variants={cardStagger}
            className={cn(
              "grid gap-3 flex-1 min-h-0",
              count === 3 && "grid-cols-3",
              count === 4 && "grid-cols-2",
              count === 5 && "grid-cols-3",
              count >= 6 && "grid-cols-3"
            )}
          >
            {points.map((point, i) => (
              <PointCard key={i} point={point} index={i} />
            ))}
          </motion.div>
        )}

        {bodyExtra && typeof bodyExtra === "string" && (
          <motion.p
            variants={fadeUp}
            className="mt-4 text-xs font-semibold text-neutral-600 border-l-2 border-neutral-200 pl-3 py-0.5"
          >
            {bodyExtra}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

function SplitLayout({ slide }: { slide: SlideData }) {
  const { title, subtitle, body, bodyExtra, points, code, example } = slide;
  const num = String(slide.id).padStart(2, "0");

  return (
    <div className="relative h-screen grid overflow-hidden" style={{ gridTemplateColumns: "5fr 7fr" }}>
      <GhostNumber num={num} />

      {/* Left: title column */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-between px-12 py-10 border-r border-neutral-100 relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[11px] tracking-[0.35em] uppercase text-neutral-300"
        >
          {num}
        </motion.p>

        <div className="flex-1 flex flex-col justify-center py-6">
          <motion.h1
            variants={fadeUp}
            className="font-black leading-[1.0] tracking-[-0.025em] text-neutral-950 mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.6rem)" }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-sm text-neutral-400 font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div />
      </motion.div>

      {/* Right: content column */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="overflow-y-auto px-10 py-10 flex flex-col justify-center relative z-10 scrollbar-none"
      >
        {/* Example badge */}
        {example && (
          <motion.div
            variants={fadeUp}
            className={cn(
              "inline-flex items-center gap-3 self-start rounded-full px-4 py-2 mb-6 border text-xs font-medium",
              example.type === "bad"
                ? "bg-red-50 border-red-100 text-red-800"
                : "bg-emerald-50 border-emerald-100 text-emerald-800"
            )}
          >
            <span className="text-[10px] font-black tracking-[0.15em] uppercase opacity-50">
              {example.type === "bad" ? "Before" : "After"}
            </span>
            <span className="w-px h-3 bg-current opacity-20 shrink-0" />
            <span className="leading-snug">{example.label}</span>
          </motion.div>
        )}

        {/* Body */}
        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="space-y-1.5 mb-6">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {/* Code block */}
        {code && (
          <motion.div variants={fadeUp} className="mb-6">
            <pre className="font-mono text-[0.76rem] bg-neutral-950 text-neutral-100 rounded-2xl px-7 py-6 leading-loose whitespace-pre-wrap border border-neutral-800">
              {code}
            </pre>
          </motion.div>
        )}

        {/* Point cards */}
        {points && points.length > 0 && (
          <motion.div
            variants={cardStagger}
            className={cn(
              "grid gap-3 mb-6",
              points.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            {points.map((point, i) => (
              <PointCard key={i} point={point} index={i} />
            ))}
          </motion.div>
        )}

        {/* Body extra */}
        {bodyExtra && (
          <motion.div variants={fadeUp}>
            {typeof bodyExtra === "string" ? (
              <p className="text-sm font-semibold text-neutral-700 border-l-2 border-neutral-200 pl-4 py-0.5 leading-relaxed">
                {bodyExtra}
              </p>
            ) : (
              <div className="space-y-1.5">
                <BodyLines lines={bodyExtra as string[]} />
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Slide({ slide }: { slide: SlideData }) {
  const isHero = slide.id === 1 || slide.id === 15;
  const isWide = !!slide.points && slide.points.length >= 3;

  if (isHero) return <HeroLayout slide={slide} />;
  if (isWide) return <WideLayout slide={slide} />;
  return <SplitLayout slide={slide} />;
}
