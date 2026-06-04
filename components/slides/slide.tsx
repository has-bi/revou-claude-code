"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SlideData } from "@/lib/slides-data";
import { cn } from "@/lib/utils";
import {
  AssistantComponentsDiagram,
  IterationLoopDiagram,
  DeliverablesDiagram,
} from "./graphics";

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

const BOLD_LINE_RE = /^(The result:|What Claude built:|What user actually needed:|What you'll see:|What happens:|Claude's interview|Claude's response|Result:)/;

function GhostNumber({ num, size = "28vw" }: { num: string; size?: string }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-[-0.06em] right-[-0.02em] font-black text-neutral-900/[0.05] leading-none select-none pointer-events-none z-0"
      style={{ fontSize: size }}
    >
      {num}
    </div>
  );
}

function BodyLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => {
        const isCheckmark = line.startsWith("✓") || line.startsWith("✅");
        const isCross = line.startsWith("❌");
        const isIndented = line.startsWith("  ");
        const isBetter = line.startsWith("✅ Better");
        const isBold = BOLD_LINE_RE.test(line);
        return (
          <p
            key={i}
            className={cn(
              "text-base leading-relaxed",
              isIndented && "pl-5 text-neutral-500",
              !isIndented && "text-neutral-700",
              isCheckmark && "text-emerald-700",
              isCross && "text-red-600",
              isBetter && "font-bold text-neutral-900 mt-2",
              isBold && "font-semibold text-neutral-900 mt-3 first:mt-0"
            )}
          >
            {line}
          </p>
        );
      })}
    </>
  );
}

function PointCard({ point, index }: { point: { label: string; items: string[] }; index: number }) {
  return (
    <motion.div
      variants={cardFade}
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:border-neutral-400 hover:bg-white transition-all duration-200 group relative overflow-hidden"
    >
      <span className="absolute top-3 right-4 font-black text-neutral-200 text-xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      {point.label && (
        <p className="text-xs font-black tracking-[0.15em] uppercase text-neutral-500 group-hover:text-neutral-700 transition-colors mb-3 pr-8">
          {point.label}
        </p>
      )}
      <ul className="space-y-2">
        {point.items.map((it, j) => (
          <li
            key={j}
            className={cn(
              "text-sm text-neutral-700 leading-snug flex gap-1.5 items-start",
              it.startsWith("✓") && "text-emerald-700 font-medium"
            )}
          >
            {!it.match(/^(\d+\.|✓|✅)/) && (
              <span className="text-neutral-400 mt-0.5 shrink-0 leading-none">—</span>
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Shared left column used by both split layout variants
function SlideLeftColumn({ slide, children }: { slide: SlideData; children?: ReactNode }) {
  const num = String(slide.id).padStart(2, "0");
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-between px-12 py-10 border-r-2 border-neutral-300 relative z-10"
    >
      <motion.p variants={fadeUp} className="font-mono text-sm tracking-[0.35em] uppercase text-neutral-500">
        {num}
      </motion.p>
      <div className="flex-1 flex flex-col justify-center py-6">
        <motion.h1
          variants={fadeUp}
          className="font-black leading-[1.0] tracking-[-0.025em] text-neutral-950 mb-5"
          style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p variants={fadeUp} className="text-base text-neutral-600 font-light leading-relaxed">
            {slide.subtitle}
          </motion.p>
        )}
        {children}
      </div>
      <div />
    </motion.div>
  );
}

function HeroLayout({ slide }: { slide: SlideData }) {
  const num = String(slide.id).padStart(2, "0");
  return (
    <div className="relative h-screen flex flex-col justify-center px-14 lg:px-20 overflow-hidden">
      <GhostNumber num={num} size="30vw" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 max-w-[65%]">
        <motion.p variants={fadeUp} className="font-mono text-sm tracking-[0.35em] uppercase text-neutral-500 mb-10">
          {num}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-black leading-[0.9] tracking-[-0.03em] text-neutral-950 mb-8"
          style={{ fontSize: "clamp(3.5rem, 6.5vw, 6rem)" }}
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p variants={fadeUp} className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-lg">
            {slide.subtitle}
          </motion.p>
        )}
        {slide.id === 18 && (
          <motion.div variants={fadeUp} className="mt-14">
            <div className="w-12 h-[3px] bg-neutral-900" />
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
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 flex flex-col h-full">
        <div className="flex items-end gap-8 mb-7 pb-6 border-b-2 border-neutral-300">
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm tracking-[0.35em] uppercase text-neutral-500 shrink-0 pb-0.5"
          >
            {num}
          </motion.p>
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-black leading-tight tracking-[-0.025em] text-neutral-950"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} className="text-base text-neutral-600 font-light mt-1">
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

        {points && (
          <motion.div
            variants={cardStagger}
            className={cn(
              "grid gap-3 flex-1 min-h-0",
              count === 2 && "grid-cols-2",
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
            className="mt-4 text-sm font-semibold text-neutral-700 border-l-[3px] border-neutral-500 pl-4 py-0.5"
          >
            {bodyExtra}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

function GraphicSplitLayout({ slide, graphic }: { slide: SlideData; graphic: ReactNode }) {
  const { body, bodyExtra } = slide;
  const num = String(slide.id).padStart(2, "0");

  return (
    <div className="relative h-screen grid overflow-hidden" style={{ gridTemplateColumns: "5fr 7fr" }}>
      <GhostNumber num={num} />
      <SlideLeftColumn slide={slide}>
        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="mt-5 space-y-1">
            <BodyLines lines={body} />
          </motion.div>
        )}
        {bodyExtra && typeof bodyExtra === "string" && (
          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm font-semibold text-neutral-700 border-l-[3px] border-neutral-500 pl-4 py-0.5"
          >
            {bodyExtra}
          </motion.p>
        )}
      </SlideLeftColumn>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center px-12 py-10 relative z-10"
      >
        <div className="w-full">{graphic}</div>
      </motion.div>
    </div>
  );
}

function SplitLayout({ slide, graphic }: { slide: SlideData; graphic?: ReactNode }) {
  const { body, bodyExtra, points, code, example } = slide;
  const num = String(slide.id).padStart(2, "0");

  return (
    <div className="relative h-screen grid overflow-hidden" style={{ gridTemplateColumns: "5fr 7fr" }}>
      <GhostNumber num={num} />
      <SlideLeftColumn slide={slide} />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="overflow-y-auto px-10 py-10 flex flex-col justify-center relative z-10 scrollbar-none"
      >
        {graphic && <div className="mb-7">{graphic}</div>}

        {example && (
          <motion.div
            variants={fadeUp}
            className={cn(
              "inline-flex items-center gap-3 self-start rounded-full px-5 py-2.5 mb-7 border-2 text-sm font-medium",
              example.type === "bad"
                ? "bg-red-50 border-red-300 text-red-900"
                : "bg-emerald-50 border-emerald-300 text-emerald-900"
            )}
          >
            <span className="text-xs font-black tracking-[0.15em] uppercase opacity-70">
              {example.type === "bad" ? "Before" : "After"}
            </span>
            <span className="w-px h-3.5 bg-current opacity-30 shrink-0" />
            <span className="leading-snug">{example.label}</span>
          </motion.div>
        )}

        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="space-y-2 mb-7">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {code && (
          <motion.div variants={fadeUp} className="mb-7">
            <pre className="font-mono text-[0.88rem] bg-neutral-950 text-neutral-100 rounded-2xl px-7 py-6 leading-loose whitespace-pre-wrap border border-neutral-700">
              {code}
            </pre>
          </motion.div>
        )}

        {points && points.length > 0 && (
          <motion.div
            variants={cardStagger}
            className={cn(
              "grid gap-3 mb-7",
              points.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            {points.map((point, i) => (
              <PointCard key={i} point={point} index={i} />
            ))}
          </motion.div>
        )}

        {bodyExtra && (
          <motion.div variants={fadeUp}>
            {typeof bodyExtra === "string" ? (
              <p className="text-base font-semibold text-neutral-800 border-l-[3px] border-neutral-500 pl-4 py-0.5 leading-relaxed">
                {bodyExtra}
              </p>
            ) : (
              <div className="space-y-2">
                <BodyLines lines={bodyExtra as string[]} />
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function Slide({ slide }: { slide: SlideData }) {
  const isHero = slide.id === 1 || slide.id === 18;

  if (isHero) return <HeroLayout slide={slide} />;

  if (slide.id === 5)  return <GraphicSplitLayout slide={slide} graphic={<AssistantComponentsDiagram />} />;
  if (slide.id === 12) return <GraphicSplitLayout slide={slide} graphic={<IterationLoopDiagram />} />;
  if (slide.id === 16) return <GraphicSplitLayout slide={slide} graphic={<DeliverablesDiagram />} />;

  const isWide = !!slide.points && slide.points.length >= 2;
  if (isWide) return <WideLayout slide={slide} />;

  return <SplitLayout slide={slide} />;
}
