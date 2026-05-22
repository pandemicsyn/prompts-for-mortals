import { useEffect, useMemo, useRef, useState } from "react";

// ─── Iconography (simple, geometric — no fancy hand-drawn SVG) ──────────────

function SchoolIcon({ kind, className = "w-7 h-7" }) {
  const stroke = "currentColor";
  const props = { className, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
  switch (kind) {
    case "desktop":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...props}>
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M11 18.5h2" />
        </svg>
      );
    case "web":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
      );
    case "cli":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M7 10l3 2-3 2M12 14h5" />
        </svg>
      );
    case "extension":
      return (
        <svg {...props}>
          <path d="M9 4h6v3a2 2 0 104 0V10h3v6h-3a2 2 0 100 4v3H4v-3a2 2 0 100-4H4v-6h3a2 2 0 102-4V4z" />
        </svg>
      );
    case "bot":
      return (
        <svg {...props}>
          <rect x="4" y="7" width="16" height="11" rx="3" />
          <path d="M12 7V4M8 12h.01M16 12h.01M9 16h6" />
        </svg>
      );
    case "static":
      return (
        <svg {...props}>
          <path d="M5 3h11l4 4v14H5z" />
          <path d="M16 3v4h4M8 12h8M8 16h8M8 8h3" />
        </svg>
      );
    case "api":
      return (
        <svg {...props}>
          <path d="M4 8c4-3 12-3 16 0M4 16c4 3 12 3 16 0" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 4v16" />
        </svg>
      );
    default:
      return <svg {...props}><circle cx="12" cy="12" r="6" /></svg>;
  }
}

// ─── Rarity helpers ────────────────────────────────────────────────────────

const RARITY_ORDER = ["common", "rare", "epic", "legendary"];
const RARITY_LABEL = { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" };

function getCardLayout(spell) {
  if (spell.id === "static" || spell.id === "web") return "feature";
  if (spell.rarity === "legendary") return "folio";
  if (spell.rarity === "epic") return "chapter";
  return "leaf";
}

async function copyPrompt(prompt) {
  try {
    await navigator.clipboard.writeText(prompt);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      const copyCommand = document["exec" + "Command"];
      const copied = copyCommand.call(document, "copy");
      document.body.removeChild(ta);
      return copied;
    } catch {
      return false;
    }
  }
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header className="relative pt-16 pb-10 md:pt-24 md:pb-14 text-center px-6">
      <div className="caption-mono mb-5">A Grimoire · Vol. I · 2026</div>

      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]" aria-label="Prompts for Mere Mortals">
        <span className="gilded">Prompts</span>
        <span className="block text-[0.55em] md:text-[0.5em] mt-3 mb-3 text-amber-100/60">FOR · MERE</span>
        <span className="gilded">Mortals</span>
      </h1>

      <div className="divider max-w-md mx-auto mt-10">
        <span className="glyph">✦ ✦ ✦</span>
      </div>

      <p className="font-body italic text-amber-50/80 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed">
        A small collection of curated prompts, faithfully transcribed for use with{" "}
        <span className="text-amber-200 not-italic font-semibold">Claude</span>,{" "}
        <span className="text-amber-200 not-italic font-semibold">Codex</span>, and other arcane familiars.
        Pick a school, copy the prompt, and start with stronger defaults.
      </p>

      <div className="mt-10 flex items-center justify-center gap-3 text-xs caption-mono">
        <span>Browse the prompt library</span>
      </div>
    </header>
  );
}

// ─── Filter bar ────────────────────────────────────────────────────────────

function FilterBar({ rarity, setRarity, query, setQuery, resultCount }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-10">
      <div className="catalog-toolbar flex flex-col md:flex-row md:items-end gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            className={`filter-pill ${rarity === "all" ? "active" : ""}`}
            onClick={() => setRarity("all")}
            aria-pressed={rarity === "all"}
          >
            All Spells
          </button>
          {RARITY_ORDER.map(r => (
            <button
              key={r}
              className={`filter-pill rarity-${r} ${rarity === r ? "active" : ""}`}
              onClick={() => setRarity(r)}
              aria-pressed={rarity === r}
            >
              {RARITY_LABEL[r]}
            </button>
          ))}
        </div>

        <label className="search-field">
          <span className="caption-mono">Search {resultCount} prompts</span>
          <input
            type="search"
            aria-label="Search prompts"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Try mobile, API, Tauri..."
            className="font-body text-amber-50 placeholder-amber-100/35 bg-transparent border border-amber-200/20 hover:border-amber-200/40 focus:border-amber-200/70 outline-none px-4 py-3 rounded-sm w-full md:w-80 transition-colors"
          />
          {query && (
            <button className="search-clear" type="button" onClick={() => setQuery("")} aria-label="Clear search">
              Clear
            </button>
          )}
        </label>
      </div>
    </div>
  );
}

// ─── Spell card ────────────────────────────────────────────────────────────

function SpellCard({ spell, onOpen, onCopy, copied, copyFailed, loading }) {
  const isStarter = spell.id === "static";
  const layout = getCardLayout(spell);
  const stackLabel = `Stack: ${spell.stack.join(", ")}`;

  return (
    <article
      className={`spell-card spell-card-${layout} rarity-${spell.rarity} ${isStarter ? "starter-card" : ""} p-6 rounded-md flex flex-col w-full`}
      aria-labelledby={`spell-title-${spell.id}`}
      aria-describedby={`spell-summary-${spell.id}`}
    >
      {/* Top row: glyph + optional starter label */}
      <div className="card-mark-row flex items-start justify-between gap-3 mb-4">
        <div className="glyph-disc text-amber-50">
          <SchoolIcon kind={spell.icon} />
        </div>
        {isStarter && <span className="starter-label">Best first cast</span>}
      </div>

      {/* Title */}
      <h3 id={`spell-title-${spell.id}`} className="font-display text-2xl md:text-[1.7rem] leading-tight text-amber-50 mb-1">
        {spell.title}
      </h3>
      <p className="font-body italic text-amber-100/70 text-sm md:text-base mb-5">
        {spell.subtitle}
      </p>

      {/* Summary */}
      <p id={`spell-summary-${spell.id}`} className="card-summary font-body text-amber-50/85 leading-relaxed text-[0.95rem] mb-5 flex-1">
        {spell.summary}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-5" aria-label={stackLabel}>
        <span className="sr-only">{stackLabel}</span>
        {spell.stack.slice(0, 3).map(s => (
          <span key={s} className="tag-mono" aria-hidden="true">{s}</span>
        ))}
        {spell.stack.length > 3 && (
          <span className="tag-mono" aria-hidden="true">+{spell.stack.length - 3}</span>
        )}
      </div>

      {/* CTA */}
      <div className="card-actions flex items-center justify-between gap-3 pt-4 border-t border-amber-200/10">
        <button type="button" className="btn-gilded compact" onClick={() => onCopy(spell)} aria-label={`Copy prompt for ${spell.title}`} disabled={loading}>
          {loading ? "Loading" : copyFailed ? "Copy failed" : copied ? "Copied" : "Copy prompt"}
        </button>
        <button type="button" className="btn-ghost compact" onClick={() => onOpen(spell)} aria-label={`View details for ${spell.title}`} disabled={loading}>
          {loading ? "Loading" : "Details"}
        </button>
      </div>
    </article>
  );
}

// ─── Modal: the unfurled scroll ────────────────────────────────────────────

function Modal({ spell, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!spell) return;
    const previousActive = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      previousActive?.focus?.();
    };
  }, [spell, onClose]);

  if (!spell) return null;

  const copy = async () => {
    const ok = await copyPrompt(spell.prompt);
    setCopied(ok);
    setCopyError(!ok);
    setTimeout(() => {
      setCopied(false);
      setCopyError(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 scrim flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-10" onClick={onClose}>
      <div
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        className={`relative w-full max-w-3xl my-auto rarity-${spell.rarity}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="spell-dialog-title"
      >
        <div className="scroll-edge-top" />

        <div className="scroll-body px-8 md:px-14 py-10 md:py-12 text-stone-900">
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-10 right-6 md:right-10 text-stone-700 hover:text-stone-900 text-2xl leading-none w-11 h-11 grid place-items-center"
            aria-label="Close"
          >×</button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="caption-mono modal-kicker">
              {spell.school} · {RARITY_LABEL[spell.rarity]}
            </div>
            <h2 id="spell-dialog-title" className="font-display text-4xl md:text-5xl mt-3 mb-2 modal-title">
              {spell.title}
            </h2>
            <p className="font-body italic text-stone-700 text-lg">
              {spell.subtitle}
            </p>
            <div className="divider max-w-xs mx-auto mt-6 modal-divider">
              <span className="glyph">✦</span>
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-center">
            <Stat
              label="Difficulty"
              value={"●".repeat(spell.difficulty) + "○".repeat(5 - spell.difficulty)}
              ariaValue={`Difficulty ${spell.difficulty} out of 5`}
            />
            <Stat label="Cast Time" value={spell.castTime} />
            <Stat label="Rarity" value={RARITY_LABEL[spell.rarity]} />
            <Stat label="School" value={spell.school} />
          </div>

          {/* Reagents + effect */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-display text-sm uppercase text-stone-600 mb-2">Material Reagents</h4>
              <ul className="font-body text-stone-800 space-y-1">
                {spell.reagents.map(r => (
                  <li key={r} className="flex items-start gap-2"><span className="modal-bullet mt-1">◆</span><span>{r}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase text-stone-600 mb-2">Effect Upon Casting</h4>
              <p className="font-body text-stone-800 leading-relaxed drop-cap">
                {spell.effect}
              </p>
            </div>
          </div>

          {/* Stack */}
          <div className="mb-6">
            <h4 className="font-display text-sm uppercase text-stone-600 mb-2">Schools Invoked</h4>
            <div className="flex flex-wrap gap-2">
              {spell.stack.map(s => (
                <span key={s} className="modal-tag font-mono text-xs px-2.5 py-1 rounded-sm">{s}</span>
              ))}
            </div>
          </div>

          {/* The incantation */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm uppercase text-stone-600">Prompt text</h4>
              <button onClick={copy} className="btn-gilded" aria-describedby="copy-status">
                {copyError ? "Copy failed" : copied ? "Copied" : "Copy prompt"}
              </button>
            </div>
            <p id="copy-status" className="sr-only" aria-live="polite">
              {copyError ? "Copy failed. Select the prompt text and copy it manually." : copied ? "Prompt copied." : ""}
            </p>
            <pre className="incantation-block p-5 md:p-6 max-h-[420px] overflow-y-auto">{spell.prompt}</pre>
          </div>

          {/* Cast directions */}
          <div className="border-t border-stone-400/30 pt-5">
            <h4 className="font-display text-sm uppercase text-stone-600 mb-2">How to Cast</h4>
            <ol className="font-body text-stone-800 space-y-1.5 list-decimal pl-5">
              <li>Press <span className="font-mono text-sm bg-stone-900/10 px-1.5 py-0.5 rounded">Copy prompt</span> above.</li>
              <li>Open Claude, Codex, Cursor, or another coding assistant.</li>
              <li>Paste the prompt. Replace the bracketed <span className="font-mono text-xs">[DESCRIBE…]</span> line with what you actually want.</li>
              <li>Run it, then review the proposed work before approving changes.</li>
            </ol>
          </div>
        </div>

        <div className="scroll-edge-bottom" />
      </div>
    </div>
  );
}

function Stat({ label, value, ariaValue }) {
  return (
    <div className="modal-stat">
      <div className="caption-mono mb-1 modal-stat-label">{label}</div>
      <div className="font-display text-stone-900" aria-label={ariaValue || `${label}: ${value}`}>
        <span aria-hidden={ariaValue ? "true" : undefined}>{value}</span>
      </div>
    </div>
  );
}

function CatalogIntro({ totalCount, onOpenStarter, onCopyStarter, copiedStarter, loadingStarter }) {
  return (
    <section className="catalog-intro max-w-6xl mx-auto px-6 mb-8">
      <div>
        <p className="caption-mono mb-2">Curated defaults, not prompt trivia</p>
        <h2 className="font-display text-3xl md:text-4xl text-amber-50 mb-3">Start with the thing you want to build.</h2>
        <p className="font-body text-amber-50/75 text-lg leading-relaxed">
          The collection is organized by outcome. If you are new here, start with the Astro site prompt, then branch into apps, APIs, bots, and extensions.
        </p>
        <p className="catalog-guidance font-body text-amber-100/70 leading-relaxed">
          Replace the bracketed request, run the prompt, then review the diff before you ship.
        </p>
      </div>
      <div className="starter-panel rarity-common">
        <span className="caption-mono">Recommended first prompt</span>
        <strong>The Eternal Page</strong>
        <p>Static site or blog with Astro, MDX, content collections, and deployment defaults.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-gilded compact" onClick={onCopyStarter} aria-label="Copy prompt for The Eternal Page" disabled={loadingStarter}>
            {loadingStarter ? "Loading" : copiedStarter ? "Copied" : "Copy prompt"}
          </button>
          <button type="button" className="btn-ghost compact" onClick={onOpenStarter} aria-label="View details for The Eternal Page" disabled={loadingStarter}>
            {loadingStarter ? "Loading" : "View details"}
          </button>
        </div>
      </div>
      <p className="catalog-count caption-mono">{totalCount} prompts in the library</p>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer({ onReturn }) {
  return (
    <footer className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
      <div className="divider max-w-md mx-auto mb-8">
        <span className="glyph">⚜ FINIS ⚜</span>
      </div>
      <p className="font-body italic text-amber-100/60 text-base leading-relaxed">
        Compiled with reverence at <span className="font-mono not-italic text-amber-200/80">promptsformortals.com</span>.
        <br />
        Read the prompt, adjust the bracketed request, then review what your assistant changes.
      </p>
      <p className="caption-mono mt-8 text-amber-200/40">
        Made for people who want useful defaults before clever wording.
      </p>
      <button type="button" className="footer-return btn-ghost mt-8" onClick={onReturn}>
        Return to catalog
      </button>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

/**
 * @param {{ incantations?: Array<Record<string, any>> }} props
 */
export default function PromptGrimoire({ incantations = [] }) {
  const [rarity, setRarity] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [copyFailedId, setCopyFailedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [catalogStatus, setCatalogStatus] = useState("");
  const promptCache = useRef(new Map());

  const starter = useMemo(() => incantations.find(s => s.id === "static"), [incantations]);

  const loadPrompt = async (spell) => {
    if (spell.prompt) return spell;
    if (promptCache.current.has(spell.id)) {
      return { ...spell, prompt: promptCache.current.get(spell.id) };
    }

    const response = await fetch(spell.promptUrl);
    if (!response.ok) throw new Error(`Unable to load prompt for ${spell.id}`);
    const data = await response.json();
    promptCache.current.set(spell.id, data.prompt);
    return { ...spell, prompt: data.prompt };
  };

  const handleOpen = async (spell) => {
    setLoadingId(spell.id);
    setCopyFailedId(null);
    try {
      setOpen(await loadPrompt(spell));
    } catch {
      setCopyFailedId(spell.id);
    } finally {
      setLoadingId(null);
    }
  };

  const handleCopy = async (spell) => {
    setLoadingId(spell.id);
    try {
      const fullSpell = await loadPrompt(spell);
      const ok = await copyPrompt(fullSpell.prompt);
      setCopiedId(ok ? spell.id : null);
      setCopyFailedId(ok ? null : spell.id);
      setCatalogStatus(ok ? `Copied ${spell.title} prompt.` : `Could not copy ${spell.title} prompt. Open details and copy it manually.`);
      setTimeout(() => {
        setCopiedId(null);
        setCopyFailedId(null);
        setCatalogStatus("");
      }, 1800);
    } catch {
      setCopiedId(null);
      setCopyFailedId(spell.id);
      setCatalogStatus(`Could not load ${spell.title} prompt. Try again.`);
      setTimeout(() => {
        setCopyFailedId(null);
        setCatalogStatus("");
      }, 2600);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = useMemo(() => {
    let arr = incantations;
    if (rarity !== "all") arr = arr.filter(s => s.rarity === rarity);
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.stack.some(t => t.toLowerCase().includes(q)) ||
        s.school.toLowerCase().includes(q)
      );
    }
    if (rarity === "all" && !q) arr = arr.filter(s => s.id !== "static");
    // sort by rarity asc then difficulty
    return arr.slice().sort((a,b) =>
      RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.difficulty - b.difficulty
    );
  }, [incantations, rarity, query]);

  return (
    <div className="night-sky min-h-screen">
      {/* Top banner edge */}
      <div className="banner-edge" />

      {/* Tiny nav row */}
      <nav className="site-nav max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 caption-mono">
          <span className="text-amber-200">✦</span>
          <span>promptsformortals.com</span>
        </div>
        <div className="flex items-center gap-4 caption-mono">
          <a href="#tome" className="hover:text-amber-200 transition-colors">The Tome</a>
          <a href="#about" className="hover:text-amber-200 transition-colors">About</a>
        </div>
      </nav>

      <Hero />

      <main id="tome" className="pb-20">
        <p className="sr-only" aria-live="polite" aria-atomic="true">{catalogStatus}</p>

        {starter && (
          <CatalogIntro
            totalCount={incantations.length}
            onOpenStarter={() => handleOpen(starter)}
            onCopyStarter={() => handleCopy(starter)}
            copiedStarter={copiedId === starter.id}
            loadingStarter={loadingId === starter.id}
          />
        )}

        <FilterBar rarity={rarity} setRarity={setRarity} query={query} setQuery={setQuery} resultCount={filtered.length} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="spell-catalog">
            {filtered.map(s => (
              <SpellCard
                key={s.id}
                spell={s}
                onOpen={handleOpen}
                onCopy={handleCopy}
                copied={copiedId === s.id}
                copyFailed={copyFailedId === s.id}
                loading={loadingId === s.id}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-amber-100/60 mb-2">No prompts found</p>
              <p className="font-body italic text-amber-100/40">Try a stack, platform, or use case like API, mobile, or Tauri.</p>
            </div>
          )}
        </div>

        {/* About strip */}
        <section id="about" className="max-w-3xl mx-auto px-6 mt-24">
          <div className="divider mb-8"><span className="glyph">ON THE NATURE OF THIS WORK</span></div>
          <p className="font-body text-amber-50/85 text-lg leading-relaxed drop-cap">
            Large language models are useful builders, but vague requests still produce vague software. Each prompt here is opinionated on purpose: it picks libraries, file layout, and conventions so the model does not have to guess. Adapt the defaults when you have a reason, then read the result before you ship it.
          </p>
        </section>
      </main>

      <Footer
        onReturn={() => {
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document.getElementById("tome")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }}
      />

      <Modal spell={open} onClose={() => setOpen(null)} />
    </div>
  );
}
