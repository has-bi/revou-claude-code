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
  // ── Opening ───────────────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Sistem Gue Bikin Materi Ngajar",
    subtitle: "Dari brief sampai slides — beberapa menit. Konsisten tiap sesi.",
  },

  // ── The Problem ───────────────────────────────────────────────────────────────

  {
    id: 2,
    title: "Cara Kebanyakan Orang",
    subtitle: "Yang bikin tiap sesi terasa berat",
    body: [
      "Mulai dari blank page — butuh effort besar setiap kali bikin",
      "Slides jadi tempat nulis semua penjelasan",
      "  (padahal itu kerjaan presenter, bukan slides-nya)",
      "Review butuh duduk di depan laptop",
      "Setiap bikin ulang, setup context dari awal lagi",
    ],
    bodyExtra: "Hasilnya: energi habis sebelum ngajar. Dan tiap sesi terasa kayak pertama kali.",
  },

  // ── The System ────────────────────────────────────────────────────────────────

  {
    id: 3,
    title: "The System",
    subtitle: "5 langkah. Tiap langkah punya satu tanggung jawab.",
    body: [
      "Brief / Syllabus",
      "  ↓",
      "NotebookLM — distilasi knowledge → output: .md",
      "  ↓",
      "Claude Code Space — generate slides sesuai style lo",
      "  ↓",
      "Review via HP — sambil commute, async",
      "  ↓",
      "Done.",
    ],
    bodyExtra: "Kuncinya: setiap tool punya satu peran. Tidak ada yang overlap.",
  },

  // ── Tool 1: NotebookLM ────────────────────────────────────────────────────────

  {
    id: 4,
    title: "NotebookLM",
    subtitle: "Knowledge distillation — bukan generation",
    body: [
      "Token Claude terbatas — jangan pakai untuk kumpulin knowledge.",
      "",
      "NotebookLM handle ini:",
      "  • Source masuk: artikel, PDF, web",
      "  • Semua didistilasi jadi satu .md yang bersih",
      "  • Output siap untuk phase selanjutnya",
      "",
      "Separation of concerns:",
      "  Knowledge gathering ≠ Content generation",
    ],
    bodyExtra: "Pisahkan dua fase ini, dan lo tahu persis di mana kalau ada yang perlu direvisi.",
  },

  // ── Tool 2: Claude Code Space ─────────────────────────────────────────────────

  {
    id: 5,
    title: "Claude Code Space",
    subtitle: "Style lo tersimpan — bukan diulang tiap kali",
    body: [
      "Tidak perlu prompt from scratch setiap sesi.",
      "",
      "Style dan preferensi sudah jadi context permanen:",
      "  • Tone: natural, bukan formal akademik",
      "  • Layout: pointer slides, bukan explainer slides",
      "  • Struktur: sudah ada template-nya",
      "",
      "Paste .md dari NotebookLM → slides keluar konsisten.",
    ],
    bodyExtra: "Konsistensi bukan tentang copy-paste — tapi tentang context yang tersimpan.",
  },

  // ── Philosophy: Slides ────────────────────────────────────────────────────────

  {
    id: 6,
    title: "Slides ≠ Dokumen",
    subtitle: "Intentionally incomplete by design",
    body: [
      "Slides bukan tempat naruh semua penjelasan.",
      "Slides adalah pointer — penunjuk arah.",
      "",
      "Yang bikin slides terasa berat:",
      "  Mencoba menjelaskan semuanya via teks",
      "",
      "Yang bikin slides efektif:",
      "  Cukup cue, detail dilakukan presenter langsung",
      "  Minimalist design + sedikit motion = tidak distract",
    ],
    bodyExtra: "Kalau slides lo bisa dipahami tanpa presenter — lo butuh presenter, bukan slides.",
  },

  // ── Async Review ──────────────────────────────────────────────────────────────

  {
    id: 7,
    title: "Review via HP",
    subtitle: "Sistem yang bisa ditinggal — sistem yang scalable",
    body: [
      "Review tidak harus di depan laptop.",
      "",
      "Kalau slides di-deploy sebagai web app:",
      "  • Bisa diakses dari HP kapan saja",
      "  • Evaluate sambil commute, sambil nunggu",
      "  • Feedback langsung — tanpa buka laptop",
      "",
      "Total active time untuk bikin satu deck:",
      "  Beberapa menit — sisanya sistem yang kerja.",
    ],
    bodyExtra: "Async review bukan tentang malas — tapi tentang timing yang lebih fleksibel.",
  },

  // ── Key Insights ──────────────────────────────────────────────────────────────

  {
    id: 8,
    title: "4 Key Insights",
    subtitle: "Yang bikin sistem ini bisa ditinggal",
    points: [
      {
        label: "① Separation of Concerns",
        items: [
          "Pisahkan fase knowledge dari fase generation",
          "NotebookLM ≠ Claude — keduanya punya peran beda",
          "Revisi jadi lebih mudah dilacak",
        ],
      },
      {
        label: "② Persistent Context",
        items: [
          "Style lo tersimpan sebagai context permanen",
          "Tidak perlu re-explain preference tiap sesi",
          "Output konsisten tanpa effort ekstra",
        ],
      },
      {
        label: "③ Slides as Pointer",
        items: [
          "Slides intentionally incomplete",
          "Penjelasan dilakukan presenter, bukan teks",
          "Audience fokus ke lo, bukan baca slides",
        ],
      },
      {
        label: "④ Async Review",
        items: [
          "Review tidak harus di depan laptop",
          "Sistem yang bisa ditinggal = sistem yang scalable",
          "Total active time: menit, bukan jam",
        ],
      },
    ],
  },

  // ── Closing ───────────────────────────────────────────────────────────────────

  {
    id: 9,
    title: "Worth Dicoba.",
    subtitle: "Kalau lo ngajar atau sering bikin presentasi — workflow ini bisa jadi starting point.",
  },
];
