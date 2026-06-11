export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  body?: string[];
  bodyExtra?: string | string[];
  points?: { label: string; items: string[] }[];
  code?: string;
  example?: { type: "good" | "bad"; label: string; description?: string };
}

export const SLIDES: SlideData[] = [
  // ── Section 1: Opening ────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Simple Analytics with AI",
    subtitle: "GrabFood Case Study — From Queries to Predictions",
  },

  // ── Section 2: Context & Agenda ───────────────────────────────────────────────

  {
    id: 2,
    title: "Where We Are Now",
    subtitle: "Weeks 2 through today — one continuous case study",
    points: [
      {
        label: "Weeks 2–4 — Define → Diagnose → Visualize",
        items: [
          "Week 2: Found the problem — 25% late orders, $630K/month lost",
          "Week 3: Root cause — prep time (41%), travel distance (31%)",
          "Week 4: Built visuals — dashboard + story deck",
        ],
      },
      {
        label: "Week 6 — Build an AI Assistant",
        items: [
          "Built a GPT assistant that answers data questions",
          "System prompt + harness engineering",
          "Tested 10+ questions and validated every answer",
        ],
      },
      {
        label: "Week 7 — Simple Analytics + Predictions (TODAY)",
        items: [
          "From querying (what happened) → predicting (what WILL happen)",
          "Pattern discovery + risk scoring + what-if scenarios",
          "Still no coding — GPT + Excel only",
        ],
      },
    ],
    bodyExtra: "Today's goal: predict which orders will be late BEFORE they happen.",
  },

  {
    id: 3,
    title: "Today's Agenda",
    subtitle: "120 minutes — no coding required",
    points: [
      {
        label: "Part 1 — 30 min: Concepts + Demo",
        items: [
          "Querying vs Predicting — what's the difference?",
          "4 types of simple analytics",
          "Live demo: GPT finds patterns → Excel formula",
          "How to validate AI predictions (CRITICAL skill)",
        ],
      },
      {
        label: "Part 2 — 30 min: GrabFood Hands-On",
        items: [
          "Pattern discovery on the GrabFood dataset",
          "Build a risk score formula in Excel",
          "What-if scenarios: which intervention wins?",
          "Validate every result — no trust without verification",
        ],
      },
      {
        label: "Part 3 — 60 min: Capstone Work Session",
        items: [
          "Apply the same workflow to your own capstone data",
          "Pattern → formula → what-if",
          "Document insights for your deliverable",
        ],
      },
    ],
  },

  // ── Section 3: Key Concepts ───────────────────────────────────────────────────

  {
    id: 4,
    title: "Querying vs Predicting",
    subtitle: "Two different goals — two different mindsets",
    points: [
      {
        label: "Week 6 — Query Data",
        items: [
          '"Which restaurants are slowest?"',
          "Answer: look up from historical data",
          "Use case: diagnosis, reporting, investigation",
          "Timing: reactive — after the problem happens",
        ],
      },
      {
        label: "Week 7 — Predict Outcomes",
        items: [
          '"Which orders WILL be late?"',
          "Answer: find a pattern → flag it in advance",
          "Use case: prevention, proactive action",
          "Timing: proactive — before the problem happens",
        ],
      },
    ],
    bodyExtra: "Mindset shift: from 'what went wrong?' → 'what will go wrong?' — and stop it before it does.",
  },

  {
    id: 5,
    title: "What We Do — and Don't",
    subtitle: "Setting expectations — this is not an ML course",
    points: [
      {
        label: "✓ What we do",
        items: [
          "✓ Pattern discovery — ask GPT to find patterns in your data",
          "✓ Trend forecasting — predict what happens next period",
          "✓ Risk scoring — flag high-risk items with an Excel formula",
          "✓ What-if scenarios — simulate interventions and compare",
        ],
      },
      {
        label: "❌ What we don't do",
        items: [
          "Build machine learning models (no scikit-learn)",
          "Write Python or R code",
          "Train neural networks",
          "Spend weeks on data preparation",
        ],
      },
    ],
    bodyExtra: "Traditional ML = weeks of work. Simple AI Analytics = hours. Results: good enough for most business decisions.",
  },

  {
    id: 6,
    title: "4 Types of Simple Analytics",
    subtitle: "Use GPT for all four — no coding needed",
    points: [
      {
        label: "① Pattern Discovery",
        items: [
          "Uncover patterns you might have missed",
          '"What patterns predict late deliveries?"',
          "Output: thresholds + late rate % per pattern",
        ],
      },
      {
        label: "② Trend Forecasting",
        items: [
          "Project future performance from historical data",
          '"If this trend continues, what happens next month?"',
          "Output: predicted rate + key driver",
        ],
      },
      {
        label: "③ Risk Scoring",
        items: [
          "Flag high-risk items before they fail",
          '"Create an Excel formula to score late-delivery risk"',
          "Output: risk score 0–100 per order row",
        ],
      },
      {
        label: "④ What-If Scenarios",
        items: [
          "Simulate interventions and calculate their ROI",
          '"If prep time drops 10 min, how many orders are saved?"',
          "Output: orders saved + estimated cost savings",
        ],
      },
    ],
    bodyExtra: "Tip: start with Pattern Discovery — the patterns you find feed directly into Risk Scoring and What-If.",
  },

  // ── Section 4: Dataset Structure ──────────────────────────────────────────────

  {
    id: 7,
    title: "Your Dataset at a Glance",
    subtitle: "9,200 GrabFood orders — Feb–Mar 2026",
    points: [
      {
        label: "Key columns for your formula",
        items: [
          "B — order_time: timestamp (use HOUR(B2) for dinner rush)",
          "E — customer_zone: Central / South / East / West / North Jakarta",
          "F — distance_km: delivery distance in km",
          "G — prep_time_min: kitchen prep time in minutes",
          "K — late_status: 'Late' or 'On-time' ← truth label",
        ],
      },
      {
        label: "Your task — Column O",
        items: [
          "O — risk_score: EMPTY, you fill this with your formula",
          "Formula target: numeric score from 0 to 100",
          "Score > 70 → predicted Late (target: >70% accurate)",
          "Score < 30 → predicted On-time",
          "Copy formula from O2 down to O9201",
        ],
      },
    ],
    bodyExtra: "Tip: the three strongest predictors in this dataset are prep_time_min (col G), distance_km (col F), and customer_zone (col E).",
  },

  // ── Section 5: Deep Dive Per Type ─────────────────────────────────────────────

  {
    id: 8,
    title: "Type 1 — Pattern Discovery",
    subtitle: "Find patterns you might have missed",
    body: [
      "Ask GPT to analyze your dataset — not just retrieve numbers.",
      "GPT will suggest thresholds and correlations from your data.",
      "You verify every result in Excel before trusting it.",
    ],
    code: `Prompt:
"Find the top 3 patterns that predict late deliveries.
For each pattern:
  - Description and threshold (e.g., prep_time > 30)
  - Late rate for orders matching this pattern
  - Sample size (must be ≥ 30 orders)
  - Confidence: High / Medium / Low"

After GPT responds → verify in Excel:
  =COUNTIFS(K:K,"Late",G:G,">"&30) / COUNTIF(G:G,">"&30)
  (swap G:G and 30 for whatever column + threshold GPT gave you)

Compare to GPT's number — should be within 5%`,
    bodyExtra: "Tip: always ask GPT for the sample size. A pattern based on 5 orders is not reliable — insist on ≥ 30.",
  },

  {
    id: 9,
    title: "Type 2 — Trend Forecasting",
    subtitle: "Predict what's going to happen next",
    body: [
      "Use historical patterns to estimate future performance.",
      "This isn't a precise model — but it's accurate enough for business decisions.",
    ],
    code: `Prompt:
"Based on Feb 9–11 data, predict the late rate for
Feb 12–14 if current patterns continue.

Assumptions:
  - Same restaurants, zones, driver count
  - No operational changes made

Give:
  - Predicted late rate (%)
  - Key driver of the trend
  - Confidence level (High / Medium / Low)"

Use the output to:
  → Create urgency with leadership (show the forecast)
  → Set improvement targets (need to reverse the trend)
  → Track progress after interventions`,
    bodyExtra: "Tip: always state your assumptions explicitly in the prompt. GPT's forecast is only as good as the assumptions you give it.",
  },

  {
    id: 10,
    title: "Type 3 — Risk Scoring",
    subtitle: "Flag high-risk orders before it's too late",
    body: [
      "Build a numeric formula (0–100) in Excel to score every order.",
      "Paste it into column O, then copy down to all 9,200 rows.",
    ],
    code: `Prompt:
"Create a risk scoring formula for Excel.

Columns: G=prep_time_min, F=distance_km,
         E=customer_zone, B=order_time
Output: numeric score 0–100 in cell O2

Give me the exact Excel formula I can paste."

Example output from GPT:
=MIN(100, MAX(0,
  (G2-10)*2 +
  (F2-3)*3 +
  IF(E2="South Jakarta",10,0) +
  IF(HOUR(B2)>=18,8,0)
))

Validate in Excel:
  Score > 70 → filter K column → late rate should be > 70%
  Score < 30 → filter K column → late rate should be < 30%`,
    bodyExtra: "Tip: if accuracy is below 60%, ask GPT to adjust the weights — test 2–3 versions until it's reliable.",
  },

  {
    id: 11,
    title: "Type 4 — What-If Scenarios",
    subtitle: "Simulate interventions and compare ROI",
    body: [
      "Compare 3 scenarios side-by-side: which one is most worth executing?",
      "GPT calculates the impact — you verify the logic and the numbers.",
    ],
    code: `Prompt:
"If we reduce prep time by 10 minutes for all restaurants,
how many of the 2,300 late orders would be prevented?

Show:
  - Number of orders that become on-time
  - New overall late rate (baseline: 25%)
  - Estimated monthly savings ($630K baseline)"

Test 3 scenarios and compare:
  A. Reduce prep time by 10 min across all restaurants
  B. Add 20% more drivers during dinner rush (6–8pm)
  C. Remove 2 worst-performing restaurants from peak hours

→ Pick the scenario with the highest ROI`,
    bodyExtra: "Tip: frame every scenario with a concrete baseline. 'Save $X' is more convincing to stakeholders than 'reduce late rate by Y%'.",
  },

  // ── Section 6: GrabFood End-to-End ───────────────────────────────────────────

  {
    id: 12,
    title: "GrabFood: End-to-End",
    subtitle: "From prompt to Excel formula — 3 steps",
    body: [
      "① Ask GPT:",
      '  "Which factors in columns E, F, G predict late orders? Give me a 0–100 score formula."',
      "② GPT responds:",
      '  "Score = prep_time × 2 + distance × 3 + zone bonus + hour bonus"',
      "③ Paste into column O and validate:",
    ],
    code: `=MIN(100, MAX(0,
  (G2-10)*2 +
  (F2-3)*3 +
  IF(E2="South Jakarta",10,0) +
  IF(HOUR(B2)>=18,8,0)
))

Validate (required):
  Filter col O > 70 → check col K → target ≥ 70% "Late"
  Filter col O < 30 → check col K → target ≤ 30% "Late"

If accuracy < 60%:
  → Ask GPT to adjust weights and retry`,
    bodyExtra: "No coding. Prompting + Excel. The same workflow applies to your own capstone data.",
  },

  // ── Section 7: Validation ─────────────────────────────────────────────────────

  {
    id: 13,
    title: "Validation — 4 Required Steps",
    subtitle: "Never trust AI predictions without verification",
    points: [
      {
        label: "① Ask GPT to explain its logic",
        items: [
          '"Give me predictions AND explain the formula you used"',
          "If GPT can't explain it → don't trust the output",
          "A good answer includes thresholds + sample sizes",
        ],
      },
      {
        label: "② Test on known data",
        items: [
          "Verify in Excel: filter → count → calculate %",
          "Compare to GPT's number — within 5% = trustworthy",
          "Off by >10% → re-prompt or check your data",
        ],
      },
      {
        label: "③ Check for AI mistakes",
        items: [
          "Hallucinated counts — numbers not in your data",
          "Wrong calculations — verify the math manually",
          "Impossible results — negative rate, >100% accuracy",
        ],
      },
      {
        label: "④ Sense-check with domain knowledge",
        items: [
          '"More prep time = better on-time rate" → WRONG',
          "If GPT says something illogical — challenge it",
          "Your domain knowledge > GPT's statistics",
        ],
      },
    ],
    bodyExtra: "Minimum requirement: manually verify 3 predictions before using any result in your deliverable.",
  },

  {
    id: 14,
    title: "4 Common AI Mistakes",
    subtitle: "Learn to spot, check, and challenge GPT",
    points: [
      {
        label: "Hallucinated Numbers",
        items: [
          '"There are 15 restaurants" — but you only have 8',
          "Fix: count in Excel, then correct GPT with the real number",
        ],
      },
      {
        label: "Wrong Math",
        items: [
          '"25% of 10,000 = 2,000" — should be 2,500',
          "Fix: calculate manually, correct GPT, ask it to recalculate",
        ],
      },
      {
        label: "Impossible Results",
        items: [
          '"Late rate will drop to -5%"',
          "Fix: flag as an error, ask GPT to reconsider its constraints",
        ],
      },
      {
        label: "Circular Logic",
        items: [
          '"Late orders are late because they are delayed"',
          "Fix: rephrase — ask for root cause, not a description",
        ],
      },
    ],
    bodyExtra: "Rule: if anything from GPT looks off — screenshot it, note it, cross-check in Excel. Never ignore a red flag.",
  },

  {
    id: 15,
    title: "The 3-Step Workflow",
    subtitle: "Repeat this for every analytic you build",
    body: [
      "Applies to all 4 types of analytics:",
      "",
      "1. Ask GPT for the analysis or formula",
      "  Specify: columns available, output format, minimum sample size",
      "2. GPT gives you the pattern or Excel formula",
      "  Save the exact response — don't paraphrase it",
      "3. YOU verify it in Excel",
      "  Filter → count → calculate % → compare to GPT",
    ],
    bodyExtra: "GPT is a fast analyst. YOU are the decision-maker. Don't let that get reversed.",
  },

  // ── Section 8: Capstone ───────────────────────────────────────────────────────

  {
    id: 16,
    title: "Capstone Work Session",
    subtitle: "Apply the workflow to your own data — 60 minutes",
    points: [
      {
        label: "0–15 min — Pattern Discovery",
        items: [
          "Use your Week 6 AI assistant on your capstone data",
          "Prompt: top 5 patterns related to your Week 2 problem",
          "Verify every pattern in Excel before moving on",
        ],
      },
      {
        label: "15–35 min — Prediction Formula",
        items: [
          "Ask GPT: create an Excel formula for risk scoring",
          "Add it as a new column in your Excel file",
          "Validate: high-risk rows must have a higher problem rate",
          "Target accuracy: > 60%",
        ],
      },
      {
        label: "35–50 min — What-If Scenarios",
        items: [
          "Simulate 3 interventions (A, B, C)",
          "Calculate ROI for each scenario",
          "Choose the one with the biggest impact",
        ],
      },
      {
        label: "50–60 min — Document Insights",
        items: [
          "Top 3 patterns + prediction formula (with accuracy %)",
          "Best what-if scenario + expected impact",
          "Add 1–2 new slides to your Week 4 story deck",
        ],
      },
    ],
  },

  {
    id: 17,
    title: "Deliverables",
    subtitle: "Submit before the deadline — 3 files",
    points: [
      {
        label: "① Analytics Summary Doc",
        items: [
          "Top 3–5 patterns + accuracy % for each",
          "Prediction formula + validation evidence (Excel screenshots)",
          "What-if scenario results + best recommendation",
          "Format: PDF, 2–3 pages",
        ],
      },
      {
        label: "② Updated Excel File",
        items: [
          "New column: risk scores / predictions per row",
          "Validation pivot table: risk category × actual outcome",
          "What-if calculations for all 3 scenarios",
        ],
      },
      {
        label: "③ Updated Story Deck",
        items: [
          "1–2 new slides: predictions + what-if results",
          "Extend your Week 4 deck — don't replace it",
          "Stakeholder-ready: concrete numbers, not generic statements",
        ],
      },
    ],
  },

  // ── Section 9: Preview & Close ────────────────────────────────────────────────

  {
    id: 18,
    title: "Week 8 Preview",
    subtitle: "Automation with n8n — Still No Code",
    body: [
      "Next week: automate the workflow you've already built.",
      "  • Connect Excel → GPT → email stakeholders automatically",
      "  • Build alerts: high-risk orders detected → trigger notification",
      "  • Schedule: weekly summary sent every Monday morning",
      "Tool: n8n — a visual workflow builder.",
      "  • Drag & drop nodes, no coding",
      "  • Integrates with GPT, Gmail, Sheets, Slack",
      "  • Triggers on a schedule or on events",
    ],
    bodyExtra: "Same no-code approach. Bigger automation. See you next week.",
  },

  {
    id: 19,
    title: "Let's Predict",
    subtitle: "Your data is ready. The patterns are there. All that's left is to validate.",
  },
];
