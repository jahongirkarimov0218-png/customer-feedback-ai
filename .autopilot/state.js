window.STATE =
{
  "slug": "customer-feedback-ai",
  "dir": "2026-10-02-customer-feedback-ai--wip",
  "title": "Mijoz fikrlarini AI orqali tahlil qilish platformasi",
  "mode": "full",
  "depth": "normal",
  "polish": null,
  "tier": "T2",
  "briefFile": "2026-10-02-brief.md",
  "memoryFile": "AGENTS.md",
  "skillDir": "C:/Users/user/.gemini/config/skills/autopilot",
  "startedAt": "2026-10-02T08:51:15+05:00",
  "updatedAt": "2026-10-02T08:55:00+05:00",
  "finishedAt": null,
  "stages": [
    { "id": "preflight", "status": "done", "startedAt": "2026-10-02T08:51:15+05:00", "finishedAt": "2026-10-02T08:51:45+05:00" },
    { "id": "manifest",  "status": "done", "startedAt": "2026-10-02T08:51:45+05:00", "finishedAt": "2026-10-02T08:52:10+05:00" },
    { "id": "briefing",  "status": "skipped", "note": "полный автомат — самобрифинг" },
    { "id": "spec",      "status": "done", "startedAt": "2026-10-02T08:52:10+05:00", "finishedAt": "2026-10-02T08:53:00+05:00" },
    { "id": "plan",      "status": "done", "startedAt": "2026-10-02T08:53:00+05:00", "finishedAt": "2026-10-02T08:54:00+05:00" },
    { "id": "build",     "status": "active", "startedAt": "2026-10-02T08:54:00+05:00" },
    { "id": "review",    "status": "pending" },
    { "id": "final",     "status": "pending" }
  ],
  "requirements": {
    "total": 12, "done": 0, "inTicket": 12, "inSpec": 0,
    "placeholder": 0, "deferred": 0, "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Next.js Shell, Design System & Data Contracts",
      "requirements": ["R01", "R08", "R09", "R12"],
      "blockedBy": [],
      "wave": 1,
      "zone": ["src/types/", "src/app/layout.tsx", "tailwind.config.ts"],
      "status": "in-progress",
      "startedAt": "2026-10-02T08:55:00+05:00",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "02",
      "title": "AI Analysis Engine & Server API Route (/api/analyze)",
      "requirements": ["R03", "R04", "R05", "R06", "R07", "R10"],
      "blockedBy": ["01"],
      "wave": 2,
      "zone": ["src/app/api/analyze/", "src/lib/analyzer/"],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "03",
      "title": "Interactive Feedback Input, Presets & Dashboard Components",
      "requirements": ["R02", "R08", "R11"],
      "blockedBy": ["01"],
      "wave": 2,
      "zone": ["src/components/feedback-input.tsx", "src/components/presets.tsx"],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "04",
      "title": "Results Visualization: Sentiment, Top 3 Insights & Problem-Solution Matrix",
      "requirements": ["R03", "R04", "R05", "R06", "R07", "R08"],
      "blockedBy": ["02", "03"],
      "wave": 3,
      "zone": ["src/components/results/", "src/app/page.tsx"],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    },
    {
      "id": "05",
      "title": "Quality Verification, Automated Tests, Vercel Config & Documentation",
      "requirements": ["R01", "R12"],
      "blockedBy": ["04"],
      "wave": 4,
      "zone": ["tests/", "vercel.json", "README.md"],
      "status": "pending",
      "retries": 0,
      "repairs": 0,
      "handoffs": 0
    }
  ],
  "singlePass": null,
  "tests": null,
  "debt": { "placeholders": [], "assumptions": ["ASSUMPTION: Built-in semantic NLP fallback allows full zero-config demo experience when no AI API keys are configured"], "emptyEnv": ["GEMINI_API_KEY", "OPENAI_API_KEY"] },
  "additions": [],
  "coverage": { "findings": 0, "status": "clean" },
  "concerns": [],
  "reviewers": { "manifestSpec": null, "craft": null },
  "blind": null
}
