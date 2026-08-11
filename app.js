/* =============================================================================
   AGENTIC SDLC — rendering. Infrastructure: you should never need to edit
   this file to add content; edit data.js instead.
   ========================================================================== */
(function () {
  const { html, render, useState, useEffect } = window.htmPreact;
  let DATA = window.SDLC_DATA;
  function syncData() {
    DATA = (I18n.getLanguage() === "fa" && window.SDLC_DATA_FA) ? window.SDLC_DATA_FA : window.SDLC_DATA;
  }

  marked.use({
    renderer: {
      link(href, title, text) {
        return `<a href="${href}" target="_blank" rel="noopener"${title ? ` title="${title}"` : ""}>${text}</a>`;
      },
    },
  });

  const I18n = window.I18n || {
    t: (k) => k,
    getLanguage: () => 'en',
    getDirection: () => 'ltr',
    setLanguage: () => {},
  };

  const FACETS = [
    { key: "opportunities", label: () => I18n.t("facets.opportunities"), desc: () => I18n.t("facetDescriptions.opportunities") },
    { key: "risks", label: () => I18n.t("facets.risks"), desc: () => I18n.t("facetDescriptions.risks") },
    { key: "feedforward", label: () => I18n.t("facets.feedforward"), desc: () => I18n.t("facetDescriptions.feedforward") },
    { key: "guardrails", label: () => I18n.t("facets.guardrails"), desc: () => I18n.t("facetDescriptions.guardrails") },
  ];

  /* ------------------------------------------------------------ routing */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    const [a, b, c] = h.split("/").filter(Boolean);
    if (a === "principles") return { view: "principles" };
    if (a === "stage" && b) return { view: "stage", stage: b, facet: c || null };
    return { view: "home" };
  }

  let lastRoute = parseHash();
  function useRoute() {
    const [route, setRoute] = useState(lastRoute);
    useEffect(() => {
      const fn = () => {
        const next = parseHash();
        // morph the wheel between views (View Transitions API); facet jumps
        // within the same stage stay instant so smooth-scroll isn't frozen
        const sameView = next.view === lastRoute.view && next.stage === lastRoute.stage;
        lastRoute = next;
        if (!sameView && document.startViewTransition) {
          document.startViewTransition(async () => {
            setRoute(next);
            await new Promise((r) => setTimeout(r, 0)); // let preact flush the DOM
          });
        } else {
          setRoute(next);
        }
      };
      window.addEventListener("hashchange", fn);
      return () => window.removeEventListener("hashchange", fn);
    }, []);
    return route;
  }

  /* ----------------------------------------------------------- markdown */
  function Md({ src }) {
    if (!src) return null;
    return html`<div class="md" dangerouslySetInnerHTML=${{ __html: marked.parse(src) }} />`;
  }

  /* -------------------------------------------------------------- blocks */
  function Block({ block }) {
    if (block.type === "links") {
      return html`<div class="block-links">
        ${block.items.map((it) => html`<a href=${it.url} target="_blank" rel="noopener">${it.label}</a>`)}
      </div>`;
    }
    if (block.type === "html") {
      return html`<div dangerouslySetInnerHTML=${{ __html: block.html }} />`;
    }
    return null;
  }

  /* ------------------------------------------------------ recursive node */
  function Node({ node, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const expandable = node.body || (node.children && node.children.length) || (node.blocks && node.blocks.length);
    const draft = node.tags && node.tags.source === "draft";
    return html`<div class="node ${open ? "open" : ""}">
      <button class="node-row" onClick=${() => expandable && setOpen(!open)}>
        <span class="tw">${expandable ? "▸" : "·"}</span>
        <span class="t">${node.title}</span>
        ${draft && html`<span class="badge-draft" title="${I18n.t("common.draftTooltip")}">${I18n.t("common.draft")}</span>`}
      </button>
      ${open &&
      html`<div class="node-body">
        <${Md} src=${node.body} />
        ${(node.blocks || []).map((b) => html`<${Block} block=${b} />`)}
        ${node.children && node.children.length
          ? html`<div class="children">${node.children.map((c) => html`<${Node} node=${c} depth=${depth + 1} />`)}</div>`
          : null}
      </div>`}
    </div>`;
  }

  /* --------------------------------------------------------------- wheel */
  const TAU = Math.PI * 2;
  function pt(cx, cy, r, deg) {
    const a = (deg * TAU) / 360;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  // donut segment with rounded corners (rc = corner radius)
  function donutSeg(cx, cy, r1, r2, a0, a1, rc = 10) {
    const oo = ((rc / r2) * 180) / Math.PI; // angular offset of the corner at outer radius
    const oi = ((rc / r1) * 180) / Math.PI;
    const large = a1 - a0 - 2 * oo > 180 ? 1 : 0;
    const p = (r, a) => pt(cx, cy, r, a).join(" ");
    return [
      `M ${p(r2, a0 + oo)}`,
      `A ${r2} ${r2} 0 ${large} 1 ${p(r2, a1 - oo)}`,
      `A ${rc} ${rc} 0 0 1 ${p(r2 - rc, a1)}`,
      `L ${p(r1 + rc, a1)}`,
      `A ${rc} ${rc} 0 0 1 ${p(r1, a1 - oi)}`,
      `A ${r1} ${r1} 0 ${large} 0 ${p(r1, a0 + oi)}`,
      `A ${rc} ${rc} 0 0 1 ${p(r1 + rc, a0)}`,
      `L ${p(r2 - rc, a0)}`,
      `A ${rc} ${rc} 0 0 1 ${p(r2, a0 + oo)}`,
      "Z",
    ].join(" ");
  }
  function arcPath(cx, cy, r, a0, a1) {
    const [x0, y0] = pt(cx, cy, r, a0);
    const [x1, y1] = pt(cx, cy, r, a1);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  }

  function Wheel({ activeStage, mini = false }) {
    const S = 760;
    const cx = S / 2, cy = S / 2 + 10;
    const r1 = 218, r2 = 312;
    const gap = 3.2; // degrees of breathing room between segments
    const n = DATA.stages.length;
    const step = 360 / n;
    const go = (h) => (location.hash = h);
    // mini = half-dial pinned to the sidebar's left edge: only the right
    // half of the wheel is in the viewBox, rotated so the active stage sits
    // at 3 o'clock with its neighbours above and below
    const activeIdx = DATA.stages.findIndex((st) => st.id === activeStage);
    const base = mini && activeIdx >= 0 ? -(activeIdx + 0.5) * step : -90;
    const isRTL = I18n.getDirection() === "rtl";

    const segs = DATA.stages.map((st, i) => {
      const a0 = base + i * step + gap;
      const a1 = base + (i + 1) * step - gap;
      const mid = (a0 + a1) / 2;
      const rm = (r1 + r2) / 2;
      const rad = (mid * TAU) / 360;
      const ux = Math.cos(rad).toFixed(4);
      const uy = Math.sin(rad).toFixed(4);
      const active = activeStage === st.id;
      // labels curve along the ring via textPath; bottom-half segments draw
      // their text arcs reversed so nothing reads upside down. Radii stack
      // num / title / sub from the visual top down in both hemispheres.
      // The half-dial's rotation can push mids outside -90..270, so map back
      // into the full wheel's frame before deciding the hemisphere.
      const norm = ((((mid + 90) % 360) + 360) % 360) - 90;
      const flip = norm > 1 && norm < 179;
      const tArc = (r) =>
        flip
          ? `M ${pt(cx, cy, r, a1).join(" ")} A ${r} ${r} 0 0 0 ${pt(cx, cy, r, a0).join(" ")}`
          : `M ${pt(cx, cy, r, a0).join(" ")} A ${r} ${r} 0 0 1 ${pt(cx, cy, r, a1).join(" ")}`;
      const pid = `tp-${st.id}${mini ? "-m" : ""}`;
      const rNum = flip ? rm - 16 : rm + 26;
      const rLbl = flip ? rm + 8 : rm - 2;
      const rSub = flip ? rm + 30 : rm - 26;
      const sub = st.name !== st.short ? st.name.replace(`${st.short} & `, "& ") : "";
      // segments rotated onto the dial's hidden half skip their labels
      const inView = !mini || (isRTL ? Math.cos(rad) < -0.1 : Math.cos(rad) > 0.1);
      const labels =
        inView &&
        html`<path class="tp" id="${pid}-num" d=${tArc(rNum)} />
          <path class="tp" id="${pid}-lbl" d=${tArc(rLbl)} />
          <path class="tp" id="${pid}-sub" d=${tArc(rSub)} />
          <text class="num" text-anchor="middle">
            <textPath href="#${pid}-num" startOffset="50%">0${i + 1}</textPath>
          </text>
          <text class="lbl" text-anchor="middle">
            <textPath href="#${pid}-lbl" startOffset="50%">${st.short}</textPath>
          </text>
          ${sub &&
          html`<text class="sub" text-anchor="middle">
            <textPath href="#${pid}-sub" startOffset="50%">${sub}</textPath>
          </text>`}`;
      return html`<g
        class="seg ${active ? "active" : ""}"
        style=${`--px:${ux};--py:${uy};--d:${i * 70}ms`}
        onClick=${() => go(`#/stage/${st.id}`)}
        tabindex="0"
        role="button"
        aria-label=${st.name}
      >
        <path class="arc" d=${donutSeg(cx, cy, r1, r2, a0, a1)} />
        <path class="accent" d=${arcPath(cx, cy, r2 - 6, a0 + 4, a1 - 4)} />
        ${labels}
      </g>`;
    });

    // instrument-dial tick marks outside the outer guide ring; the gap at the
    // top leaves room for the feedback arc and its label
    const ticks = [];
    if (!mini) {
      for (let d = 0; d < 360; d += 6) {
        if (d > 230 && d < 310) continue;
        const major = d % 30 === 0;
        const [tx0, ty0] = pt(cx, cy, r2 + 20, d);
        const [tx1, ty1] = pt(cx, cy, r2 + (major ? 29 : 25), d);
        ticks.push(html`<line class="tick ${major ? "major" : ""}" x1=${tx0} y1=${ty0} x2=${tx1} y2=${ty1} />`);
      }
    }

    // small clockwise flow ticks between segments (lifecycle direction)
    const flows = DATA.stages.map((_, i) => {
      const a = base + (i + 1) * step;
      return html`<path class="flow" d=${arcPath(cx, cy, (r1 + r2) / 2, a - gap + 1.4, a + gap - 1.4)} />`;
    });

    // amber feedback arc: Operations (last segment mid) back over the top to Analysis (first segment mid)
    const fbR = r2 + 26;
    const fbA0 = -90 + (n - 0.5) * step + 6; // mid of last segment
    const fbA1 = -90 + 0.5 * step - 6 + 360; // mid of first segment, next turn
    const fb = arcPath(cx, cy, fbR, fbA0, fbA1);
    const [flx, fly] = pt(cx, cy, fbR + 18, -90);

    // half-dial crop: viewBox starts at the wheel's center so only the right
    // half renders, pinned to the sidebar's left edge by xMinYMid.
    // In RTL the sidebar is on the right, so show the LEFT half instead.
    const R = r2 + 16;
    const vb = mini
      ? (isRTL
          ? `${cx - R - 12} ${cy - R} ${R + 12} ${R * 2}`
          : `${cx} ${cy - R} ${R + 12} ${R * 2}`)
      : `0 0 ${S} ${S + 10}`;
    return html`<svg
      class="wheel ${mini ? "mini" : ""}"
      viewBox=${vb}
      preserveAspectRatio=${mini ? (isRTL ? "xMaxYMid meet" : "xMinYMid meet") : "xMidYMid meet"}
      aria-label="SDLC wheel"
    >
      <defs>
        <marker id="fbArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--amber)" />
        </marker>
        <marker id="flowArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" class="flow-head" />
        </marker>
        <radialGradient id="hubGlow">
          <stop offset="55%" class="g-hubglow-0" />
          <stop offset="100%" class="g-hubglow-1" />
        </radialGradient>
        <radialGradient id="segFill" gradientUnits="userSpaceOnUse" cx=${cx} cy=${cy} r=${r2}>
          <stop offset="64%" class="g-seg-0" />
          <stop offset="100%" class="g-seg-1" />
        </radialGradient>
        <linearGradient id="hubCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" class="g-hub-0" />
          <stop offset="100%" class="g-hub-1" />
        </linearGradient>
      </defs>
      <circle class="ring-guide" cx=${cx} cy=${cy} r=${r1 - 14} />
      <circle class="ring-guide" cx=${cx} cy=${cy} r=${r2 + 14} />
      ${ticks}
      ${flows}
      ${segs}
      ${!mini && html`<path class="feedback-arc" d=${fb} />`}
      ${!mini && html`<text class="feedback-lbl" x=${flx} y=${fly - 2} text-anchor="middle">continuous feedback</text>`}
      <g
        class="hub ${activeStage === "__principles" ? "active" : ""}"
        onClick=${() => go("#/principles")}
        tabindex="0"
        role="button"
        aria-label="Principles"
      >
        <circle class="core" cx=${cx} cy=${cy} r=${r1 - 44} />
        <circle class="glow" cx=${cx} cy=${cy} r=${r1 - 45} fill="url(#hubGlow)" />
        <circle class="orbit" cx=${cx} cy=${cy} r=${r1 - 58} />
        <text class="hub-kicker" x=${mini ? cx + 80 : cx} y=${mini ? cy - 14 : cy - 28} text-anchor="middle">${I18n.t("nav.principlesHub")}</text>
        <text class="hub-title" x=${mini ? cx + 80 : cx} y=${mini ? cy + 12 : cy + 2} text-anchor="middle">${I18n.t("nav.principles")}</text>
        ${!mini &&
        html`<text class="hub-sub" x=${cx} y=${cy + 26} text-anchor="middle">
          ${I18n.t("hub.whatHolds")}
        </text>`}
        ${!mini &&
        DATA.principles.map((_, i) => {
          const x = cx + (i - (DATA.principles.length - 1) / 2) * 16;
          return html`<circle class="p-dot" cx=${x} cy=${cy + 48} r="2.5" />`;
        })}
      </g>
    </svg>`;
  }

  /* -------------------------------------------------------------- topbar */
  // themes cycle: "pro" (light, presentation default) → "dark" (instrument
  // panel) → "paper" (cozy field notes). index.html applies the saved choice
  // before first paint; this just advances the cycle.
  const THEMES = ["pro", "dark", "paper"];
  const THEME_LABEL = {
    pro: () => I18n.t("topbar.theme"),
    dark: () => I18n.t("topbar.darkTheme"),
    paper: () => I18n.t("topbar.paperTheme"),
  };
  function Topbar() {
    const [theme, setTheme] = useState(document.documentElement.dataset.theme || "pro");
    const [lang, setLang] = useState(I18n.getLanguage());
    const cycleTheme = () => {
      const idx = THEMES.indexOf(theme);
      const next = THEMES[(idx + 1) % THEMES.length];
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("sdlc-theme", next);
      } catch (e) {
        /* file:// without storage — theme still applies for this session */
      }
      setTheme(next);
    };
    const toggleLang = () => {
      const next = lang === "en" ? "fa" : "en";
      I18n.setLanguage(next);
    };
    useEffect(() => {
      const handler = () => setLang(I18n.getLanguage());
      window.addEventListener("languagechange", handler);
      return () => window.removeEventListener("languagechange", handler);
    }, []);
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    return html`<header class="topbar">
      <div class="brand" onClick=${() => (location.hash = "#/")}>
        <h1>${I18n.t("meta.title")}</h1>
        <span class="version">v${DATA.meta.version}</span>
      </div>
      <div class="topbar-right">
        <div class="org">${I18n.t("meta.org")}</div>
        <button class="lang-btn" onClick=${toggleLang} title=${lang === "en" ? "Switch to Persian" : "تغییر به انگلیسی"}>
          <span class="lang-globe">◉</span>
          <span class="lang-label">${lang === "en" ? "فارسی" : "English"}</span>
        </button>
        <button class="theme-btn" onClick=${cycleTheme} title="Switch visual theme">
          ${THEME_LABEL[next]()}
        </button>
      </div>
    </header>`;
  }

  /* ------------------------------------------------------------- sidebar */
  function Sidebar({ route }) {
    return html`<aside class="sidebar">
      <div class="mini-wheel">
        <${Wheel} mini activeStage=${route.view === "principles" ? "__principles" : route.stage} />
      </div>
      <nav>
        <a href="#/" class=${route.view === "home" ? "active" : ""}><span class="n">⌂</span> ${I18n.t("nav.overview")}</a>
        <a href="#/principles" class=${route.view === "principles" ? "active" : ""}><span class="n">◉</span> ${I18n.t("nav.principles")}</a>
        <div class="sep"></div>
        ${DATA.stages.map(
          (st, i) =>
            html`<a href="#/stage/${st.id}" class=${route.stage === st.id ? "active" : ""}>
              <span class="n">0${i + 1}</span> ${st.name}
            </a>`
        )}
      </nav>
    </aside>`;
  }

  /* ----------------------------------------------------------- stage view */
  function StagePanel({ stage, idx, facetFocus }) {
    useEffect(() => {
      if (facetFocus) {
        const el = document.getElementById(`facet-${facetFocus}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    }, [stage.id, facetFocus]);

    return html`<main class="panel">
      <div class="crumb"><a href="#/">${I18n.t("common.breadcrumb")}</a> / ${I18n.t("stage.stageNum")} 0${idx + 1}</div>
      <div class="stage-head">
        <div class="stage-num">${I18n.t("stage.stageNum")} 0${idx + 1} / ${I18n.t("stage.of")} 06</div>
        <h2>${stage.name}</h2>
        <p class="tagline">${stage.tagline}</p>
      </div>
      <div class="principle-quote">
        <span class="pq-kicker">${I18n.t("stage.stagePrinciple")}</span>
        ${stage.principle}
      </div>
      <div class="chips">${(stage.outcomes || []).map((o) => html`<span class="chip">${o}</span>`)}</div>

      <div class="facet-nav">
        ${FACETS.map(
          (f) =>
            html`<a
              href="#/stage/${stage.id}/${f.key}"
              data-facet=${f.key}
              class=${facetFocus === f.key ? "active" : ""}
              >${f.label()}</a
            >`
        )}
      </div>

      ${FACETS.map((f) => {
        const nodes = (stage.facets && stage.facets[f.key]) || [];
        return html`<section class="facet" data-facet=${f.key} id="facet-${f.key}">
          <div class="facet-head">
            <span class="f-mark"></span>
            <h3>${f.label()}</h3>
            <span class="f-desc">${f.desc()}</span>
            <span class="f-count">${nodes.length}</span>
          </div>
          ${nodes.map((nd) => html`<${Node} node=${nd} />`)}
        </section>`;
      })}
      <div class="foot">${I18n.t("common.footer")}</div>
    </main>`;
  }

  /* ------------------------------------------------------ principles view */
  function PrinciplesPanel() {
    useEffect(() => window.scrollTo(0, 0), []);
    return html`<main class="panel">
      <div class="crumb"><a href="#/">${I18n.t("common.breadcrumb")}</a> / ${I18n.t("common.hubBreadcrumb")}</div>
      <div class="stage-head">
        <div class="stage-num">${I18n.t("nav.principlesHub")}</div>
        <h2>${I18n.t("nav.principles")}</h2>
        <${Md} src=${DATA.principlesIntro} />
      </div>
      ${DATA.principles.map(
        (p) => html`<div class="principle-card">
          <h3>${p.title}</h3>
          <div class="p-sub">${p.subtitle}</div>
          <${Md} src=${p.body} />
        </div>`
      )}
      ${DATA.principlesOutro && html`<div class="principles-outro"><${Md} src=${DATA.principlesOutro} /></div>`}
    </main>`;
  }

  /* ----------------------------------------------------------------- app */
  function App() {
    const route = useRoute();
    const [lang, setLang] = useState(I18n.getLanguage());

    useEffect(() => {
      const handler = () => { syncData(); setLang(I18n.getLanguage()); };
      window.addEventListener("languagechange", handler);
      return () => window.removeEventListener("languagechange", handler);
    }, []);
    if (route.view === "home") {
      return html`<div>
        <${Topbar} />
        <div class="home">
          <div class="kicker">${I18n.t("home.kicker")}</div>
          <h2>${I18n.t("meta.title")}</h2>
          <p class="subtitle">${I18n.t("meta.subtitle")}</p>
          <div class="wheel-wrap"><${Wheel} /></div>
          <div class="hint">${I18n.t("stage.clickHint")}</div>
        </div>
      </div>`;
    }

    const stageIdx = DATA.stages.findIndex((s) => s.id === route.stage);
    return html`<div>
      <${Topbar} />
      <div class="detail">
        <${Sidebar} route=${route} />
        ${route.view === "principles"
          ? html`<${PrinciplesPanel} />`
          : stageIdx >= 0
          ? html`<${StagePanel} stage=${DATA.stages[stageIdx]} idx=${stageIdx} facetFocus=${route.facet} />`
          : html`<main class="panel"><p>${I18n.t("common.unknownStage")}</p></main>`}
      </div>
    </div>`;
  }

  render(html`<${App} />`, document.getElementById("app"));
})();
