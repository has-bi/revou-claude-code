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
  // Slide 1: Title
  {
    id: 1,
    title: "Claude Code for Productivity",
    subtitle: "Engineering Better Processes Through AI Collaboration",
  },

  // Slide 2: Today's Focus
  {
    id: 2,
    title: "Today's Focus",
    subtitle: "What We're Actually Doing Today",
    body: [
      "You already know:",
      "✓ What Claude Code is",
      "✓ How to use it",
      "✓ Basic prompting",
    ],
    points: [
      {
        label: "Today we're covering:",
        items: [
          "Process engineering: How to structure problems before coding",
          "The grill-me approach: Using relentless interviewing to resolve design trees",
          "From vague idea → clear SOW: Turning \"I need automation\" into actionable spec",
          "Skills & connectors: Extending Claude with reusable workflows and tool integrations",
          "Live demo: Watch the full problem-to-solution process",
        ],
      },
    ],
    bodyExtra: "Goal: You leave with a methodology, not just code examples.",
  },

  // Slide 3: The Real Problem
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

  // Slide 4: The Design Tree Concept
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

  // Slide 5: The grill-me Method
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

  // Slide 6: Real Example - Before grill-me
  {
    id: 6,
    title: "Real Example - Before grill-me",
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

  // Slide 7: Real Example - With grill-me
  {
    id: 7,
    title: "Real Example - With grill-me",
    subtitle: "The Interview-First Approach",
    example: {
      type: "good",
      label:
        "User prompt: \"Build me a tool to track team tasks\" + uses grill-me skill",
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
      "10. [continues for 15-20 more questions]",
      "Result: Clear SOW before a single line of code is written.",
    ],
  },

  // Slide 8: The Output - Flowchart & SOW
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
        label: "3. Shared vocabulary",
        items: ["Terminology defined", "Ambiguous terms clarified"],
      },
    ],
    bodyExtra: "Now you can code with confidence.",
  },

  // Slide 9: Skills — Pre-Built Workflows
  {
    id: 9,
    title: "Skills — Pre-Built Workflows",
    subtitle: "Install Once, Invoke with a Slash Command",
    body: ["Skills are reusable prompt workflows you invoke directly in your session."],
    points: [
      {
        label: "grill-me",
        items: [
          "Interview-driven design — the core skill we covered today",
          "Resolves every branch before you write a line of code",
        ],
      },
      {
        label: "Next.js Frontend",
        items: [
          "Official skill from the Claude Code repo",
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
          "Pairs with Linear or GitHub Issues for immediate planning",
        ],
      },
      {
        label: "improve-codebase-architecture",
        items: [
          "Finds refactoring opportunities using your domain language",
          "Respects the decisions documented in CONTEXT.md",
        ],
      },
    ],
    bodyExtra: "Find skills: github.com/anthropics/claude-code — official + community",
  },

  // Slide 10: Connectors — Your Tools Inside Claude
  {
    id: 10,
    title: "Connectors — Your Tools Inside Claude",
    subtitle: "Model Context Protocol (MCP)",
    body: ["MCP servers let Claude read and write to the tools you already use — without copy-pasting."],
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
          "Update issue status, assignee, priority",
          "Create sub-issues from a generated SOW",
        ],
      },
      {
        label: "Vercel",
        items: [
          "Trigger deployments and check build logs",
          "Read runtime errors directly in context",
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

  // Slide 11: The Daily Workflow
  {
    id: 11,
    title: "The Daily Workflow",
    subtitle: "Claude Code + Linear + GitHub + Skills",
    body: [
      "This is how a typical day actually looks:",
      "1. Open Linear — pick up the top task",
      "2. Open Claude Code — load the relevant skill for the work",
      "3. Run grill-me if requirements are unclear — resolve before coding",
      "4. Build — Claude Code + GitHub connector for diffs and PRs",
      "5. Ship — Vercel connector for deploy status and logs",
    ],
    bodyExtra: "The connectors keep everything in one place. No context-switching.",
  },

  // Slide 12: When to Use This Approach
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

  // Slide 13: Enhancing Your Workflow
  {
    id: 13,
    title: "Enhancing Your Workflow",
    subtitle: "Process Improvements Beyond grill-me",
    body: ["Other skills and techniques to combine:"],
    points: [
      {
        label: "1. CONTEXT.md / CLAUDE.md",
        items: [
          "Document domain language, architecture decisions",
          "Claude reads this before every session",
        ],
      },
      {
        label: "2. to-prd skill",
        items: ["Convert grill-me output into formal PRD"],
      },
      {
        label: "3. to-issues skill",
        items: ["Break PRD into independently-grabbable tasks"],
      },
      {
        label: "4. TDD workflow",
        items: ["Test-driven development with red-green-refactor loop"],
      },
      {
        label: "5. improve-codebase-architecture",
        items: [
          "Find refactoring opportunities based on domain language",
        ],
      },
    ],
    bodyExtra: "Full toolkit: github.com/mattpocock/skills",
  },

  // Slide 14: Common Mistakes
  {
    id: 14,
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

  // Slide 15: Today's Workshop Flow
  {
    id: 15,
    title: "Today's Workshop Flow",
    subtitle: "What We'll Do in Case Study Lab",
    body: ["Your task (50 mins):"],
    points: [
      {
        label: "Step 1: Identify a problem (10 mins)",
        items: [
          "Pick one repetitive/inefficient task from your work",
          "Brief your group",
        ],
      },
      {
        label: "Step 2: Grill each other (30 mins)",
        items: [
          "One person presents their problem",
          "Others interview them using grill-me approach",
          "Walk down the decision tree",
          "Resolve dependencies",
        ],
      },
      {
        label: "Step 3: Document (10 mins)",
        items: [
          "Create flowchart (can be rough sketch)",
          "Write SOW bullet points",
          "Identify what you NOW understand that wasn't clear at start",
        ],
      },
    ],
    bodyExtra: "Then: present findings (30 mins total across groups)",
  },

  // Slide 16: Demo Preview
  {
    id: 16,
    title: "Demo Preview",
    subtitle: "What I'll Build Live",
    body: [
      "Watch the full grill-me workflow in real time:",
      "What you'll see:",
      "1. A real problem — described vaguely, the way it arrives in your head",
      "2. grill-me in action — walking every branch of the decision tree",
      "3. The output — a flowchart and SOW that emerges from the interview",
      "4. The build — code written with clarity, not guesswork",
    ],
    bodyExtra: "Pay attention to: how many hidden decisions surface that weren't obvious upfront.",
  },

  // Slide 17: Key Takeaways
  {
    id: 17,
    title: "Key Takeaways",
    subtitle: "Process > Tools",
    body: ["Remember:"],
    points: [
      {
        label: "",
        items: [
          "1. Interview before implementation — grill-me style saves time",
          "2. Walk the decision tree — resolve every branch explicitly",
          "3. Document shared understanding — CONTEXT.md, SOW, flowcharts",
          "4. Use skills — reusable workflows for common patterns",
          "5. Connect your tools — Linear, GitHub, Vercel via MCP",
          "6. Slow down to speed up — 15 min planning beats 2 hours rework",
        ],
      },
    ],
    bodyExtra:
      "Mindset shift: Your job isn't to tell Claude what to do. It's to reach shared understanding, THEN build together.",
  },

  // Slide 18: Let's Build
  {
    id: 18,
    title: "Let's Build",
    subtitle: "From Vague Problem to Clear Solution",
    body: [
      "Apply the methodology starting today.",
      "Take your next project — don't jump to code.",
      "Interview first. Walk the tree. Build with clarity.",
    ],
    bodyExtra: "The bottleneck was never Claude. It was shared understanding.",
  },
];
