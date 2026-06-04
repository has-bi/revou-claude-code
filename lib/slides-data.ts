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
    title: "Building Your AI Assistant",
    subtitle: "GrabFood Case Study — Dari Dashboard ke Conversation",
  },

  // ── Section 2: Di Mana Kita Sekarang ─────────────────────────────────────────

  {
    id: 2,
    title: "Di Mana Kita Sekarang",
    subtitle: "Continuing GrabFood: Week 2 → 3 → 4 → 6",
    points: [
      {
        label: "Week 2 — Define the Problem",
        items: [
          "25% of peak-hour orders late",
          "$630K/month in refunds & lost customers",
        ],
      },
      {
        label: "Week 3 — Root Cause",
        items: [
          "Prep time: 41% of delay",
          "Travel time: 31% · Wait time: 14%",
        ],
      },
      {
        label: "Week 4 — Visualize",
        items: [
          "Dashboard + story deck for stakeholders",
          "Pizza Corner slowest: 48 min prep, 65% late",
        ],
      },
    ],
    bodyExtra: "Week 6 → Build an AI assistant that answers questions about the data — without Excel.",
  },

  // ── Section 3: What We're Building ───────────────────────────────────────────

  {
    id: 3,
    title: "Apa yang Kita Bangun",
    subtitle: "AI Assistant = GPT + Your Data + Custom Instructions",
    body: [
      "Nggak semua orang di tim bisa buka Excel atau bikin dashboard.",
      "Tanpa assistant — manager mau tau restoran paling lambat:",
      "  • Buka Excel → filter → group → hitung → sort → format → kirim",
      "  • Takes 20 minutes, requires Excel skills",
      "Dengan assistant — manager cukup ketik:",
      '  "Which restaurants are slowest during dinner rush?"',
      "  • Jawaban spesifik, data-backed, dalam detik",
      "  • No Excel skills needed",
    ],
  },

  {
    id: 4,
    title: "Yang Kita Nggak Lakuin",
    subtitle: "Set Expectations Dulu",
    points: [
      {
        label: "❌ Bukan ini",
        items: [
          "Build ML models from scratch",
          "Write Python code for predictions",
          "Train neural networks",
        ],
      },
      {
        label: "✓ Ini yang kita lakuin",
        items: [
          "✓ Write prompts that tell GPT what to do",
          "✓ Upload data so GPT can read it",
          "✓ Test questions and verify answers",
          "✓ Refine prompts based on results",
        ],
      },
    ],
    bodyExtra: "Tools: ChatGPT Plus · Custom GPTs · Claude.ai Projects (free tier works)",
  },

  // ── Section 4: 4 Komponen ─────────────────────────────────────────────────────

  {
    id: 5,
    title: "4 Komponen AI Assistant",
    subtitle: "Setiap assistant butuh keempat ini",
    points: [
      {
        label: "① Persona — Who is the assistant?",
        items: [
          '"You are a GrabFood operations analyst"',
          "Role · Expertise · Tone (professional, data-driven, concise)",
        ],
      },
      {
        label: "② Tasks — What can it do?",
        items: [
          "Calculate metrics (late rate, avg time)",
          "Compare restaurants, zones, time periods",
          "Analyze delay patterns · Recommend actions",
        ],
      },
      {
        label: "③ Knowledge Sources — What data?",
        items: [
          "Cleaned dataset from Week 3 (CSV)",
          "Data dictionary · Week 2 problem context",
        ],
      },
      {
        label: "④ System Prompt — How to behave?",
        items: [
          "Always cite specific numbers from data",
          "Show calculation steps",
          "Flag uncertainty · Keep responses concise",
        ],
      },
    ],
  },

  // ── Section 5: Prompt Engineering ────────────────────────────────────────────

  {
    id: 6,
    title: "Prompt Engineering Basics",
    subtitle: "Specific, contextual, testable",
    example: { type: "bad", label: '"What\'s the problem with deliveries?" — too vague' },
    body: [
      "❌ Vague: \"What's the problem with deliveries?\"",
      "   Which deliveries? What aspect? What timeframe?",
      "❌ Too broad: \"Tell me about restaurants\"",
      "   Which ones? What about them?",
      "✅ Better: \"What's the late order rate (>30 min) for South Jakarta",
      "   during dinner (6–8pm)? Show your calculation.\"",
      "✅ Better: \"Which 3 restaurants have highest avg prep time?",
      "   Show: name, avg time, order count. Sort descending.\"",
    ],
  },

  {
    id: 7,
    title: "Template Prompt",
    subtitle: "Pakai struktur ini setiap kali tanya ke assistant",
    code: `Question:      [Clear, specific question]
Data source:   [Which file/table]
Timeframe:     [When — e.g. Feb 9–11, peak hours only]
Metric:        [How to calculate — Late = >30 min past estimate]
Output format: [Table, number, list, etc.]

─────────────────────────────────────────────
Example:

Question:  What's the correlation between prep time and late deliveries?
Source:    restaurant_prep.csv joined with orders.csv
Timeframe: Feb 9–11, 2024, all peak hours
Metric:    Late = >30 min past estimated delivery
Output:    Correlation coefficient + plain-language explanation`,
  },

  {
    id: 8,
    title: "System Prompt — Full Template",
    subtitle: "Copy-paste ini ke ChatGPT atau Claude",
    code: `PERSONA:
You are a GrabFood operations analyst specializing in delivery
efficiency. Data-driven, professional, and concise.

YOUR DATA:
9,200 delivery orders · Feb 9–11, 2024 · Peak hours only
Fields: order_id, restaurant, zone, prep_time, delivery_time,
        late_status, customer_rating
Late = >30 min past estimated delivery

KEY CONTEXT:
Late rate: 25% (2,300 of 9,200 orders)
Main cause: prep time (avg 35 min late vs 18 min on-time)
Business impact: $630K/month

TASKS:
1. Calculate metrics (rates, averages, percentiles)
2. Compare performance across restaurants and zones
3. Identify delay patterns and bottlenecks
4. Recommend operational improvements

HOW TO RESPOND:
- Cite specific numbers ("2,300 of 9,200 = 25%")
- Show calculation steps
- Keep responses under 3 paragraphs
- If data is insufficient, say so clearly`,
  },

  // ── Section 6: Steps ──────────────────────────────────────────────────────────

  {
    id: 9,
    title: "Step 1 — Siapkan Data",
    subtitle: "5 menit sebelum buka ChatGPT",
    points: [
      {
        label: "File 1: orders_cleaned.csv",
        items: [
          "Dataset hasil cleaning dari Week 3",
          "File utama yang akan dibaca assistant",
          "Pastikan sudah cleaned — bukan raw data",
        ],
      },
      {
        label: "File 2: summary.txt",
        items: [
          "Context singkat: date range, key metrics, Week 2 findings",
          '"9,200 orders · Feb 9–11 · 25% late · Avg prep 28 min"',
          "Copy-paste dari problem statement Week 2",
        ],
      },
    ],
    bodyExtra: "Jangan skip — GPT nggak punya data lo kalau file belum di-upload.",
  },

  {
    id: 10,
    title: "Step 2 & 3 — Build the Assistant",
    subtitle: "3 opsi tool, pilih yang lo punya akses",
    points: [
      {
        label: "Option A — ChatGPT Plus",
        items: [
          "New chat → upload CSV via paperclip",
          "Paste system prompt → send",
          '"Acknowledge by summarizing the dataset"',
        ],
      },
      {
        label: "Option B — Custom GPTs",
        items: [
          "Explore GPTs → Create",
          "Instructions = system prompt",
          "Knowledge = CSV upload → Save",
        ],
      },
      {
        label: "Option C — Claude Projects (free)",
        items: [
          "Create Project → upload files",
          "Custom instructions = system prompt",
          "Free tier works",
        ],
      },
    ],
    bodyExtra: 'Verify: tanya "What dataset do you have?" — kalau jawab bener, lanjut testing.',
  },

  {
    id: 11,
    title: "Step 4 — Test 10 Questions",
    subtitle: "Cover 4 tipe: metrics, comparisons, patterns, recommendations",
    points: [
      {
        label: "Set 1 — Basic Metrics",
        items: [
          "What's the overall late order rate?",
          "Avg delivery time: late vs on-time orders?",
          "How many restaurants in the dataset?",
        ],
      },
      {
        label: "Set 2 — Comparisons",
        items: [
          "Which 3 restaurants have worst late rate?",
          "Compare late rates: lunch (12–2pm) vs dinner (6–8pm)",
          "Which zone has best performance?",
        ],
      },
      {
        label: "Set 3 — Patterns",
        items: [
          "Correlation between prep time and late deliveries?",
          "Avg prep, travel, wait time for late orders?",
        ],
      },
      {
        label: "Set 4 — Recommendations",
        items: [
          "If prep drops 10 min, how many orders saved?",
          "Fix slow restaurants or improve routing — which first?",
        ],
      },
    ],
  },

  // ── Section 7: Iteration ──────────────────────────────────────────────────────

  {
    id: 12,
    title: "Per Question — Cek 3 Hal",
    subtitle: "Kalau ada yang fail → revise prompt → re-test → log",
    body: [
      "Untuk setiap pertanyaan yang lo test:",
      "✓ Directly answers what was asked? (bukan summary samar-samar)",
      "✓ Calculations shown? (\"2,300 ÷ 9,200 = 25%\" bukan cuma \"25%\")",
      "✓ Verified against Excel? (spot-check minimal 3 jawaban secara manual)",
      "",
      "Kalau nggak lolos:",
      "  • Tambah instruksi spesifik di system prompt",
      "  • Coba rephrase pertanyaannya",
      "  • Log apa yang diubah dan kenapa",
    ],
    bodyExtra: "Minimum 2 iterasi prompt sebelum submit.",
  },

  {
    id: 13,
    title: "Common Pitfalls",
    subtitle: "Yang paling sering bikin stuck",
    points: [
      {
        label: "Lupa upload file",
        items: [
          "GPT nggak punya data lo sampai lo attach",
          "Ini penyebab #1 jawaban yang salah",
        ],
      },
      {
        label: "Prompt terlalu vague",
        items: [
          '"Analyze data" → GPT bingung mau ngapain',
          "Harus ada: role, data description, task list",
        ],
      },
      {
        label: "Nggak verify jawaban",
        items: [
          "GPT bisa confident tapi salah",
          "Always open Excel and spot-check",
        ],
      },
      {
        label: "Cuma test 2–3 pertanyaan",
        items: [
          "Butuh diversity: metrics, comparisons, patterns, rekomendasi",
          "Minimum 10 untuk rubrik full score",
        ],
      },
    ],
  },

  // ── Section 8: Capstone ───────────────────────────────────────────────────────

  {
    id: 14,
    title: "Capstone Work Session",
    subtitle: "Apply ke data capstone lo sendiri — 60 menit",
    points: [
      {
        label: "0–15 min — Design Persona & Prompt",
        items: [
          "Persona spesifik ke problem lo, bukan generic",
          "List knowledge sources (cleaned dataset lo)",
          "Tulis system prompt pakai template tadi",
        ],
      },
      {
        label: "15–35 min — Build & Test",
        items: [
          "Upload dataset, paste prompt, verify initial response",
          "Test 10+ questions: metrics, comparisons, patterns, rekomendasi",
          "Verify setiap jawaban terhadap data aslinya",
        ],
      },
      {
        label: "35–50 min — Iterate & Refine",
        items: [
          "Revise prompt berdasarkan jawaban yang wrong/vague",
          "Minimum 2 iterasi — log setiap perubahan",
        ],
      },
      {
        label: "50–60 min — Document & Demo Prep",
        items: [
          "Finalize system prompt (copy-paste ready)",
          "Q&A log: 10+ pairs + verification notes",
          "2-min demo video atau screenshots 3+ interactions",
        ],
      },
    ],
  },

  {
    id: 15,
    title: "Checkpoint Rubrik — 100 Poin",
    subtitle: "Week 6 fokus di AA, AS, dan TM",
    points: [
      {
        label: "AI Literacy — 25 pts ← FOKUS",
        items: [
          "✓ 3+ AI use cases dari lecture",
          "✓ BI vs GenAI dibedakan dengan benar",
          "✓ 3–5 pertanyaan analisis terdefinisi",
          "✓ Output AI tool terdokumentasi",
          "✓ Limitations & adjustment dicatat",
        ],
      },
      {
        label: "Business Interpretation — 25 pts",
        items: [
          "✓ Top 3–5 findings diprioritaskan",
          "✓ Findings → concrete actions",
          "✓ Risks highlighted · EDA Week 3 extended",
        ],
      },
      {
        label: "Assistant Design — 25 pts ← FOKUS",
        items: [
          "✓ Persona & tasks clearly defined",
          "✓ System prompt documented",
          "✓ 10+ test questions prepared",
          "✓ Prompt iterations logged",
        ],
      },
      {
        label: "Testing & UX — 25 pts ← FOKUS",
        items: [
          "✓ Responses concise & on-topic",
          "✓ Tested with outside user",
          "✓ 2+ iterations from feedback",
          "✓ Stable for demo",
        ],
      },
    ],
  },

  // ── Section 9: Deliverable ────────────────────────────────────────────────────

  {
    id: 16,
    title: "Deliverable",
    subtitle: "Submit sebelum deadline",
    points: [
      {
        label: "① Final System Prompt",
        items: [
          "Copy-paste ready — langsung bisa dipakai",
          "Spesifik ke problem & data capstone lo",
          "Bukan template generic dari internet",
        ],
      },
      {
        label: "② Q&A Log (10+ pairs)",
        items: [
          "Question · Answer · Verified? · Iteration notes",
          "Cover: metrics, comparisons, patterns, recommendations",
          "Log perubahan prompt: apa yang diubah, kenapa",
        ],
      },
      {
        label: "③ Demo Video / Screenshots",
        items: [
          "2-min screen recording atau min. 3 screenshots",
          "Show: system prompt, 2 live questions, 1 limitation",
          "Harus jelas assistant-nya stable dan siap dipakai stakeholder",
        ],
      },
    ],
  },

  // ── Section 10: Preview & Close ───────────────────────────────────────────────

  {
    id: 17,
    title: "Week 7 Preview",
    subtitle: "Simple Analytics with GPT — Still No Code",
    body: [
      "Minggu depan kita pakai GPT buat analytics lebih dalam:",
      "  • Ask GPT to find patterns in your data",
      "  • Generate simple trend forecasts",
      "  • Create text summaries and insight reports",
      "GrabFood angle:",
      "  • Predict which orders are likely to be late",
      "  • Based on patterns yang kita temukan minggu ini",
    ],
    bodyExtra: "Same tools, smarter questions. No new setup required.",
  },

  {
    id: 18,
    title: "Let's Build",
    subtitle: "Data lo udah siap. Prompt template udah ada. Tinggal mulai.",
  },
];
