export interface SlidePoint {
  label: string;
  items: string[];
}

export interface SlideExample {
  type: "good" | "bad";
  label: string;
  text: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  body?: string[];
  points?: SlidePoint[];
  code?: string;
  example?: SlideExample;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Claude Code for Productivity",
    subtitle: "Engineering Better Processes Through AI Collaboration",
  },
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
          'From vague idea → clear SOW: Turning "I need automation" into actionable spec',
          "Live demo: Watch the full problem-to-solution process",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "The Real Problem",
    subtitle: "Why Most AI Projects Fail",
    body: [
      'Most people jump straight to: "Claude, build me X"',
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
    body: ['Example: "I want to automate my weekly report"'],
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
  },
  {
    id: 5,
    title: "The grill-me Method",
    subtitle: "Relentless Interviewing for Shared Understanding",
    body: [
      "Concept from Matt Pocock:",
      "Force Claude to interview you systematically until every decision is resolved.",
    ],
    code: `Interview me relentlessly about every aspect of this plan\nuntil we reach a shared understanding.\n\nWalk down each branch of the design tree, resolving\ndependencies between decisions one by one.\n\nFor each question, provide your recommended answer.`,
    points: [
      {
        label: "What happens:",
        items: [
          "Claude asks 15-50 questions (depending on complexity)",
          "Each question forces you to clarify your requirements",
          "By the end: both you and Claude understand exactly what to build",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Real Example - Before grill-me",
    subtitle: 'The "Just Build It" Approach',
    example: {
      type: "bad",
      label: "User prompt:",
      text: '"Build me a tool to track team tasks"',
    },
    body: [
      "Claude's response: Immediately starts coding a todo list with basic CRUD",
      "",
      "What Claude built:",
      "  • Simple task list",
      "  • Add/edit/delete tasks",
      "  • Mark as complete",
      "",
      "What user actually needed:",
      "  • Task dependencies",
      "  • Time tracking per task",
      "  • Integration with existing project management tool",
      "  • Weekly summary emails to manager",
      "  • Different permission levels for team members",
      "",
      "Wasted time: 2 hours building the wrong thing.",
    ],
  },
  {
    id: 7,
    title: "Real Example - With grill-me",
    subtitle: "The Interview-First Approach",
    example: {
      type: "good",
      label: "User prompt:",
      text: '"Build me a tool to track team tasks" + uses grill-me skill',
    },
    body: [
      "Claude's interview (excerpt):",
      "  1. Who will use this tool? Just you, or your whole team?",
      "  2. Do tasks need due dates? Priority levels?",
      "  3. Should tasks have subtasks or dependencies?",
      "  4. Do you need time tracking? Just duration or start/stop timestamps?",
      "  5. Where does task data come from? Manual entry only, or pulling from other tools?",
      "  6. What happens when a task is complete? Any notifications?",
      "  7. Who should see what? Different access levels?",
      "  8. How do you want to view tasks? List, board, timeline?",
      "  9. Do you need reporting? What kind of reports?",
      "  10. [continues for 15-20 more questions]",
      "",
      "Result: Clear SOW before a single line of code is written.",
    ],
  },
  {
    id: 8,
    title: "The Output - Flowchart & SOW",
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
  },
  {
    id: 9,
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
    id: 10,
    title: "Enhancing Your Workflow",
    subtitle: "Process Improvements Beyond grill-me",
    body: ["Other skills/techniques to combine:"],
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
        items: ["Find refactoring opportunities based on domain language"],
      },
    ],
  },
  {
    id: 11,
    title: "Common Mistakes in AI Collaboration",
    subtitle: "What Slows People Down",
    body: [
      "❌ Jumping to code too fast",
      "   No shared understanding = misalignment",
      "",
      "❌ Accepting Claude's first answer",
      "   Claude gives options. Push back. Question assumptions.",
      "",
      "❌ Not documenting decisions",
      "   Next session, Claude has no memory of what you decided",
      "",
      "❌ Vague requirements",
      '   "Make it user-friendly" → means nothing. Define criteria.',
      "",
      "❌ Treating Claude like Google",
      "   It's a collaborator, not a search engine. Have conversations.",
      "",
      "✅ Better: Slow down upfront. Interview. Document. Then build fast.",
    ],
  },
  {
    id: 12,
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
  },
  {
    id: 13,
    title: "Demo Preview",
    subtitle: "What I'll Build Live",
    body: [
      "The problem: [Your chosen demo problem - describe it vaguely]",
      "",
      "What you'll see:",
      "  1. Me using grill-me to interview myself (or audience member with real problem)",
      "  2. Walking down the decision tree systematically",
      "  3. Producing flowchart + SOW",
      "  4. Building the solution with clarity",
      "",
      "Watch for: How many questions reveal hidden requirements you didn't think about initially.",
    ],
  },
  {
    id: 14,
    title: "Key Takeaways",
    subtitle: "Process > Tools",
    body: ["Remember:"],
    points: [
      {
        label: "1. Interview before implementation",
        items: ["grill-me style saves time"],
      },
      {
        label: "2. Walk the decision tree",
        items: ["Resolve every branch explicitly"],
      },
      {
        label: "3. Document shared understanding",
        items: ["CONTEXT.md, SOW, flowcharts"],
      },
      {
        label: "4. Slow down to speed up",
        items: ["15 min planning beats 2 hours rework"],
      },
      {
        label: "5. Treat Claude as collaborator",
        items: ["Not command executor"],
      },
    ],
  },
  {
    id: 15,
    title: "Let's Build",
    subtitle: "From Vague Problem to Clear Solution",
    body: [
      "Your turn.",
      "",
      "Pick a real problem from your work.",
      "We'll grill it together.",
      "Walk the decision tree.",
      "Produce a flowchart and SOW.",
      "",
      "Then — build with confidence.",
    ],
  },
];
