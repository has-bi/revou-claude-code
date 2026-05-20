"use client";

import { motion } from "framer-motion";

const FONT = `var(--font-plus-jakarta-sans), system-ui, sans-serif`;

const C = {
  bg: "#f5f5f5",
  bgMid: "#e5e5e5",
  border: "#d4d4d4",
  borderMid: "#a3a3a3",
  line: "#737373",
  text: "#171717",
  textSub: "#525252",
  white: "#ffffff",
  good: "#f0fdf4",
  goodBorder: "#86efac",
  goodText: "#14532d",
  bad: "#fef2f2",
  badBorder: "#fca5a5",
  badText: "#7f1d1d",
};

// ─── Primitives ───────────────────────────────────────────────────────────────

function AnimLine({
  d, delay = 0, duration = 0.45, stroke = C.line, strokeWidth = 2,
}: {
  d: string; delay?: number; duration?: number; stroke?: string; strokeWidth?: number;
}) {
  return (
    <motion.path
      d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ pathLength: { duration, delay, ease: "easeInOut" }, opacity: { duration: 0.01, delay } }}
    />
  );
}

function AnimDot({ cx, cy, r = 4, delay = 0, fill = C.line }: {
  cx: number; cy: number; r?: number; delay?: number; fill?: string;
}) {
  return (
    <motion.circle cx={cx} cy={cy} r={r} fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.2 }}
    />
  );
}

function AnimBox({
  x, y, w, h, label, sub, delay = 0, fill = C.bg, stroke = C.border,
  textFill = C.text, subFill = C.textSub, bold = false, rx = 10,
}: {
  x: number; y: number; w: number; h: number; label: string; sub?: string;
  delay?: number; fill?: string; stroke?: string; textFill?: string;
  subFill?: string; bold?: boolean; rx?: number;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.35 }}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={cx} y={sub ? cy - 7 : cy + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize={13} fontWeight={bold ? 700 : 600} fontFamily={FONT} fill={textFill}>
        {label}
      </text>
      {sub && (
        <text x={cx} y={cy + 9} textAnchor="middle" dominantBaseline="middle"
          fontSize={11} fontFamily={FONT} fill={subFill}>
          {sub}
        </text>
      )}
    </motion.g>
  );
}

function AnimArrow({ x, y, direction = "right", delay = 0 }: {
  x: number; y: number; direction?: "right" | "down"; delay?: number;
}) {
  const pts = direction === "right"
    ? `${x},${y - 5} ${x + 9},${y} ${x},${y + 5}`
    : `${x - 5},${y} ${x},${y + 9} ${x + 5},${y}`;
  return (
    <motion.polygon points={pts} fill={C.line}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.15 }}
    />
  );
}

// ─── Misalignment Diagram ─────────────────────────────────────────────────────

export function MisalignmentDiagram() {
  return (
    <svg viewBox="0 0 500 132" className="w-full h-full" style={{ overflow: "visible" }}>
      <AnimBox x={8} y={46} w={120} h={42} label="Your Request" sub={'"Build me X"'} delay={0.1} />
      <AnimLine d="M 128 67 L 198 67" delay={0.3} />
      <AnimArrow x={198} y={67} delay={0.45} />
      <AnimBox x={198} y={46} w={108} h={42} label="Claude" delay={0.5}
        fill={C.bgMid} stroke={C.borderMid} bold />
      <AnimLine d="M 306 67 L 348 28" delay={0.7} duration={0.3} />
      <AnimLine d="M 306 67 L 348 104" delay={0.75} duration={0.3} />
      <AnimArrow x={348} y={28} delay={0.85} />
      <AnimArrow x={348} y={104} delay={0.9} />
      <AnimBox x={348} y={8} w={144} h={40}
        label="What Claude built" sub="technically works"
        delay={0.95} fill={C.bad} stroke={C.badBorder} textFill={C.badText} subFill="#b91c1c" />
      <AnimBox x={348} y={84} w={144} h={40}
        label="What you needed" sub="actually solves it"
        delay={1.05} fill={C.good} stroke={C.goodBorder} textFill={C.goodText} subFill="#15803d" />
      <motion.text x={306} y={76} textAnchor="middle" fontSize={10} fontFamily={FONT}
        fill={C.textSub} fontStyle="italic"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        misalignment
      </motion.text>
    </svg>
  );
}

// ─── Decision Tree Diagram ────────────────────────────────────────────────────

export function DecisionTreeDiagram() {
  // x = center - half box width (150/2 = 75)
  const branches = [
    { x: 5,   label: "Data Sources?",  sub: "Excel · API · DB" },
    { x: 185, label: "Output Format?", sub: "PDF · Email · Dashboard" },
    { x: 365, label: "When to Run?",   sub: "Manual · Scheduled · Event" },
  ];

  return (
    <svg viewBox="0 0 520 178" className="w-full h-full" style={{ overflow: "visible" }}>
      <AnimBox x={160} y={12} w={200} h={46} label="Automate Weekly Report"
        delay={0.1} fill={C.bgMid} stroke={C.borderMid} bold />
      <AnimLine d="M 260 58 L 260 90" delay={0.35} />
      <AnimLine d="M 80 90 L 440 90" delay={0.5} duration={0.4} />
      <AnimDot cx={80} cy={90} r={4} delay={0.7} />
      <AnimDot cx={260} cy={90} r={4} delay={0.7} />
      <AnimDot cx={440} cy={90} r={4} delay={0.7} />
      <AnimLine d="M 80 90 L 80 122" delay={0.75} />
      <AnimLine d="M 260 90 L 260 122" delay={0.8} />
      <AnimLine d="M 440 90 L 440 122" delay={0.85} />
      {branches.map((b, i) => (
        <AnimBox key={i} x={b.x} y={122} w={150} h={44}
          label={b.label} sub={b.sub} delay={0.95 + i * 0.1} />
      ))}
      <motion.text x={260} y={174} textAnchor="middle" fontSize={11}
        fontFamily={FONT} fill={C.textSub} fontStyle="italic"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        Resolve every branch before writing code
      </motion.text>
    </svg>
  );
}

// ─── Interview Flow Diagram ───────────────────────────────────────────────────

export function InterviewFlowDiagram() {
  const nodes = [
    { label: "Your Problem", sub: "vague idea" },
    { label: "grill-me", sub: "15–50 questions", accent: true },
    { label: "Shared Clarity", sub: "every branch resolved" },
    { label: "Build", sub: "with confidence" },
  ];
  const boxW = 116, boxH = 50, gap = 20;
  const total = nodes.length * boxW + (nodes.length - 1) * gap;
  const startX = (540 - total) / 2;

  return (
    <svg viewBox="0 0 540 82" className="w-full h-full" style={{ overflow: "visible" }}>
      {nodes.map((n, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <g key={i}>
            <AnimBox
              x={x} y={8} w={boxW} h={boxH}
              label={n.label} sub={n.sub}
              delay={0.1 + i * 0.12}
              fill={n.accent ? C.bgMid : C.bg}
              stroke={n.accent ? C.borderMid : C.border}
              bold={n.accent}
            />
            {i < nodes.length - 1 && (
              <>
                <AnimLine
                  d={`M ${x + boxW} ${8 + boxH / 2} L ${x + boxW + gap} ${8 + boxH / 2}`}
                  delay={0.3 + i * 0.12} duration={0.25}
                />
                <AnimArrow x={x + boxW + gap} y={8 + boxH / 2} delay={0.42 + i * 0.12} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Output Flow Diagram ──────────────────────────────────────────────────────

export function OutputFlowDiagram() {
  // x = center - half box width (150/2 = 75)
  const artifacts = [
    { x: 5,   label: "System Flowchart", sub: "data · users · decisions" },
    { x: 185, label: "Scope of Work",    sub: "requirements · phases" },
    { x: 365, label: "Shared Vocabulary", sub: "terms · edge cases" },
  ];

  return (
    <svg viewBox="0 0 520 162" className="w-full h-full" style={{ overflow: "visible" }}>
      <AnimBox x={160} y={12} w={200} h={44} label="grill-me Session"
        delay={0.1} fill={C.bgMid} stroke={C.borderMid} bold />
      <AnimLine d="M 260 56 L 260 84" delay={0.35} />
      <AnimLine d="M 80 84 L 440 84" delay={0.5} duration={0.4} />
      <AnimDot cx={80} cy={84} delay={0.7} />
      <AnimDot cx={260} cy={84} delay={0.7} />
      <AnimDot cx={440} cy={84} delay={0.7} />
      <AnimLine d="M 80 84 L 80 110" delay={0.75} />
      <AnimLine d="M 260 84 L 260 110" delay={0.8} />
      <AnimLine d="M 440 84 L 440 110" delay={0.85} />
      {artifacts.map((a, i) => (
        <AnimBox key={i} x={a.x} y={110} w={150} h={44}
          label={a.label} sub={a.sub} delay={0.95 + i * 0.1} />
      ))}
    </svg>
  );
}

// ─── Daily Workflow Diagram ───────────────────────────────────────────────────

export function DailyWorkflowDiagram() {
  const nodes = [
    { label: "Linear",       sub: "pick task",        accent: false },
    { label: "Claude Code",  sub: "open session",     accent: true  },
    { label: "Skills",       sub: "load workflow",    accent: false },
    { label: "GitHub",       sub: "PR & review",      accent: false },
    { label: "Vercel",       sub: "deploy & ship",    accent: false },
  ];
  const boxW = 96, boxH = 52, gap = 16;
  const total = nodes.length * boxW + (nodes.length - 1) * gap;
  const startX = (560 - total) / 2;

  return (
    <svg viewBox="0 0 560 88" className="w-full h-full" style={{ overflow: "visible" }}>
      {nodes.map((n, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <g key={i}>
            <AnimBox
              x={x} y={8} w={boxW} h={boxH}
              label={n.label} sub={n.sub}
              delay={0.1 + i * 0.1}
              fill={n.accent ? C.bgMid : C.bg}
              stroke={n.accent ? C.borderMid : C.border}
              bold={n.accent}
            />
            {i < nodes.length - 1 && (
              <>
                <AnimLine
                  d={`M ${x + boxW} ${8 + boxH / 2} L ${x + boxW + gap} ${8 + boxH / 2}`}
                  delay={0.25 + i * 0.1} duration={0.2}
                />
                <AnimArrow x={x + boxW + gap} y={8 + boxH / 2} delay={0.35 + i * 0.1} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Workshop Timeline Diagram ────────────────────────────────────────────────

export function WorkshopTimelineDiagram() {
  const steps = [
    { x: 70,  time: "10 min", title: "Identify",  desc: "Pick a real problem from your work" },
    { x: 280, time: "30 min", title: "Grill",      desc: "Walk every branch as a group" },
    { x: 490, time: "10 min", title: "Document",   desc: "SOW bullets + rough flowchart" },
  ];
  const lineY = 64;

  return (
    <svg viewBox="0 0 560 148" className="w-full h-full" style={{ overflow: "visible" }}>
      <AnimLine d={`M ${steps[0].x} ${lineY} L ${steps[2].x} ${lineY}`}
        delay={0.1} duration={0.6} strokeWidth={2} stroke={C.borderMid} />
      {steps.map((s, i) => (
        <g key={i}>
          <motion.text x={s.x} y={lineY - 30} textAnchor="middle"
            fontSize={11} fontFamily={FONT} fill={C.textSub}
            fontWeight={500} letterSpacing="0.05em"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15 }}>
            {s.time}
          </motion.text>
          <motion.line x1={s.x} y1={lineY - 14} x2={s.x} y2={lineY - 2}
            stroke={C.borderMid} strokeWidth={1.5}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 + i * 0.15 }} />
          <motion.circle cx={s.x} cy={lineY} r={22} fill={C.text}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }} />
          <motion.text x={s.x} y={lineY + 1} textAnchor="middle" dominantBaseline="middle"
            fontSize={16} fontWeight={800} fontFamily={FONT} fill={C.white}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.15 }}>
            {i + 1}
          </motion.text>
          <motion.text x={s.x} y={lineY + 38} textAnchor="middle"
            fontSize={14} fontWeight={700} fontFamily={FONT} fill={C.text}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.15 }}>
            {s.title}
          </motion.text>
          <motion.text x={s.x} y={lineY + 56} textAnchor="middle"
            fontSize={11} fontFamily={FONT} fill={C.textSub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + i * 0.15 }}>
            {s.desc}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}
