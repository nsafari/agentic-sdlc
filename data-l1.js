/* =============================================================================
   AGENTIC SDLC — LEVEL 1 CONTENT MODEL
   For non-software businesses with no SDLC knowledge.
   3 stages: Define → Prototype → Deploy. Same 5 principles, simpler language.
   ========================================================================== */

window.SDLC_DATA_L1 = {
  meta: {
    title: "AI for Your Business",
    subtitle: "How AI tools can improve your operations — even if you've never built software",
    org: "Specific-Group Austria",
    version: "0.1",
  },

  /* ---------------------------------------------------------------------------
     PRINCIPLES INTRO — adapted for a business audience.
     ------------------------------------------------------------------------ */
  principlesIntro: `If you put a jet engine on a bicycle, you don't get to work faster — you crash. AI tools are that jet engine. They can do incredible things, but only if you set them up correctly.

---

### Why Discipline Still Matters

When AI can write a report in seconds or build a prototype in a day, the bottleneck shifts from **making things** to **checking they're right**.

If an AI drafts a customer proposal in 10 seconds, but nobody checks whether the numbers are correct, you haven't saved time — you've created risk. The same rules that keep software teams safe apply here: test before you trust, check before you ship, and always keep a human in the loop for decisions.

### The 5 Rules for Using AI Safely

These five principles keep you moving fast without crashing:`,

  /* ---------------------------------------------------------------------------
     PRINCIPLES — the 5 disciplines, rewritten for business.
     ------------------------------------------------------------------------ */
  principles: [
    {
      id: "test-driven-prompting",
      title: "1. Know What You Want Before You Ask",
      subtitle: "Define the outcome before letting AI produce it",
      body: `Before asking an AI to do anything, write down what "done" looks like. What should the output contain? What should it NOT contain? If you can't describe the result, the AI will guess — and its guesses look convincing even when they're wrong.`,
    },
    {
      id: "aggressive-cicd",
      title: "2. Check Before You Use",
      subtitle: "Every AI output needs a human review before it goes live",
      body: `AI can produce polished-looking documents, emails, and plans in seconds. That speed is the danger. Build a habit: nothing AI-produced goes to a customer, a boss, or a bank account without a human checking it first. The review takes 30 seconds. The mistake could cost 30 days.`,
    },
    {
      id: "observability",
      title: "3. Watch What Happens After",
      subtitle: "Track results so you know if the AI is helping or hurting",
      body: `Once you start using AI for a task, measure what changes. Did response times improve? Did errors go up? Did customers notice? If you don't track results, you can't tell whether the AI is an asset or a liability.`,
    },
    {
      id: "micro-reviews",
      title: "4. Small Steps, Not Big Leaps",
      subtitle: "Use AI for one task at a time, then check the result",
      body: `Don't let AI rewrite your entire workflow in one go. Pick one task — drafting emails, summarizing meetings, organizing data — get it working well, then move to the next. Small steps mean small mistakes. Big leaps mean big surprises.`,
    },
    {
      id: "architectural-decoupling",
      title: "5. Keep Things Separate",
      subtitle: "Don't let one AI tool control everything",
      body: `If one AI tool handles your emails, your finances, your customer data, and your scheduling — and it breaks — everything breaks. Keep tasks in separate tools where possible. If one fails, the rest keep working.`,
    },
  ],

  principlesOutro: `> **The Bottom Line:** AI doesn't replace good judgment — it amplifies it. The businesses that benefit most aren't the ones using the most AI. They're the ones using it carefully, with clear rules and human oversight.`,

  /* ---------------------------------------------------------------------------
     STAGES — 3 stages for non-software businesses.
     ------------------------------------------------------------------------ */
  stages: [
    /* ======================================================================
       1 — DEFINE
       ===================================================================== */
    {
      id: "define",
      name: "Define",
      short: "Define",
      tagline: "Turn business needs into clear requirements — no technical jargon",
      principle: "The harnessing engineer translates business pain into a spec the agent can build.",
      outcomes: ["Clear requirements", "Right scope", "No surprises"],
      facets: {
        opportunities: [
          {
            title: "Meeting transcripts become requirements",
            body: `Record your planning meetings. An AI can turn the conversation into a structured list of what you need — no more forgotten details or misremembered decisions.`,
          },
          {
            title: "Business language becomes a buildable plan",
            body: `You describe the problem in your words ("I need to track which customers haven't paid"). The harnessing engineer translates that into something a tool can actually do. No technical knowledge required from you.`,
          },
          {
            title: "Hidden requirements surface early",
            body: `The AI reviews your current workflow and asks questions you haven't thought of: "What happens when a customer pays twice? What if the amount is wrong?" Problems caught now cost nothing. Problems caught later cost everything.`,
          },
          {
            title: "Non-functional needs from your current workflow",
            body: `How fast does it need to be? Who needs access? What happens if it goes down? These questions get answered by looking at how you work today — not by guessing.`,
          },
        ],
        risks: [
          {
            title: "AI invents requirements nobody asked for",
            tags: { source: "draft" },
            body: `The AI fills gaps with plausible-sounding features. The document looks complete, but half of it is fiction. Always check: did we actually say this, or did the AI assume it?`,
          },
          {
            title: "Polished document, wrong thinking",
            tags: { source: "draft" },
            body: `A beautifully formatted requirements document can hide shallow thinking. The quality of the writing doesn't match the quality of the analysis. Read critically, not admiringly.`,
          },
          {
            title: "Everyone's voice gets averaged out",
            tags: { source: "draft" },
            body: `When the AI summarizes a meeting, disagreements disappear. The contentious 10% — usually the most important part — reads like everyone agreed. Go back to the recording for the parts that mattered.`,
          },
        ],
        feedforward: [
          {
            title: "Your existing documents",
            tags: { source: "draft" },
            body: `Excel sheets, Notion pages, WhatsApp messages, email threads — all of these contain requirements already. The AI can extract them instead of starting from a blank page.`,
          },
          {
            title: "A plain-language glossary",
            tags: { source: "draft" },
            body: `Write down what your key terms mean. "Customer" — does that include prospects? "Order" — does that include returns? A one-page glossary prevents weeks of confusion later.`,
          },
          {
            title: "Business constraints, documented",
            tags: { source: "draft" },
            body: `Budget, timeline, who needs to approve what, regulatory requirements — write these down before the project starts. The AI can work within constraints it knows about.`,
          },
          {
            title: "Meeting recordings and transcripts",
            tags: { source: "draft" },
            body: `Raw recordings are the best input for requirement drafting. Let the AI work from what was actually said, not from someone's notes.`,
          },
        ],
        guardrails: [
          {
            title: "You approve the scope — not the AI",
            body: `The AI drafts. You decide. Prioritization and value decisions are always human. If the AI suggests adding a feature, you say yes or no.`,
          },
          {
            title: "Every requirement traces back to a business need",
            body: `If you can't explain why a requirement exists in business terms, it doesn't belong. Every feature should answer: "What problem does this solve?"`,
          },
          {
            title: "Definition of ready: you can walk through it",
            body: `Before building starts, you should be able to describe the finished tool in plain language and say "yes, that's what I need." If you can't, it's not ready.`,
          },
        ],
      },
    },

    /* ======================================================================
       2 — PROTOTYPE
       ===================================================================== */
    {
      id: "prototype",
      name: "Prototype",
      short: "Prototype",
      tagline: "A working slice in days, not slides in months",
      principle: "Build the smallest thing that proves the hypothesis.",
      outcomes: ["Clickable prototype", "Real feedback", "Validated assumptions"],
      facets: {
        opportunities: [
          {
            title: "A working tool in days, not months",
            body: `The harnessing engineer builds a clickable prototype using AI — HTML, buttons, forms, the works. You can click through it, test it, show it to your team. No more guessing from wireframes.`,
          },
          {
            title: "Click-through validation",
            body: `Your team uses the prototype with real tasks. "Can you process this order?" "Can you find this customer's history?" If they can't, you know before you've invested in a full build.`,
          },
          {
            title: "Iterative refinement with real data",
            body: `The prototype uses your actual data — your customer list, your product catalog, your order history. Feedback is based on reality, not imagination.`,
          },
          {
            title: "Design aligned with your existing tools",
            body: `The prototype follows patterns your team already knows. If you use Excel, it looks like a spreadsheet. If you use a CRM, it feels like a CRM. Familiarity reduces training time.`,
          },
        ],
        risks: [
          {
            title: "Works in the demo, breaks on real data",
            body: `The prototype handles 10 customers perfectly. But you have 10,000. What worked in the test fails in production. Always test with your real data volume before committing.`,
          },
          {
            title: "Over-engineering the prototype",
            tags: { source: "draft" },
            body: `The prototype looks so polished that people assume it's finished. It's not. A prototype proves the idea works. It's not the final product. Don't confuse the two.`,
          },
          {
            title: "Prototype becomes production without hardening",
            tags: { source: "draft" },
            body: `The prototype works well enough, so the team starts using it for real. But it has no backups, no security, no error handling. What started as a test becomes a liability.`,
          },
        ],
        feedforward: [
          {
            title: "Sample data from your business",
            tags: { source: "draft" },
            body: `Give the harnessing engineer real data to work with — a few hundred rows from your spreadsheet, sample invoices, actual customer records (anonymized if needed). The prototype should feel real.`,
          },
          {
            title: "Your current tools, documented",
            tags: { source: "draft" },
            body: `List the tools you already use and what they do. The prototype should integrate with them, not replace them — unless replacement is the goal.`,
          },
          {
            title: "UI patterns from tools you already use",
            tags: { source: "draft" },
            body: `If your team uses a specific CRM or accounting tool, show the harnessing engineer. The prototype should follow familiar patterns so training is minimal.`,
          },
        ],
        guardrails: [
          {
            title: "You walk through it before it goes live",
            body: `Before the prototype becomes a real tool, you click through every screen, test every button, check every calculation. If you can't use it confidently, it's not ready.`,
          },
          {
            title: "Input validation is built in",
            body: `The prototype should reject bad data — wrong formats, missing fields, impossible values. Don't wait until production to discover that "customer name" can't be left blank.`,
          },
          {
            title: "Error states are designed, not discovered",
            body: `What happens when something goes wrong? The prototype should show clear error messages, not crash or display nonsense. Test the failures, not just the happy path.`,
          },
        ],
      },
    },

    /* ======================================================================
       3 — DEPLOY
       ===================================================================== */
    {
      id: "deploy",
      name: "Deploy",
      short: "Deploy",
      tagline: "From prototype to production in one click — via MCP",
      principle: "Deployment is a decision, not a project. The PO says go; the tooling does the rest.",
      outcomes: ["Live tool", "Access for users", "Usage tracking"],
      facets: {
        opportunities: [
          {
            title: "One-click deployment via MCP",
            body: `MCP (Model Context Protocol) lets the harnessing engineer deploy your tool with a single command. No manual server setup, no configuration headaches. The tool goes from prototype to live in minutes.`,
          },
          {
            title: "Platform choice based on your needs",
            body: `Web-based tool for office use? Android app for field staff? The harnessing engineer picks the right platform based on how your team actually works — not based on what's trendy.`,
          },
          {
            title: "Usage tracking from day one",
            body: `From the moment the tool goes live, you can see who's using it, how often, and for what. No more guessing whether the investment is paying off. The data tells you.`,
          },
          {
            title: "Rollback if something goes wrong",
            body: `If the live tool has problems, you can roll back to the previous version instantly. No downtime, no data loss, no panic.`,
          },
        ],
        risks: [
          {
            title: "Deploy equals 'done' — but it's not",
            body: `The tool is live, so everyone assumes the work is finished. But tools need updates, fixes, and improvements. Without a plan for ongoing maintenance, the tool becomes outdated in months.`,
          },
          {
            title: "No monitoring after launch",
            tags: { source: "draft" },
            body: `The tool goes live, but nobody checks whether it's actually working. Errors pile up. Users switch back to the old way. You don't discover the problem until three months later.`,
          },
          {
            title: "Security not considered for an internal tool",
            tags: { source: "draft" },
            body: `"It's just for our team, so security doesn't matter." Wrong. Internal tools handle customer data, financial records, employee information. A breach is a breach, regardless of who the tool is for.`,
          },
        ],
        feedforward: [
          {
            title: "Deployment MCP configured",
            tags: { source: "draft" },
            body: `The harnessing engineer sets up the deployment pipeline before launch. One command deploys. One command rolls back. No manual steps, no room for error.`,
          },
          {
            title: "Usage tracking tool selected",
            tags: { source: "draft" },
            body: `Choose a simple analytics tool before launch. You need to know: who's using it, how often, and whether they're getting value.`,
          },
          {
            title: "Rollback path documented",
            tags: { source: "draft" },
            body: `Write down the steps to roll back before you deploy. If something goes wrong at 2am, you don't want to be figuring out the process for the first time.`,
          },
        ],
        guardrails: [
          {
            title: "You approve go-live — not the AI",
            body: `The harnessing engineer prepares everything. But you make the final call: "Is this ready for our team to use?" If you're not confident, wait.`,
          },
          {
            title: "Usage data reviewed weekly",
            body: `Every week, check the usage data. Are people using it? Are they getting value? Are there errors? Weekly reviews catch problems before they become disasters.`,
          },
          {
            title: "Rollback plan tested",
            body: `Before you deploy, test the rollback. Can you actually go back to the previous version? Don't assume it works — prove it.`,
          },
        ],
      },
    },
  ],
};
