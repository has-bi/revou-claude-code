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
  // ── Section 1: Pembuka ────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Simple Analytics with AI",
    subtitle: "GrabFood Case Study — Dari Query ke Prediksi",
  },

  // ── Section 2: Konteks & Agenda ───────────────────────────────────────────────

  {
    id: 2,
    title: "Di Mana Kita Sekarang",
    subtitle: "Week 2 sampai sekarang — satu case study berlanjut",
    points: [
      {
        label: "Weeks 2–4 — Define → Diagnose → Visualize",
        items: [
          "Week 2: Identified problem — 25% late orders, $630K/month",
          "Week 3: Root cause — prep time (41%), travel (31%)",
          "Week 4: Visualized insights — dashboard + story deck",
        ],
      },
      {
        label: "Week 6 — Build AI Assistant",
        items: [
          "Built GPT assistant yang bisa jawab pertanyaan tentang data",
          "System prompt + harness engineering",
          "Test 10+ questions, validate every answer",
        ],
      },
      {
        label: "Week 7 — Simple Analytics + Predictions (TODAY)",
        items: [
          "Dari query (apa yang terjadi) → predict (apa yang AKAN terjadi)",
          "Pattern discovery + risk scoring + what-if scenarios",
          "Masih no coding — GPT + Excel only",
        ],
      },
    ],
    bodyExtra: "Goal hari ini: predict which orders will be late BEFORE they happen.",
  },

  {
    id: 3,
    title: "Agenda Hari Ini",
    subtitle: "120 menit — no coding required",
    points: [
      {
        label: "Part 1 — 30 min: Key Concepts + Demo",
        items: [
          "Querying vs Predicting — apa bedanya?",
          "4 tipe simple analytics",
          "Live demo: GPT finds patterns → Excel formula",
          "Cara validate AI predictions (CRITICAL)",
        ],
      },
      {
        label: "Part 2 — 30 min: Hands-On GrabFood",
        items: [
          "Pattern discovery di GrabFood dataset",
          "Build risk score formula di Excel",
          "What-if scenarios: mana intervensi terbaik?",
          "Validate setiap result — no trust without verification",
        ],
      },
      {
        label: "Part 3 — 60 min: Capstone Work Session",
        items: [
          "Apply ke data capstone lo sendiri",
          "Pattern → formula → what-if",
          "Document insights untuk deliverable",
        ],
      },
    ],
  },

  // ── Section 3: Konsep Kunci ───────────────────────────────────────────────────

  {
    id: 4,
    title: "Querying vs Predicting",
    subtitle: "Dua hal beda — dua tujuan beda",
    points: [
      {
        label: "Week 6 — Query Data",
        items: [
          '"Which restaurants are slowest?"',
          "Jawaban: lookup dari historical data",
          "Use case: diagnosis, reporting, investigation",
          "Timing: reaktif — setelah masalah terjadi",
        ],
      },
      {
        label: "Week 7 — Predict Outcomes",
        items: [
          '"Which orders WILL be late?"',
          "Jawaban: pattern + formula → flag in advance",
          "Use case: prevention, proactive intervention",
          "Timing: proaktif — sebelum masalah terjadi",
        ],
      },
    ],
    bodyExtra: "Shift mindset: dari 'apa yang salah?' → 'apa yang akan salah?' — dan cegah sebelum terjadi.",
  },

  {
    id: 5,
    title: "Apa yang Kita Lakuin",
    subtitle: "Set expectations — ini bukan ML class",
    points: [
      {
        label: "✓ Yang kita lakuin",
        items: [
          "✓ Pattern discovery — ask GPT to find patterns",
          "✓ Trend forecasting — predict next period",
          "✓ Risk scoring — flag high-risk items in Excel",
          "✓ What-if scenarios — simulate interventions",
        ],
      },
      {
        label: "❌ Yang kita nggak lakuin",
        items: [
          "Build ML models (no scikit-learn)",
          "Write Python or R code",
          "Train neural networks",
          "Need weeks of data prep",
        ],
      },
    ],
    bodyExtra: "Traditional ML = weeks of work. Simple AI Analytics = hours. Results: comparable for most business decisions.",
  },

  {
    id: 6,
    title: "4 Tipe Simple Analytics",
    subtitle: "Pakai GPT buat keempatnya — no coding",
    points: [
      {
        label: "① Pattern Discovery",
        items: [
          "Temukan pola yang mungkin lo miss",
          '"What patterns predict late deliveries?"',
          "Output: thresholds + late rate % per pattern",
        ],
      },
      {
        label: "② Trend Forecasting",
        items: [
          "Prediksi performa ke depan dari historical data",
          '"If this trend continues, what happens next month?"',
          "Output: predicted rate + key driver",
        ],
      },
      {
        label: "③ Risk Scoring",
        items: [
          "Flag high-risk items sebelum mereka fail",
          '"Create an Excel formula to score late risk"',
          "Output: High/Medium/Low risk per row",
        ],
      },
      {
        label: "④ What-If Scenarios",
        items: [
          "Simulasi intervensi dan hitung impact-nya",
          '"If prep time drops 10 min, how many orders saved?"',
          "Output: orders saved + estimated cost savings",
        ],
      },
    ],
  },

  // ── Section 4: Deep Dive Per Tipe ─────────────────────────────────────────────

  {
    id: 7,
    title: "Type 1 — Pattern Discovery",
    subtitle: "Temukan pola yang lo mungkin miss",
    body: [
      "Minta GPT untuk analyze dataset — bukan cuma ngambil angka.",
      "GPT akan suggest thresholds dan correlations dari data lo.",
      "Lo tinggal verify hasilnya di Excel.",
    ],
    code: `Prompt:
"Find the top 3 patterns that predict late deliveries.
For each pattern:
  - Description and threshold (e.g., prep_time > 30)
  - Late rate for orders matching this pattern
  - Sample size (must be ≥ 30 orders)
  - Confidence: High / Medium / Low"

After GPT responds:
→ Open Excel, filter rows matching the pattern
→ Calculate actual late rate:
     =COUNTIFS(range,criteria,is_late,"TRUE") / COUNTIF(range,criteria)
→ Compare to GPT's number — should be within 5%`,
  },

  {
    id: 8,
    title: "Type 2 — Trend Forecasting",
    subtitle: "Prediksi apa yang akan terjadi",
    body: [
      "Gunakan historical patterns untuk estimasi performa ke depan.",
      "Bukan model yang presisi — tapi cukup buat business decisions.",
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
  },

  {
    id: 9,
    title: "Type 3 — Risk Scoring",
    subtitle: "Flag high-risk orders sebelum terlambat",
    body: [
      "Buat formula sederhana di Excel untuk label setiap order.",
      "Tempel hasilnya ke dashboard Week 4 sebagai layer baru.",
    ],
    code: `Prompt:
"Create a risk scoring formula for Excel.

Available columns: prep_time, distance_km, hour, zone
Output: 'High Risk' or 'Low Risk' per order row

Give me the exact Excel IF formula I can paste."

Example output from GPT:
=IF(OR(B2>30, C2>8,
   AND(D2>=18, E2="South Jakarta")),
   "High Risk", "Low Risk")

Accuracy on data: ~75%

Verify:
  High Risk rows → late rate should be > 70%
  Low Risk rows  → late rate should be < 25%`,
  },

  {
    id: 10,
    title: "Type 4 — What-If Scenarios",
    subtitle: "Simulasi intervensi dan bandingkan ROI-nya",
    body: [
      "Bandingkan 3 skenario: mana yang paling worth it untuk dieksekusi?",
      "GPT menghitung impact — lo verify logika dan angkanya.",
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

→ Pick the scenario with highest ROI`,
  },

  // ── Section 5: GrabFood End-to-End ───────────────────────────────────────────

  {
    id: 11,
    title: "GrabFood: End-to-End",
    subtitle: "Dari prompt ke Excel formula — 3 langkah",
    body: [
      "① Ask GPT:",
      '  "Which factors predict late orders? Give me Excel thresholds."',
      "② GPT responds:",
      '  "Late if: prep_time > 30 OR distance > 8 km — accuracy ~75%"',
      "③ Paste ke Excel dan validate:",
    ],
    code: `=IF(OR(B2>30, C2>8), "High Risk", "Low Risk")

Validate (wajib dilakukan):
  Filter High Risk → count is_late=TRUE → target ≥ 70%
  Filter Low Risk  → count is_late=TRUE → target ≤ 25%

If accuracy < 60%:
  → Ask GPT to recalculate with different thresholds
  → Test 2–3 iterations until it's reliable`,
    bodyExtra: "No coding. Prompting + Excel. Workflow yang sama berlaku buat capstone data lo.",
  },

  // ── Section 6: Validation ─────────────────────────────────────────────────────

  {
    id: 12,
    title: "Validation — 4 Langkah Wajib",
    subtitle: "Never trust AI predictions without verification",
    points: [
      {
        label: "① Ask GPT to explain logic",
        items: [
          '"Give predictions AND explain the formula you used"',
          "Kalau GPT nggak bisa explain → don't trust the output",
          "Good answer includes thresholds + sample sizes",
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
        label: "④ Sense-check with domain",
        items: [
          '"More prep time = better on-time rate" → WRONG',
          "Kalau GPT bilang hal yang nggak logis — challenge it",
          "Your domain knowledge > GPT's statistics",
        ],
      },
    ],
    bodyExtra: "Minimum: manually verify 3 predictions before using any result in your deliverable.",
  },

  {
    id: 13,
    title: "4 Kesalahan AI yang Sering Muncul",
    subtitle: "Kenali, cek, dan challenge GPT",
    points: [
      {
        label: "Hallucinated Numbers",
        items: [
          '"There are 15 restaurants" — lo cuma punya 8',
          "Fix: count di Excel, lalu kasih tau GPT angka yang benar",
        ],
      },
      {
        label: "Wrong Math",
        items: [
          '"25% of 10,000 = 2,000" — harusnya 2,500',
          "Fix: hitung manual, koreksi GPT, minta recalculate",
        ],
      },
      {
        label: "Impossible Results",
        items: [
          '"Late rate will drop to -5%"',
          "Fix: flag as error, ask GPT to reconsider constraints",
        ],
      },
      {
        label: "Circular Logic",
        items: [
          '"Late orders are late because they are delayed"',
          "Fix: rephrase — ask for root cause, not description",
        ],
      },
    ],
    bodyExtra: "Rule: kalau ada yang aneh dari GPT — screenshot, note it, crosscheck di Excel. Jangan abaikan.",
  },

  {
    id: 14,
    title: "The 3-Step Workflow",
    subtitle: "Repeat ini untuk setiap analytic yang lo buat",
    body: [
      "Berlaku untuk semua 4 tipe analytics:",
      "",
      "1. Ask GPT for the analysis or formula",
      "  Specify: columns available, output format, min sample size",
      "2. GPT gives you the pattern or Excel formula",
      "  Save the exact response — jangan paraphrase",
      "3. YOU verify it in Excel",
      "  Filter → count → calculate % → compare to GPT",
    ],
    bodyExtra: "GPT adalah fast analyst. YOU adalah decision-maker. Jangan sampai kebalik.",
  },

  // ── Section 7: Capstone ───────────────────────────────────────────────────────

  {
    id: 15,
    title: "Capstone Work Session",
    subtitle: "Apply ke data capstone lo sendiri — 60 menit",
    points: [
      {
        label: "0–15 min — Pattern Discovery",
        items: [
          "Pakai Week 6 AI assistant di capstone data lo",
          "Prompt: top 5 patterns related to Week 2 problem",
          "Verify setiap pattern di Excel sebelum lanjut",
        ],
      },
      {
        label: "15–35 min — Prediction Formula",
        items: [
          "Ask GPT: create Excel formula for risk scoring",
          "Implement sebagai new column di Excel",
          "Validate: high-risk rows harus punya higher problem rate",
          "Target accuracy: >60%",
        ],
      },
      {
        label: "35–50 min — What-If Scenarios",
        items: [
          "Simulasi 3 intervensi (A, B, C)",
          "Hitung ROI setiap scenario",
          "Pilih scenario dengan impact terbesar",
        ],
      },
      {
        label: "50–60 min — Document Insights",
        items: [
          "Top 3 patterns + prediction formula (dengan accuracy %)",
          "Best what-if scenario + expected impact",
          "1–2 new slides ditambahkan ke story deck Week 4",
        ],
      },
    ],
  },

  {
    id: 16,
    title: "Deliverables",
    subtitle: "Submit sebelum deadline — 3 file",
    points: [
      {
        label: "① Analytics Summary Doc",
        items: [
          "Top 3–5 patterns + accuracy % masing-masing",
          "Prediction formula + validation evidence (Excel screenshots)",
          "What-if scenario results + best recommendation",
          "Format: PDF, 2–3 halaman",
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
          "Extend deck dari Week 4 — jangan replace",
          "Stakeholder-ready: angka konkret, bukan generik",
        ],
      },
    ],
  },

  // ── Section 8: Preview & Close ────────────────────────────────────────────────

  {
    id: 17,
    title: "Week 8 Preview",
    subtitle: "Automation with n8n — Still No Code",
    body: [
      "Minggu depan: automate workflow yang sudah kita build.",
      "  • Connect Excel → GPT → email stakeholders otomatis",
      "  • Build alerts: high-risk orders detected → trigger notification",
      "  • Schedule: weekly summary dikirim tiap Senin pagi",
      "Tool: n8n — visual workflow builder.",
      "  • Drag & drop nodes, no coding",
      "  • Integrate dengan GPT, Gmail, Sheets, Slack",
      "  • Trigger on schedule atau event",
    ],
    bodyExtra: "Same no-code approach. Bigger automation. See you next week.",
  },

  {
    id: 18,
    title: "Let's Predict",
    subtitle: "Data lo udah ada. Pattern-nya udah ada. Tinggal validate.",
  },
];
