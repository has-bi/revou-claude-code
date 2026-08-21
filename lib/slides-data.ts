export type SlideLayout = "hero" | "split" | "wide";
export type SlideAccent = "brain" | "rocket";

export interface SlideData {
  /** Display number. Also the React key — keep unique. */
  id: number;
  /** Explicit layout choice. No id-based magic routing. */
  layout: SlideLayout;
  /** Optional icon for hero slides. */
  accent?: SlideAccent;
  title: string;
  subtitle?: string;
  body?: string[];
  bodyExtra?: string | string[];
  points?: { label: string; items: string[] }[];
  code?: string;
  example?: { type: "good" | "bad"; label: string; description?: string };
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    layout: "hero",
    accent: "brain",
    title: "Sistem Gue Bikin Materi Ngajar",
    subtitle: "Dari brief sampai slides — beberapa menit.",
  },

  {
    id: 2,
    layout: "split",
    title: "Masalahnya",
    subtitle: "Kenapa tiap sesi terasa berat",
    body: [
      "Mulai dari blank page setiap kali",
      "Slides jadi dokumen panjang",
      "Review harus duduk di laptop",
      "Setup ulang context dari nol",
    ],
  },

  {
    id: 3,
    layout: "split",
    title: "The System",
    body: [
      "Brief / Syllabus",
      "  ↓",
      "NotebookLM — distilasi knowledge",
      "  ↓",
      "Claude Code Space — generate slides",
      "  ↓",
      "Review via HP",
      "  ↓",
      "Done.",
    ],
    bodyExtra: "Tiap tool punya satu peran. Tidak ada yang overlap.",
  },

  {
    id: 4,
    layout: "split",
    title: "NotebookLM",
    subtitle: "Knowledge distillation",
    body: [
      "Source masuk: artikel, PDF, web",
      "Output: satu file .md yang bersih",
      "Kenapa bukan langsung ke Claude?",
      "  Token terbatas — pisahkan fasenya",
    ],
    bodyExtra: "Knowledge gathering ≠ Content generation",
  },

  {
    id: 5,
    layout: "split",
    title: "Claude Code Space",
    subtitle: "Style lo tersimpan permanen",
    body: [
      "Tidak perlu prompt ulang tiap sesi",
      "Tone, layout, struktur — sudah ada",
      "Paste .md → slides keluar konsisten",
    ],
    bodyExtra: "Konsistensi dari context, bukan copy-paste.",
  },

  {
    id: 6,
    layout: "split",
    title: "Slides ≠ Dokumen",
    body: [
      "Slides adalah pointer — penunjuk arah",
      "Penjelasan dilakukan presenter langsung",
      "Minimalist by design",
    ],
    bodyExtra: "Kalau slides bisa dipahami tanpa presenter — lo nggak perlu presenter.",
  },

  {
    id: 7,
    layout: "split",
    title: "Review via HP",
    subtitle: "Sistem yang bisa ditinggal",
    body: [
      "Slides di-deploy sebagai web app",
      "Review sambil commute",
      "Tidak perlu buka laptop",
    ],
    bodyExtra: "Total active time: menit. Sisanya sistem yang kerja.",
  },

  {
    id: 8,
    layout: "wide",
    title: "4 Prinsip",
    points: [
      {
        label: "Separation of Concerns",
        items: ["Knowledge phase ≠ Generation phase", "Revisi lebih mudah dilacak"],
      },
      {
        label: "Persistent Context",
        items: ["Style tersimpan, bukan diulang", "Output konsisten otomatis"],
      },
      {
        label: "Slides as Pointer",
        items: ["Intentionally incomplete", "Presenter yang menjelaskan"],
      },
      {
        label: "Async Review",
        items: ["Bisa ditinggal = scalable", "Review kapan saja, dari mana saja"],
      },
    ],
  },

  {
    id: 9,
    layout: "hero",
    accent: "rocket",
    title: "Worth Dicoba.",
    subtitle: "Kalau lo ngajar atau sering bikin presentasi.",
  },
];
