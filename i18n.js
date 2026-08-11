/* =============================================================================
   AGENTIC SDLC — i18n module
   Self-contained internationalisation. No build step, no npm, no ES modules.
   Supports: en (English, LTR) and fa (Persian/Farsi, RTL).
   ========================================================================== */
(function () {
  "use strict";

  /* ---- translations ---------------------------------------------------- */
  var translations = {
    en: {
      meta: {
        title: "The Agentic SDLC",
        subtitle:
          "How AI agents improve every stage of software delivery \u2014 without giving up engineering discipline",
        org: "Specific-Group Austria",
      },
      topbar: {
        theme: "\u25CB Pro",
        darkTheme: "\u25D0 Dark",
        paperTheme: "\u270E Paper",
      },
      nav: {
        overview: "Overview",
        principles: "Principles",
        principlesHub: "Principles Hub",
      },
      facets: {
        opportunities: "Opportunities",
        risks: "Risks",
        feedforward: "Feed-forward",
        guardrails: "Guardrails",
      },
      stage: {
        stageNum: "Stage",
        of: "of",
        stagePrinciple: "Stage principle",
        clickHint:
          "Click a stage to see more detail \u2014 or the centre for principles",
      },
      home: {
        kicker: "Software Delivery \u00D7 AI Agents",
      },
      common: {
        draft: "draft",
        draftTooltip: "AI-drafted \u2014 not yet human-endorsed",
        breadcrumb: "SDLC",
        hubBreadcrumb: "Hub",
        unknownStage: "Unknown stage.",
        footer:
          "Amber dashed line = AI-drafted, awaiting your endorsement \u00B7 edit data.js to expand",
      },
      hub: {
        whatHolds: "what holds on every stage",
      },
      facetDescriptions: {
        opportunities: "what agents can do here",
        risks: "what goes wrong at machine speed",
        feedforward: "context, skills & MCPs the agent needs",
        guardrails: "deterministic gates & human checkpoints",
      },
    },

    fa: {
      meta: {
        title: "\u0686\u0631\u062E\u0647 \u0639\u0645\u0631 \u062A\u0648\u0633\u0639\u0647 \u0646\u0631\u0645\u200C\u0627\u0641\u0632\u0627\u0631 \u0686\u0627\u0628\u06A9",
        subtitle:
          "\u0686\u06AF\u0648\u0646\u0647 \u0639\u0627\u0645\u0644\u200C\u0647\u0627\u06CC \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u0647\u0631 \u0645\u0631\u062D\u0644\u0647 \u0627\u0632 \u062A\u062D\u0648\u06CC\u0644 \u0646\u0631\u0645\u200C\u0627\u0641\u0632\u0627\u0631 \u0631\u0627 \u0628\u0647\u0628\u0648\u062F \u0645\u06CC\u200C\u0628\u062E\u0634\u0646\u062F \u2014 \u0628\u062F\u0648\u0646 \u0686\u0634\u0645\u200C\u067E\u0648\u0634\u06CC \u0627\u0632 \u0627\u0646\u0636\u0628\u0627\u0637 \u0645\u0647\u0646\u062F\u0633\u06CC",
        org: "Specific-Group Austria",
      },
      topbar: {
        theme: "\u25CB \u0631\u0648\u0634\u0646",
        darkTheme: "\u25D0 \u062A\u0627\u0631\u06CC\u06A9",
        paperTheme: "\u270E \u06A9\u0627\u063A\u0630",
      },
      nav: {
        overview: "\u0646\u0645\u0627\u06CC \u06A9\u0644\u06CC",
        principles: "\u0627\u0635\u0648\u0644",
        principlesHub: "\u0645\u0631\u06A9\u0632 \u0627\u0635\u0648\u0644",
      },
      facets: {
        opportunities: "\u0641\u0631\u0635\u062A\u200C\u0647\u0627",
        risks: "\u062E\u0637\u0631\u0627\u062A",
        feedforward: "\u067E\u06CC\u0634\u200C\u062E\u0648\u0631\u0627\u06A9",
        guardrails: "\u0646\u06AF\u0647\u0628\u0627\u0646\u200C\u0647\u0627",
      },
      stage: {
        stageNum: "\u0645\u0631\u062D\u0644\u0647",
        of: "\u0627\u0632",
        stagePrinciple: "\u0627\u0635\u0644 \u0645\u0631\u062D\u0644\u0647",
        clickHint:
          "\u0631\u0648\u06CC \u06CC\u06A9 \u0645\u0631\u062D\u0644\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F \u062A\u0627 \u062C\u0632\u0626\u06CC\u0627\u062A \u0628\u06CC\u0634\u062A\u0631\u06CC \u0628\u0628\u06CC\u0646\u06CC\u062F \u2014 \u06CC\u0627 \u0631\u0648\u06CC \u0645\u0631\u06A9\u0632 \u0628\u0631\u0627\u06CC \u0627\u0635\u0648\u0644",
      },
      home: {
        kicker:
          "\u062A\u062D\u0648\u06CC\u0644 \u0646\u0631\u0645\u200C\u0627\u0641\u0632\u0627\u0631 \u00D7 \u0639\u0627\u0645\u0644\u200C\u0647\u0627\u06CC \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC",
      },
      common: {
        draft: "\u067E\u06CC\u0634\u200C\u0646\u0648\u06CC\u0633",
        draftTooltip:
          "\u0646\u0633\u062E\u0647 \u067E\u06CC\u0634\u200C\u0646\u0648\u06CC\u0633 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC \u2014 \u0647\u0646\u0648\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0646\u0634\u062F\u0647",
        breadcrumb: "\u0686\u0631\u062E\u0647 \u0639\u0645\u0631",
        hubBreadcrumb: "\u0645\u0631\u06A9\u0632",
        unknownStage: "\u0645\u0631\u062D\u0644\u0647 \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647.",
        footer:
          "\u062E\u0637 \u06A9\u0647\u0631\u0628\u0627\u06CC\u06CC \u0646\u0642\u0637\u0647\u200C\u0686\u06CC\u0646 = \u0646\u0633\u062E\u0647 \u067E\u06CC\u0634\u200C\u0646\u0648\u06CC\u0633 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC\u060C \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F \u0634\u0645\u0627 \u00B7 \u0628\u0631\u0627\u06CC \u06AF\u0633\u062A\u0631\u0634 data.js \u0631\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC\u062F",
      },
      hub: {
        whatHolds: "\u0622\u0646\u0686\u0647 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0645\u0631\u0627\u062D\u0644 \u0628\u0631\u0642\u0631\u0627\u0631 \u0627\u0633\u062A",
      },
      facetDescriptions: {
        opportunities: "\u06A9\u0627\u0631\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0639\u0627\u0645\u0644\u200C\u0647\u0627 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u0646\u062F \u0627\u0646\u062C\u0627\u0645 \u062F\u0647\u0646\u062F",
        risks: "\u0645\u0634\u06A9\u0644\u0627\u062A\u06CC \u06A9\u0647 \u0628\u0627 \u0633\u0631\u0639\u062A \u0645\u0627\u0634\u06CC\u0646 \u0631\u062E \u0645\u06CC\u200C\u062F\u0647\u062F",
        feedforward:
          "\u0632\u0645\u06CC\u0646\u0647\u060C \u0645\u0647\u0627\u0631\u062A\u200C\u0647\u0627 \u0648 MCP\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0639\u0627\u0645\u0644 \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u062F",
        guardrails:
          "\u062F\u0631\u0648\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0642\u0637\u0639\u06CC \u0648 \u0646\u0642\u0627\u0637 \u0628\u0627\u0632\u0631\u0633\u06CC \u0627\u0646\u0633\u0627\u0646\u06CC",
      },
    },
  };

  /* ---- direction map --------------------------------------------------- */
  var RTL_LANGS = { fa: true, ar: true, he: true, ur: true };

  /* ---- state ----------------------------------------------------------- */
  var STORAGE_KEY = "sdlc-lang";
  var DEFAULT_LANG = "en";

  function resolveInitialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) return stored;
    } catch (_) {
      /* localStorage may be unavailable */
    }
    return DEFAULT_LANG;
  }

  /* ---- public API ------------------------------------------------------ */
  var I18n = {
    lang: DEFAULT_LANG,
    dir: "ltr",
    translations: translations,

    /**
     * Switch to a new language. Updates document attributes, persists
     * choice, and dispatches a `languagechange` event on window.
     * @param {string} lang  Language code (e.g. 'en', 'fa')
     */
    setLanguage: function (lang) {
      if (!translations[lang]) {
        console.warn("[i18n] Unknown language:", lang);
        return;
      }
      this.lang = lang;
      this.dir = RTL_LANGS[lang] ? "rtl" : "ltr";

      document.documentElement.dir = this.dir;
      document.documentElement.lang = lang;
      document.title = this.t("meta.title");

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (_) {
        /* storage full or blocked — ignore */
      }

      window.dispatchEvent(new CustomEvent("languagechange"));
    },

    /** @returns {string} current language code */
    getLanguage: function () {
      return this.lang;
    },

    /** @returns {'ltr'|'rtl'} current text direction */
    getDirection: function () {
      return this.dir;
    },

    /**
     * Translate a key using dot-notation.
     *   t('topbar.theme')  →  translations.en.topbar.theme
     * Falls back to the key itself if not found.
     * @param {string} key  Dot-separated path
     * @returns {string}
     */
    t: function (key) {
      var parts = key.split(".");
      var node = translations[this.lang];
      for (var i = 0; i < parts.length; i++) {
        if (node == null || typeof node !== "object") return key;
        node = node[parts[i]];
      }
      return node != null ? node : key;
    },
  };

  /* ---- init (runs immediately on script load) -------------------------- */
  var initialLang = resolveInitialLang();
  I18n.lang = initialLang;
  I18n.dir = RTL_LANGS[initialLang] ? "rtl" : "ltr";
  document.documentElement.dir = I18n.dir;
  document.documentElement.lang = initialLang;

  /* ---- expose ---------------------------------------------------------- */
  window.I18n = I18n;
})();
