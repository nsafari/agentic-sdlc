/* =============================================================================
   AGENTIC SDLC — LEVEL 3: FULL AUTONOMY
   Human moves from actor to approver. Agent proposes, CI/CD validates,
   agent merges autonomously, human notified at critical gates.

   Same 6 stages, same 4 facets, same 5 principles — inverted relationship.
   ========================================================================== */

window.SDLC_DATA_L3 = {
  meta: {
    title: "The Agentic SDLC — Level 3",
    subtitle: "Full AI autonomy with human approval at critical gates — the engine runs itself, you hold the kill switch",
    org: "Specific-Group Austria",
    version: "0.1",
  },

  /* ---------------------------------------------------------------------------
     PRINCIPLES INTRO — Level 3: supersonic engine, even better brakes
     ------------------------------------------------------------------------ */
  principlesIntro: `If Level 2 is bolting a jet engine onto a golf cart, Level 3 is building a supersonic aircraft that flies itself. The pilot doesn't touch the controls — they monitor, intervene at critical moments, and hold the eject button.

---

### The Autonomy Inversion

At Level 3, the human moves from **actor** to **approver**. The agent doesn't wait for permission to write code, run tests, or merge changes. It acts. CI/CD validates. The system ships. Humans are notified — and intervene only when guardrails trigger or business logic changes.

This isn't automation for automation's sake. It's the only way to handle agent velocity at scale. When an agent can ship 50 PRs per hour, human review becomes the bottleneck. The answer isn't slower agents — it's deterministic gates that validate faster than agents produce.

#### The Approval Paradox

\`\`\`
[Agent Acts] ──> [CI/CD Validates] ──> [Autonomous Merge] ──> [Human Notified]
      │                                                           │
      └─────────────── Deterministic Gates = Safe Speed ──────────┘
\`\`\`

* **Deterministic gates rule everything.** Linters, tests, security scans, architecture boundary checks — all automated, all reproducible. No AI judgment in the critical path.
* **Human approval for business logic only.** Scope changes, new architectural patterns, first production deploys of new services — these need human judgment. Everything else is automated.
* **The kill switch is always live.** Auto-rollback on business metrics, not just technical ones. If revenue drops, the system reverts — no human needed to press the button.

---

### The 5 Disciplines for Full Autonomy

The same five pillars from Level 2, but inverted: the agent acts, the system validates, humans approve only what they must.`,

  /* ---------------------------------------------------------------------------
     PRINCIPLES — Level 3: same 5, rewritten for full automation
     ------------------------------------------------------------------------ */
  principles: [
    {
      id: "test-driven-prompting",
      title: "1. Test-Driven Prompting (TDP)",
      subtitle: "Tests are the contract — agent code must satisfy them or it doesn't ship",
      body: `At Level 3, tests aren't suggestions — they're the law. The agent writes code to satisfy pre-existing tests, or generates tests from acceptance criteria before writing code. CI runs the tests; the agent never judges pass/fail. If tests fail, the code doesn't merge. Period.`,
    },
    {
      id: "aggressive-cicd",
      title: "2. Aggressive CI/CD Automation",
      subtitle: "The pipeline is the gatekeeper — faster than the agent, deterministic always",
      body: `Your CI/CD pipeline must validate faster than the agent produces. Linting, static analysis, security scans, unit/integration tests, architecture boundary checks — all automated, all under 60 seconds. The pipeline is the only thing standing between agent output and production. It must be ruthless.`,
    },
    {
      id: "observability",
      title: "3. Observability as a First-Class Citizen",
      subtitle: "Full read-write access — the agent investigates, correlates, and proposes fixes",
      body: `At Level 3, the agent has full access to logs, traces, and metrics. It investigates incidents autonomously, correlates patterns, and proposes fixes. But observability isn't just for debugging — it's the feedback loop. Production signals feed back into agent context, closing the loop from operations to analysis.`,
    },
    {
      id: "micro-reviews",
      title: "4. Continuous Micro-Reviews",
      subtitle: "Atomic changes, automated validation, human notification — not human review",
      body: `At Level 3, humans don't review every PR. The agent makes atomic, single-intent changes. CI validates them. The system merges them. Humans are notified — and can intervene if something looks wrong. But the default is autonomous merge with mandatory notification, not mandatory review.`,
    },
    {
      id: "architectural-decoupling",
      title: "5. Architectural Decoupling",
      subtitle: "Bounded contexts are the blast radius — agent failures stay isolated",
      body: `To let agents loose safely, codebases must be highly modular. If an agent messes up within a bounded context, the failure is isolated and auto-rollback reverts it. Architecture boundary tests enforce decoupling in CI — the agent cannot violate boundaries without the build failing.`,
    },
  ],

  principlesOutro: `> **The Bottom Line:** Level 3 isn't about removing humans — it's about removing humans from the critical path of routine decisions. Humans approve business logic, new patterns, and first deploys. Everything else is automated. The highest-performing teams won't be the ones with the most agents — they'll be the ones with the most deterministic gates to keep agents safe.`,

  /* ---------------------------------------------------------------------------
     STAGES — the six segments, Level 3: agent acts, human approves
     ------------------------------------------------------------------------ */
  stages: [
    /* ======================================================================
       1 — ANALYSIS & REQUIREMENTS
       ===================================================================== */
    {
      id: "analysis",
      name: "Analysis & Requirements",
      short: "Analysis",
      tagline: "Agent continuously ingests feedback, updates backlog autonomously — human approves scope changes",
      principle: "Agent drafts and updates requirements from production signals; human approves business logic changes.",
      outcomes: ["Autonomous backlog", "Real-time requirements", "Human-approved scope"],
      facets: {
        opportunities: [
          {
            title: "Continuous backlog ingestion from production signals",
            body: `The agent monitors production metrics, user feedback, and incident reports — and updates the backlog autonomously. Requirements aren't drafted in workshops; they emerge from real-time signals.`,
          },
          {
            title: "Stakeholder communication MCPs",
            body: `The agent has direct access to stakeholder feedback channels (Slack, email, support tickets) via MCPs. It ingests, summarizes, and drafts requirements — no manual transcription.`,
          },
          {
            title: "Automated requirement validation",
            body: `Requirements are validated against the codebase, architecture, and NFRs automatically. The agent flags conflicts, missing acceptance criteria, and technical infeasibility before human review.`,
          },
          {
            title: "Requirements drafted from production telemetry",
            body: `Performance bottlenecks, error patterns, and user behavior become requirements automatically. The agent correlates telemetry to business outcomes and drafts user stories.`,
          },
        ],
        risks: [
          {
            title: "Requirement drift: optimizing for what's measurable",
            body: `The agent optimizes for what it can measure (latency, error rates) — not what matters (user satisfaction, business value). Requirements drift toward technical metrics, away from business outcomes.`,
          },
          {
            title: "Audit trail gaps when AI updates backlog",
            body: `When the agent autonomously updates the backlog, the audit trail becomes critical. Who approved this requirement? What production signal triggered it? Without traceability, compliance fails.`,
          },
          {
            title: "Stakeholder voice flattening at scale",
            body: `The agent summarizes stakeholder feedback — but summarization averages away disagreement. The contentious 10% reads like consensus. Human approval is needed for scope changes, not just drafting.`,
          },
        ],
        feedforward: [
          {
            title: "Live production metrics as context",
            body: `The agent has real-time access to production telemetry — latency, error rates, user behavior. Requirements are grounded in what's actually happening, not what stakeholders think is happening.`,
          },
          {
            title: "Stakeholder communication MCPs",
            body: `Direct access to Slack, email, support tickets — the agent ingests feedback without manual transcription. Context is preserved, not lost in handoffs.`,
          },
          {
            title: "Automated requirement validation against codebase",
            body: `Requirements are validated against the actual codebase, architecture, and NFRs. The agent flags conflicts before human review — feasibility surprises disappear.`,
          },
        ],
        guardrails: [
          {
            title: "Human approval for scope changes affecting business logic",
            body: `The agent drafts and updates requirements autonomously — but scope changes that affect business logic need human approval. Prioritization and value judgments are never delegated.`,
          },
          {
            title: "Automated quality gates for everything else",
            body: `Requirements without acceptance criteria, missing traceability, or technical infeasibility are blocked automatically. No human needed — the gate is deterministic.`,
          },
          {
            title: "Audit trail: requirement → production signal → approval",
            body: `Every requirement references the production signal that triggered it and the human who approved it. Traceability is non-negotiable for compliance.`,
          },
        ],
      },
    },

    /* ======================================================================
       2 — ARCHITECTURE & DESIGN
       ===================================================================== */
    {
      id: "architecture",
      name: "Architecture & Design",
      short: "Architecture",
      tagline: "Agent proposes AND validates architectures autonomously — human approves new patterns",
      principle: "Agent proposes architectures, validates against NFRs in CI; human approves new patterns.",
      outcomes: ["Autonomous validation", "Fitness functions in CI", "Human-approved patterns"],
      facets: {
        opportunities: [
          {
            title: "Agent proposes AND validates architectures against NFRs",
            body: `The agent doesn't just propose architectures — it validates them against NFRs autonomously. Architecture fitness functions run in CI. Feasibility surprises move from month 6 to minute 6.`,
          },
          {
            title: "Architecture fitness functions in CI",
            body: `Every architectural decision is paired with a fitness function or boundary test that enforces it. The agent can't violate boundaries without the build failing — policy-as-code, enforced automatically.`,
          },
          {
            title: "Autonomous refactoring within existing patterns",
            body: `The agent refactors code within existing architectural patterns autonomously. No human approval needed — the patterns are already approved, the refactoring is validated by CI.`,
          },
          {
            title: "Tech radar auto-updated from usage patterns",
            body: `The agent monitors actual technology usage and updates the tech radar automatically. Preferred libraries are enforced in CI; deprecated libraries trigger warnings.`,
          },
        ],
        risks: [
          {
            title: "Status-quo bias amplified at automation speed",
            body: `The agent extends the current architecture — even when the right answer is to break from it. At Level 3, this bias is amplified: the agent refactors within existing patterns autonomously, never questioning whether the patterns themselves are wrong.`,
          },
          {
            title: "Autonomous refactoring touches critical paths",
            body: `The agent refactors autonomously — but critical paths need human oversight. A refactoring that touches payment processing or authentication needs human approval, even if it's within existing patterns.`,
          },
          {
            title: "Architecture model drift from reality",
            body: `The architecture model is code — but if the agent doesn't update it, it drifts from reality. At Level 3, the model must be auto-updated from actual code, not manually maintained.`,
          },
        ],
        feedforward: [
          {
            title: "Architecture model as code (always current)",
            body: `The architecture model is code, versioned in the repo, and auto-updated from actual code. The agent has a current map — not a stale wiki page.`,
          },
          {
            title: "Tech radar auto-updated from usage patterns",
            body: `The agent monitors actual technology usage and updates the tech radar automatically. Preferred libraries are enforced; deprecated libraries trigger warnings.`,
          },
          {
            title: "ADR history & NFR catalog in the repo",
            body: `The agent can only respect decisions it can read. ADRs and NFRs as versioned markdown are its long-term memory — and fitness functions enforce them in CI.`,
          },
        ],
        guardrails: [
          {
            title: "Human approval for new architectural patterns",
            body: `The agent can refactor within existing patterns autonomously — but new patterns need human approval. A new database, a new messaging system, a new deployment model — these need human judgment.`,
          },
          {
            title: "Agent can refactor within existing patterns autonomously",
            body: `If the pattern is already approved, the agent can refactor within it without human approval. CI validates the refactoring; architecture boundary tests enforce decoupling.`,
          },
          {
            title: "Architecture boundary tests in CI",
            body: `Structural rules enforced automatically in CI. The agent cannot violate a boundary without the build failing — same input, same result, every time.`,
          },
        ],
      },
    },

    /* ======================================================================
       3 — DEVELOPMENT
       ===================================================================== */
    {
      id: "development",
      name: "Development",
      short: "Development",
      tagline: "Agent writes, tests, and merges autonomously — human notified, not reviewing",
      principle: "Agent writes, tests, merges autonomously; human notified, intervenes only on guardrail triggers.",
      outcomes: ["Autonomous merge", "Continuous refactoring", "Skill governance"],
      facets: {
        opportunities: [
          {
            title: "Agent writes, tests, and merges autonomously",
            body: `The agent writes code, generates tests, and merges to trunk — all autonomously. CI validates; if tests pass, the code merges. Human review is not the default; human notification is.`,
          },
          {
            title: "Trunk-based development with feature flags",
            body: `All development happens on trunk. Feature flags decouple deploy from release. The agent merges to trunk continuously; feature flags control what's live.`,
          },
          {
            title: "Continuous refactoring by the agent",
            body: `The agent refactors code continuously — not just when asked. Code smells are detected automatically; refactoring is proposed, validated by CI, and merged autonomously.`,
          },
          {
            title: "Skill governance: who can add/modify skills",
            body: `Skills (reusable agent workflows) are versioned and governed. A skill review board approves production-affecting skills. The agent can't just add a new skill without oversight.`,
          },
        ],
        risks: [
          {
            title: "Over-automation: automating decisions that should stay human",
            body: `At Level 3, the temptation is to automate everything — but some decisions need human judgment. Business logic, ethical considerations, user experience — these can't be reduced to deterministic gates.`,
          },
          {
            title: "Context staleness at scale",
            body: `The agent's context window fills with irrelevant material as the codebase grows. At Level 3, the agent must have retrieval tuned per codebase — or it loses effectiveness.`,
          },
          {
            title: "Skill governance gaps",
            body: `If anyone can add skills, the agent accumulates conflicting workflows. A skill review board is needed — but at Level 3, the board must approve skills before they're deployed, not after.`,
          },
          {
            title: "Dependency creep at machine speed",
            body: `The agent adds dependencies faster than humans can review them. Preferred-libraries lists are enforced in CI — but the agent can still add libraries that pass the gate but bloat the codebase.`,
          },
        ],
        feedforward: [
          {
            title: "Prompt versioning",
            body: `Prompts are versioned like code. The agent's behavior is reproducible — if a prompt changes, the change is tracked, reviewed, and rolled back if needed.`,
          },
          {
            title: "Skill governance: review board for production-affecting skills",
            body: `Skills are versioned and governed. A skill review board approves production-affecting skills before they're deployed. The agent can't just add a new skill without oversight.`,
          },
          {
            title: "Continuous context refresh",
            body: `The agent's context is refreshed continuously — not just at the start of a session. Production signals, recent changes, and stakeholder feedback feed into the agent's context in real-time.`,
          },
        ],
        guardrails: [
          {
            title: "Autonomous merge with mandatory human notification",
            body: `The agent merges autonomously — but humans are notified. If something looks wrong, they can intervene. But the default is autonomous merge, not mandatory review.`,
          },
          {
            title: "Skill review board for production-affecting skills",
            body: `Skills that affect production (deployment, monitoring, incident response) need human approval before deployment. The agent can't just add a new skill without oversight.`,
          },
          {
            title: "Architecture tests protect boundaries",
            body: `Complexity budgets and boundary checks in CI. The agent cannot violate boundaries without the build failing — same input, same result, every time.`,
          },
          {
            title: "Trunk-based development + feature flags",
            body: `All development on trunk; feature flags decouple deploy from release. The branching strategy is the first thing that breaks under agent velocity — at Level 3, it's enforced automatically.`,
          },
          {
            title: "Linters, formatters, static analysis — non-negotiable",
            body: `Zero human effort on style; zero stylistic patchwork from different agent sessions. CI enforces consistency automatically.`,
          },
        ],
      },
    },

    /* ======================================================================
       4 — TESTING & QA
       ===================================================================== */
    {
      id: "testing",
      name: "Testing & QA",
      short: "Testing",
      tagline: "Agent generates, runs, and maintains tests autonomously — CI judges pass/fail",
      principle: "Agent generates and maintains tests; CI judges pass/fail. Agent never judges its own code.",
      outcomes: ["Self-healing test suite", "Autonomous maintenance", "Deterministic gates"],
      facets: {
        opportunities: [
          {
            title: "Agent generates, runs, and maintains tests autonomously",
            body: `The agent generates tests from acceptance criteria, runs them in CI, and maintains them as code changes. If a test breaks, the agent fixes it — or quarantines it if it's flaky.`,
          },
          {
            title: "Self-healing test suite",
            body: `Tests that break due to refactoring are fixed automatically by the agent. Flaky tests are quarantined with explicit ownership. The test suite heals itself — no manual maintenance.`,
          },
          {
            title: "Test strategy as code",
            body: `The test strategy (unit, integration, E2E, contract) is encoded as code. The agent enforces the testing pyramid automatically — no human needed to decide which tests to write.`,
          },
          {
            title: "Acceptance criteria auto-linked from requirements",
            body: `Tests are generated from acceptance criteria, which are auto-linked from requirements. The agent doesn't write tests from code — it writes tests from intent.`,
          },
        ],
        risks: [
          {
            title: "Tests assert what code does, not what it should",
            body: `At Level 3, this risk is amplified: the agent generates tests at automation speed — but if the tests are written after the code, they verify what the code does, not what it should do. Acceptance criteria must come first.`,
          },
          {
            title: "Coverage theater at scale",
            body: `The agent makes it cheap to game coverage metrics. At Level 3, coverage theater happens at machine speed — 90% coverage, zero confidence. The antidote is test quality gates, not coverage targets.`,
          },
          {
            title: "Flaky tests block everything",
            body: `At Level 3, flaky tests are catastrophic: the agent merges continuously, and flaky tests block merges. Zero tolerated flakiness — quarantine with explicit ownership, or fix immediately.`,
          },
        ],
        feedforward: [
          {
            title: "Test strategy as code",
            body: `The test strategy is encoded as code — unit, integration, E2E, contract. The agent enforces the testing pyramid automatically. No human needed to decide which tests to write.`,
          },
          {
            title: "Acceptance criteria auto-linked from requirements",
            body: `Tests are generated from acceptance criteria, which are auto-linked from requirements. The agent writes tests from intent, not from code.`,
          },
          {
            title: "Production incident history",
            body: `Past failure modes are the best seed corpus for new edge-case generation. The agent ingests incident history and generates regression tests automatically.`,
          },
        ],
        guardrails: [
          {
            title: "Deterministic gates still rule",
            body: `CI runs the tests; the agent never judges the result. Same input, same result, every time. No AI judgment in the critical path.`,
          },
          {
            title: "Agent never judges pass/fail",
            body: `The agent generates tests, runs tests, maintains tests — but CI judges pass/fail. The agent cannot approve its own code.`,
          },
          {
            title: "Flaky test auto-quarantine",
            body: `Zero tolerated flakiness: flaky tests are quarantined automatically with explicit ownership. If not fixed within 24 hours, the test is deleted.`,
          },
          {
            title: "Testing pyramid enforced in CI",
            body: `Integration tests for service boundaries, E2E for critical flows, contract tests for APIs — system-level confidence the agent can't fake with unit tests.`,
          },
        ],
      },
    },

    /* ======================================================================
       5 — DELIVERY & RELEASE
       ===================================================================== */
    {
      id: "delivery",
      name: "Delivery & Release",
      short: "Delivery",
      tagline: "Agent manages rollout, canary, and rollback autonomously — human approves first deploys",
      principle: "Agent manages continuous deployment; human approves first production deploy of new services.",
      outcomes: ["Continuous deployment", "Autonomous rollback", "Business-metric gates"],
      facets: {
        opportunities: [
          {
            title: "Continuous deployment managed by the agent",
            body: `The agent manages the entire deployment pipeline — from merge to production. Canary deployments, progressive rollouts, and rollbacks are all autonomous.`,
          },
          {
            title: "Agent manages rollout, canary, and rollback autonomously",
            body: `The agent monitors canary metrics, progresses rollouts, and triggers rollbacks automatically. No human needed — unless business metrics trigger a rollback.`,
          },
          {
            title: "Auto-rollback based on business metrics",
            body: `Rollbacks are triggered by business metrics (revenue, conversion rate) — not just technical metrics (error rate, latency). If revenue drops, the system reverts automatically.`,
          },
          {
            title: "Deployment policy as code",
            body: `Deployment policies (who can deploy what, when, and how) are encoded as code. The agent enforces policies automatically — no tribal memory, no manual approval matrices.`,
          },
        ],
        risks: [
          {
            title: "Auto-rollback triggers on wrong metric",
            body: `If rollback triggers are based on the wrong metric, the system reverts unnecessarily — or doesn't revert when it should. Business metrics are noisy; technical metrics are deterministic.`,
          },
          {
            title: "Deploy velocity without governance",
            body: `At Level 3, the agent deploys continuously — but without governance, velocity becomes chaos. Deployment policies must be encoded as code and enforced in CI.`,
          },
          {
            title: "Feature flag sprawl",
            body: `At Level 3, feature flags decouple deploy from release — but without cleanup, flags accumulate. The agent must auto-expire flags after a set period, or the codebase becomes unmaintainable.`,
          },
        ],
        feedforward: [
          {
            title: "IaC always in sync",
            body: `Infrastructure as Code is always in sync with actual infrastructure. The agent validates IaC against reality — no drift, no surprises.`,
          },
          {
            title: "Deployment policy as code",
            body: `Deployment policies are encoded as code — who can deploy what, when, and how. The agent enforces policies automatically.`,
          },
          {
            title: "Automated rollback thresholds",
            body: `Rollback thresholds are defined as code — error rate, latency, business metrics. The agent triggers rollbacks automatically when thresholds are breached.`,
          },
        ],
        guardrails: [
          {
            title: "Auto-rollback based on business metrics",
            body: `Rollbacks are triggered by business metrics (revenue, conversion rate) — not just technical metrics. If revenue drops, the system reverts automatically.`,
          },
          {
            title: "Human approval for first production deploy of new services",
            body: `The agent can deploy to existing services autonomously — but the first production deploy of a new service needs human approval. After that, the agent manages it.`,
          },
          {
            title: "Canary progression stays deterministic",
            body: `Canary progression and rollback triggers are rule-based metrics thresholds. No AI in the loop — deterministic gates only.`,
          },
          {
            title: "Feature flag infrastructure",
            body: `Dark launches, canary cohorts — "code is deployed" and "feature is live" are separate decisions. The agent manages both, but humans approve the latter.`,
          },
        ],
      },
    },

    /* ======================================================================
       6 — OPERATIONS & FEEDBACK
       ===================================================================== */
    {
      id: "operations",
      name: "Operations & Feedback",
      short: "Operations",
      tagline: "Agent investigates incidents, drafts and deploys fixes — human approves production changes",
      principle: "Agent investigates and proposes fixes; human approves production changes. Auto-rollback for failed fixes.",
      outcomes: ["Autonomous investigation", "Self-healing production", "Human-approved fixes"],
      facets: {
        opportunities: [
          {
            title: "Agent investigates incidents autonomously",
            body: `The agent has full read-write access to observability (logs, traces, metrics). It investigates incidents autonomously, correlates patterns, and proposes fixes — no human needed to start the investigation.`,
          },
          {
            title: "Agent drafts and deploys fixes",
            body: `The agent doesn't just propose fixes — it drafts code, runs tests, and deploys the fix. If the fix passes CI, it's deployed automatically. If it fails, auto-rollback reverts it.`,
          },
          {
            title: "Self-healing production",
            body: `Production heals itself: the agent detects anomalies, investigates root causes, and deploys fixes — all autonomously. Humans are notified, but don't need to intervene unless the fix fails.`,
          },
          {
            title: "Incident history auto-fed to agent context",
            body: `Past incidents and their fixes are auto-fed to the agent's context. The agent learns from history — and applies those learnings to new incidents automatically.`,
          },
        ],
        risks: [
          {
            title: "Over-trust in agent root-cause analysis",
            body: `The agent produces convincing causal stories from logs — but a narrative that fits the symptoms is not a verified root cause. Engineers must reproduce before they believe, even at Level 3.`,
          },
          {
            title: "On-call muscle atrophy completely",
            body: `At Level 3, the agent handles everything — and human on-call skills atrophy completely. When the agent can't handle a case (novel failure, complex interaction), humans are unprepared.`,
          },
          {
            title: "Feedback loop without prioritization",
            body: `The agent fixes everything immediately — but the loudest feedback gets fixed first, the roadmap dissolves into reactive patching. The loop needs a product owner at the valve, even at Level 3.`,
          },
        ],
        feedforward: [
          {
            title: "Observability MCP (full read-write access)",
            body: `The agent has full read-write access to the observability stack — logs, traces, metrics. It investigates incidents autonomously, correlates patterns, and proposes fixes.`,
          },
          {
            title: "Incident history auto-fed to agent context",
            body: `Past incidents and their fixes are auto-fed to the agent's context. The agent learns from history — and applies those learnings to new incidents automatically.`,
          },
          {
            title: "Production signals feed back into planning",
            body: `Production signals (incidents, performance, user feedback) feed back into the analysis stage automatically. The loop never stops — requirements emerge from reality, not workshops.`,
          },
        ],
        guardrails: [
          {
            title: "Alert thresholds stay rule-based",
            body: `Alert thresholds are rule-based — not AI-judged. The agent proposes tuning; rules decide when humans get woken up. Deterministic gates only.`,
          },
          {
            title: "Agent can only deploy fixes with human approval",
            body: `The agent investigates and proposes fixes — but deploying fixes to production needs human approval. Auto-rollback for failed fixes is the safety net.`,
          },
          {
            title: "Auto-rollback for failed fixes",
            body: `If a fix fails (error rate increases, latency spikes), auto-rollback reverts it automatically. No human needed to press the button — the system heals itself.`,
          },
          {
            title: "Debugging conclusions validated by engineers",
            body: `The agent's root-cause hypothesis is an input to investigation, never its end. Engineers must reproduce before they believe — even at Level 3.`,
          },
        ],
      },
    },
  ],
};
