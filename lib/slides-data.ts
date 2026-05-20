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
  // ── Section 1: Why ───────────────────────────────────────────────────────────

  {
    id: 1,
    title: "Claude Code for Productivity",
    subtitle: "Engineering Better Processes Through AI Collaboration",
  },

  {
    id: 2,
    title: "Today's Agenda",
    subtitle: "Learn → See → Do",
    body: [
      "You already know:",
      "✓ What Claude Code is",
      "✓ How to use it",
      "✓ Basic prompting",
    ],
    points: [
      {
        label: "Today we cover:",
        items: [
          "The methodology: why most AI projects fail and how to fix it",
          "Skills & connectors: reusable workflows + tool integrations",
          "Live demo (20 min): Isi Kulkasku fridge tracker, built start to finish",
          "Case study lab (50 min): apply grill-me to your own real problem",
        ],
      },
    ],
    bodyExtra: "Structure: understand the method → watch it live → practice it yourself.",
  },

  // ── Section 2: The Methodology ────────────────────────────────────────────────

  {
    id: 3,
    title: "The Real Problem",
    subtitle: "Why Most AI Projects Fail",
    body: [
      "Most people jump straight to: \"Claude, build me X\"",
      "The result:",
      "  • Claude builds something that technically works",
      "  • But doesn't actually solve your problem",
      "  • Or solves the wrong problem",
      "  • Or is overengineered / underengineered",
      "Why? Misalignment. You and Claude don't have shared understanding yet.",
      "The fix: Interview-driven design before implementation.",
    ],
  },

  {
    id: 4,
    title: "The Design Tree Concept",
    subtitle: "Every Problem is a Decision Tree",
    body: ["Example: \"I want to automate my weekly report\""],
    points: [
      {
        label: "Branch 1: What data sources?",
        items: [
          "Excel files? → Where stored? Cloud or local?",
          "API calls? → Which APIs? Auth method?",
          "Database? → Which tables? Access permissions?",
        ],
      },
      {
        label: "Branch 2: What's the output format?",
        items: [
          "PDF? → Template needed? Charts included?",
          "Email? → Plain text or HTML? Recipients?",
          "Dashboard? → Real-time or static? Hosting?",
        ],
      },
      {
        label: "Branch 3: When does it run?",
        items: [
          "Manual trigger? → Button click or command?",
          "Scheduled? → Daily? Time zone handling?",
          "Event-driven? → What triggers it?",
        ],
      },
    ],
    bodyExtra: "You need to walk down EVERY branch before coding.",
  },

  {
    id: 5,
    title: "The grill-me Method",
    subtitle: "Relentless Interviewing for Shared Understanding",
    body: [
      "Concept from Matt Pocock:",
      "Force Claude to interview you systematically until every decision is resolved.",
    ],
    code: `Interview me relentlessly about every aspect of this plan
until we reach a shared understanding.

Walk down each branch of the design tree, resolving
dependencies between decisions one by one.

For each question, provide your recommended answer.`,
    bodyExtra: [
      "What happens:",
      "  • Claude asks 15-50 questions (depending on complexity)",
      "  • Each question forces you to clarify your requirements",
      "  • By the end: both you and Claude understand exactly what to build",
      "Result: Higher quality code, fewer iterations, less rework.",
    ],
  },

  {
    id: 6,
    title: "Real Example — Before grill-me",
    subtitle: "The 'Just Build It' Approach",
    example: {
      type: "bad",
      label: "User prompt: \"Build me a tool to track team tasks\"",
    },
    body: [
      "Claude's response: Immediately starts coding a todo list with basic CRUD",
      "What Claude built:",
      "  • Simple task list",
      "  • Add/edit/delete tasks",
      "  • Mark as complete",
      "What user actually needed:",
      "  • Task dependencies",
      "  • Time tracking per task",
      "  • Integration with existing project management tool",
      "  • Weekly summary emails to manager",
      "  • Different permission levels for team members",
      "Wasted time: 2 hours building the wrong thing.",
    ],
  },

  {
    id: 7,
    title: "Real Example — With grill-me",
    subtitle: "The Interview-First Approach",
    example: {
      type: "good",
      label: "Same prompt + grill-me skill",
    },
    body: [
      "Claude's interview (excerpt):",
      "1. Who will use this tool? Just you, or your whole team?",
      "2. Do tasks need due dates? Priority levels?",
      "3. Should tasks have subtasks or dependencies?",
      "4. Do you need time tracking? Just duration or start/stop timestamps?",
      "5. Where does task data come from? Manual entry only, or pulling from other tools?",
      "6. What happens when a task is complete? Any notifications?",
      "7. Who should see what? Different access levels?",
      "8. How do you want to view tasks? List, board, timeline?",
      "9. Do you need reporting? What kind of reports?",
      "10. [continues for 15–20 more questions]",
      "Result: Clear SOW before a single line of code is written.",
    ],
  },

  {
    id: 8,
    title: "The Output — Flowchart & SOW",
    subtitle: "What You Get After Grilling",
    body: ["After the interview, Claude produces:"],
    points: [
      {
        label: "1. System Flowchart",
        items: [
          "Data flow from input to output",
          "Integration points",
          "User interactions",
          "Decision points",
        ],
      },
      {
        label: "2. Scope of Work (SOW)",
        items: [
          "Clear requirements list",
          "Technical decisions made",
          "Edge cases identified",
          "Implementation phases",
          "What's explicitly OUT of scope",
        ],
      },
      {
        label: "3. Shared Vocabulary",
        items: ["Terminology defined", "Ambiguous terms clarified"],
      },
    ],
    bodyExtra: "Now you can code with confidence.",
  },

  // ── Section 3: The Toolkit ────────────────────────────────────────────────────

  {
    id: 9,
    title: "Skills — Pre-Built Workflows",
    subtitle: "SOW in hand. Now use the right tool for the job.",
    body: ["Skills are reusable slash-command workflows. Install once, invoke per session."],
    points: [
      {
        label: "grill-me",
        items: [
          "The interview skill — the core of today's methodology",
          "Walks every branch until shared understanding is reached",
        ],
      },
      {
        label: "Next.js Frontend",
        items: [
          "Official skill from the Claude Code GitHub",
          "Component scaffolding, routing, layouts, data fetching patterns",
        ],
      },
      {
        label: "to-prd",
        items: [
          "Converts a grill-me session into a formal Product Requirements Doc",
          "Ready to share with stakeholders or hand off to a dev",
        ],
      },
      {
        label: "to-issues",
        items: [
          "Breaks a PRD into independently-grabbable tasks",
          "Pairs with Linear or GitHub Issues for immediate sprint planning",
        ],
      },
      {
        label: "improve-codebase-architecture",
        items: [
          "Finds refactoring opportunities using your domain language",
          "Respects decisions documented in CONTEXT.md / CLAUDE.md",
        ],
      },
    ],
    bodyExtra: "Skills live at: github.com/anthropics/claude-code (official + community)",
  },

  {
    id: 10,
    title: "Connectors — Your Tools Inside Claude",
    subtitle: "Model Context Protocol (MCP)",
    body: ["MCP servers let Claude read and write to the tools you already use — no copy-pasting context."],
    points: [
      {
        label: "GitHub",
        items: [
          "Read and create issues, PRs, and code reviews",
          "Search across your codebase by symbol or keyword",
          "Comment, merge, label — all from the Claude session",
        ],
      },
      {
        label: "Linear",
        items: [
          "Pick up tasks directly in your session",
          "Update issue status, assignee, priority in real time",
          "Create sub-issues from a generated SOW",
        ],
      },
      {
        label: "Vercel",
        items: [
          "Trigger deployments and read build logs",
          "Surface runtime errors directly in context",
          "Manage environment variables",
        ],
      },
      {
        label: "Notion · Drive · Slack",
        items: [
          "Read docs and wikis as session context",
          "Write reports and summaries back to pages",
          "Post updates to channels on task completion",
        ],
      },
    ],
    bodyExtra: "Setup: add MCP servers to .claude/settings.json in your project",
  },

  {
    id: 11,
    title: "The Daily Workflow",
    subtitle: "Claude Code + Linear + GitHub + Skills",
    body: [
      "This is how a typical work day looks in practice:",
      "1. Open Linear — pick up the top task for the day",
      "2. Open Claude Code — load the skill relevant to the work",
      "3. Run grill-me if requirements are unclear — resolve before coding",
      "4. Build — Claude Code + GitHub connector for diffs and PRs",
      "5. Ship — Vercel connector for deploy status and runtime logs",
    ],
    bodyExtra: "The connectors keep everything in one place. No context-switching.",
  },

  // ── Section 4: Guardrails ─────────────────────────────────────────────────────

  {
    id: 12,
    title: "When to Use This Approach",
    subtitle: "Not Every Task Needs Grilling",
    points: [
      {
        label: "Use grill-me style for:",
        items: [
          "✓ Anything you'll use for >1 month",
          "✓ Tools others will use (team tools, client deliverables)",
          "✓ Complex workflows with multiple integration points",
          "✓ When requirements are vague in your head",
          "✓ Projects where mistakes are costly",
        ],
      },
      {
        label: "Skip for:",
        items: [
          "Simple one-off scripts",
          "Prototypes you'll throw away",
          "Well-defined problems with clear specs already",
          "Time-sensitive quick fixes",
        ],
      },
    ],
    body: [
      "Rule of thumb: If it takes >2 hours to build, it's worth 15 minutes of grilling.",
    ],
  },

  {
    id: 13,
    title: "Common Mistakes in AI Collaboration",
    subtitle: "What Slows People Down",
    body: [
      "❌ Jumping to code too fast",
      "   No shared understanding = misalignment",
      "❌ Accepting Claude's first answer",
      "   Claude gives options. Push back. Question assumptions.",
      "❌ Not documenting decisions",
      "   Next session, Claude has no memory of what you decided",
      "❌ Vague requirements",
      '   "Make it user-friendly" → means nothing. Define criteria.',
      "❌ Treating Claude like Google",
      "   It's a collaborator, not a search engine. Have conversations.",
      "✅ Better: Slow down upfront. Interview. Document. Then build fast.",
    ],
  },

  // ── Section 5: Live Demo — Isi Kulkasku ──────────────────────────────────────

  {
    id: 14,
    title: "Live Demo",
    subtitle: "Isi Kulkasku — My Fridge Tracker",
    body: [
      "20 minutes. A real problem. The full methodology.",
      "What you'll watch:",
      "  • A vague problem described the way it arrives in your head",
      "  • grill-me running live — every branch walked, every decision made",
      "  • The SOW that emerges from the interview",
      "  • The app built with Claude Code in 10–13 minutes",
    ],
    bodyExtra: "Watch how the questions in grill-me map directly to the code structure.",
  },

  {
    id: 15,
    title: "The Problem",
    subtitle: "How It Arrives in Your Head",
    body: [
      "The vague ask:",
      "  \"I want something to track what's in my fridge.\"",
      "What I know:",
      "  • I keep forgetting about food that's about to expire",
      "  • I throw away money every week on forgotten produce",
      "  • I want some kind of reminder before it's too late",
      "What I don't know yet:",
      "  • What data to actually track",
      "  • How notifications should work",
      "  • Whether my family shares the same list",
      "  • What categories make sense for me",
    ],
    bodyExtra: "This is where most people open Claude and just start coding.",
  },

  {
    id: 16,
    title: "grill-me in Action",
    subtitle: "12 Questions. 3 Minutes. Every Branch Resolved.",
    body: [
      "1. What items will you track? Food only, or beverages too?",
      "2. Do you always know the expiry date when you add something?",
      "3. How early do you want to be warned? 1 day, 3 days, 1 week?",
      "4. How should notifications arrive? In-app, email, browser push?",
      "5. What time of day? Morning, before shopping?",
      "6. Do you track quantity? (half a milk carton vs full)",
      "7. Single user or shared with family?",
      "8. What categories make sense for your fridge?",
      "9. What happens when you consume an item — delete or mark as used?",
      "10. Mobile or desktop first?",
      "11. Do you want a shopping list for items to restock?",
      "12. Do you need history — how much food you consumed over time?",
    ],
    bodyExtra: "Each answer closes a branch. By question 12, the SOW writes itself.",
  },

  {
    id: 17,
    title: "Scope of Work",
    subtitle: "What We Decided to Build",
    body: ["Decisions made from the interview:"],
    points: [
      {
        label: "Item Model",
        items: [
          "Fields: name, category, quantity + unit, expiry date (optional), added date",
          "6 categories: Produce · Dairy · Meat · Fish · Beverage · Other",
          "Status: Fresh (>3 days) · Expiring Soon (≤3 days) · Expired · No Date",
        ],
      },
      {
        label: "The Interface",
        items: [
          "Dashboard view: cards sorted by expiry date",
          "Status badges with color coding (green / yellow / red)",
          "Add Item form: name + category dropdown + date picker + quantity",
          "One-tap remove when item is consumed",
        ],
      },
      {
        label: "Notifications",
        items: [
          "Daily in-app banner at page load: items expiring in ≤ 3 days",
          "Browser push notification permission (optional, user-controlled)",
          "Single user only — multi-household is v2",
        ],
      },
    ],
    bodyExtra: "Out of scope v1: barcode scanning · recipe suggestions · shopping list · history",
  },

  {
    id: 18,
    title: "The Build — 3 Phases",
    subtitle: "10–13 Minutes with Claude Code",
    body: ["Each grill-me decision maps directly to a phase:"],
    points: [
      {
        label: "Phase 1 — Foundation (3 min)",
        items: [
          "Load the frontend-nextjs skill for scaffold",
          "Define Item type: name, category, qty, unit, expiryDate?",
          "Set up useState array as the in-memory fridge state",
          "Helper: getDaysUntilExpiry(date) → status string",
        ],
      },
      {
        label: "Phase 2 — Core UI (5 min)",
        items: [
          "Fridge board: item cards sorted ascending by expiry date",
          "Status badge per card: Fresh / Expiring Soon / Expired / No Date",
          "Add Item form: all fields, submit appends to state",
          "Consume button: remove item from list",
        ],
      },
      {
        label: "Phase 3 — Notifications (3 min)",
        items: [
          "On mount: filter items expiring ≤ 3 days → show banner",
          "Banner: count + item names (e.g. 'Milk, Eggs expiring soon')",
          "Request browser push permission if user opts in",
          "Empty state: friendly message when fridge is clear",
        ],
      },
    ],
    bodyExtra: "The structure we build mirrors the SOW branch by branch.",
  },

  // ── Section 6: Case Study Lab ─────────────────────────────────────────────────

  {
    id: 19,
    title: "Your Turn — Case Study Lab",
    subtitle: "50 Minutes to Apply the Methodology",
    body: ["Pick a real repetitive problem from your own work:"],
    points: [
      {
        label: "Step 1: Identify (10 min)",
        items: [
          "Pick one inefficient or repetitive task from your daily work",
          "Describe it vaguely — the way it arrived in your head",
          "Brief your group: 2 minutes max",
        ],
      },
      {
        label: "Step 2: Grill (30 min)",
        items: [
          "One person presents; others interview them grill-me style",
          "Walk every branch of the decision tree",
          "Resolve dependencies — don't skip hard questions",
          "Someone documents decisions as they're made",
        ],
      },
      {
        label: "Step 3: Document (10 min)",
        items: [
          "Sketch a rough system flowchart",
          "Write SOW bullet points: in-scope + explicitly out of scope",
          "Note: what did you learn that wasn't obvious at the start?",
        ],
      },
    ],
    bodyExtra: "Then: each group presents findings — 5 min per group",
  },

  // ── Section 7: Close ──────────────────────────────────────────────────────────

  {
    id: 20,
    title: "Key Takeaways",
    subtitle: "Process > Tools",
    body: ["Remember:"],
    points: [
      {
        label: "",
        items: [
          "1. Interview before implementation — grill-me saves time and rework",
          "2. Walk every branch — don't code until every decision is resolved",
          "3. Document shared understanding — CONTEXT.md, SOW, flowcharts",
          "4. Use skills — reusable workflows for common patterns (to-prd, to-issues)",
          "5. Connect your tools — Linear, GitHub, Vercel via MCP keep you in flow",
          "6. Slow down to speed up — 15 min planning beats 2 hours of rework",
        ],
      },
    ],
    bodyExtra:
      "Mindset shift: Your job isn't to tell Claude what to do. It's to reach shared understanding, THEN build together.",
  },

  {
    id: 21,
    title: "Let's Build",
    subtitle: "From Vague Problem to Clear Solution",
  },
];
