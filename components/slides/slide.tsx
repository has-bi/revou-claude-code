"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Lightbulb,
  BrainCircuit,
  Rocket,
} from "lucide-react";
import { SlideData } from "@/lib/slides-data";
import { cn } from "@/lib/utils";
import { IterationLoopDiagram } from "./graphics";

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

const BOLD_LINE_RE = /^(The result:|What Claude built:|What user actually needed:|What you'll see:|What happens:|Claude's interview|Claude's response|Result:|Kalau nggak lolos:)/;

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
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line === "") return <div key={i} className="h-2" />;

        const isCheckmark = line.startsWith("✓") || line.startsWith("✅");
        const isCross = line.startsWith("❌");
        const isIndented = line.startsWith("  ");
        const isBetter = line.startsWith("✅ Better");
        const isBold = BOLD_LINE_RE.test(line);

        // Strip emoji prefix so the icon replaces it
        const displayText = (isCheckmark || isCross) ? line.slice(2) : line;

        if (isCheckmark) {
          return (
            <div key={i} className={cn("flex gap-2 items-start", isBetter && "mt-2")}>
              <CheckCircle2
                size={15}
                className={cn("shrink-0 mt-[3px]", isBetter ? "text-emerald-600" : "text-emerald-500")}
              />
              <p className={cn(
                "text-base leading-relaxed text-emerald-700",
                isBetter && "font-bold text-neutral-900"
              )}>
                {displayText}
              </p>
            </div>
          );
        }

        if (isCross) {
          return (
            <div key={i} className="flex gap-2 items-start">
              <XCircle size={15} className="shrink-0 mt-[3px] text-red-500" />
              <p className="text-base leading-relaxed text-red-600">{displayText}</p>
            </div>
          );
        }

        return (
          <p
            key={i}
            className={cn(
              "text-base leading-relaxed",
              isIndented ? "pl-5 text-neutral-500" : "text-neutral-700",
              isBold && "font-semibold text-neutral-900 mt-3 first:mt-0"
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
  const cleanLabel = (labelIsCheck || labelIsCross) ? point.label.slice(2) : point.label;

  return (
    <motion.div
      variants={cardFade}
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 hover:border-neutral-400 hover:bg-white transition-all duration-200 group relative overflow-hidden"
    >
      <span className="absolute top-3 right-4 font-black text-neutral-200 text-xl leading-none select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      {point.label && (
        <div className="flex items-center gap-1.5 mb-3 pr-8">
          {labelIsCheck && <CheckCircle2 size={12} className="shrink-0 text-emerald-500" />}
          {labelIsCross && <XCircle size={12} className="shrink-0 text-red-400" />}
          <p className="text-xs font-black tracking-[0.15em] uppercase text-neutral-500 group-hover:text-neutral-700 transition-colors leading-tight">
            {cleanLabel}
          </p>
        </div>
      )}
      <ul className="space-y-2">
        {point.items.map((it, j) => {
          const isCheck = it.startsWith("✓") || it.startsWith("✅");
          const displayIt = isCheck ? it.slice(2) : it;
          const isNumbered = /^\d+\./.test(it);
          return (
            <li
              key={j}
              className={cn(
                "text-sm leading-snug flex gap-1.5 items-start",
                isCheck ? "text-emerald-700 font-medium" : "text-neutral-700"
              )}
            >
              {isCheck ? (
                <CheckCircle2 size={13} className="shrink-0 mt-0.5 text-emerald-500" />
              ) : !isNumbered ? (
                <ChevronRight size={13} className="shrink-0 mt-0.5 text-neutral-400" />
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
    <div className="flex items-start gap-2 border-l-[3px] border-neutral-400 pl-4 py-0.5">
      <Lightbulb size={14} className="shrink-0 mt-0.5 text-neutral-500" />
      <p className="text-sm font-semibold text-neutral-700 leading-relaxed">{text}</p>
    </div>
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

const HERO_ICONS: Record<number, ReactNode> = {
  1:  <BrainCircuit size={52} className="text-neutral-300 mb-8" strokeWidth={1.5} />,
  20: <Rocket size={52} className="text-neutral-300 mb-8" strokeWidth={1.5} />,
};

function HeroLayout({ slide }: { slide: SlideData }) {
  const num = String(slide.id).padStart(2, "0");
  return (
    <div className="relative h-screen flex flex-col justify-center px-14 lg:px-20 overflow-hidden">
      <GhostNumber num={num} size="30vw" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 max-w-[65%]">
        <motion.p variants={fadeUp} className="font-mono text-sm tracking-[0.35em] uppercase text-neutral-500 mb-10">
          {num}
        </motion.p>
        {HERO_ICONS[slide.id] && (
          <motion.div variants={fadeUp}>{HERO_ICONS[slide.id]}</motion.div>
        )}
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
        {slide.id === 20 && (
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
          <motion.div variants={fadeUp} className="mb-5">
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
          <motion.div variants={fadeUp} className="mt-4">
            <Callout text={bodyExtra} />
          </motion.div>
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
          <motion.div variants={fadeUp} className="mt-5">
            <BodyLines lines={body} />
          </motion.div>
        )}
        {bodyExtra && typeof bodyExtra === "string" && (
          <motion.div variants={fadeUp} className="mt-5">
            <Callout text={bodyExtra} />
          </motion.div>
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

function SplitLayout({ slide }: { slide: SlideData }) {
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
        {example && (
          <motion.div variants={fadeUp} className="mb-7">
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 border text-sm font-medium",
              example.type === "bad"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            )}>
              {example.type === "bad"
                ? <XCircle size={14} className="text-red-500 shrink-0" />
                : <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              }
              <span className="text-xs font-black tracking-[0.15em] uppercase opacity-60">
                {example.type === "bad" ? "Before" : "After"}
              </span>
              <span className="w-px h-3.5 bg-current opacity-20 shrink-0" />
              <span className="leading-snug">{example.label}</span>
            </div>
          </motion.div>
        )}

        {body && body.length > 0 && (
          <motion.div variants={fadeUp} className="mb-7">
            <BodyLines lines={body} />
          </motion.div>
        )}

        {code && (
          <motion.div variants={fadeUp} className="mb-7">
            <pre className="font-mono text-[0.78rem] bg-neutral-950 text-neutral-100 rounded-2xl px-7 py-5 leading-relaxed whitespace-pre-wrap border border-neutral-700">
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
              <Callout text={bodyExtra} />
            ) : (
              <BodyLines lines={bodyExtra as string[]} />
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function Slide({ slide }: { slide: SlideData }) {
  const isHero = slide.id === 1 || slide.id === 20;

  if (isHero) return <HeroLayout slide={slide} />;

  if (slide.id === 5)  return <SplitLayout slide={slide} />;
  if (slide.id === 14) return <GraphicSplitLayout slide={slide} graphic={<IterationLoopDiagram />} />;

  const isWide = !!slide.points && slide.points.length >= 2;
  if (isWide) return <WideLayout slide={slide} />;

  return <SplitLayout slide={slide} />;
}
