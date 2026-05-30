import { useEffect, useMemo, useRef, useState } from "react";

function SchoolIcon({ kind, className = "w-7 h-7" }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };
  switch (kind) {
    case "desktop":
      return <svg {...props}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
    case "mobile":
      return <svg {...props}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>;
    case "web":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>;
    case "cli":
      return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 10l3 2-3 2M12 14h5" /></svg>;
    case "extension":
      return <svg {...props}><path d="M9 4h6v3a2 2 0 104 0V10h3v6h-3a2 2 0 100 4v3H4v-3a2 2 0 100-4H4v-6h3a2 2 0 102-4V4z" /></svg>;
    case "bot":
      return <svg {...props}><rect x="4" y="7" width="16" height="11" rx="3" /><path d="M12 7V4M8 12h.01M16 12h.01M9 16h6" /></svg>;
    case "static":
      return <svg {...props}><path d="M5 3h11l4 4v14H5z" /><path d="M16 3v4h4M8 12h8M8 16h8M8 8h3" /></svg>;
    case "api":
      return <svg {...props}><path d="M4 8c4-3 12-3 16 0M4 16c4 3 12 3 16 0" /><circle cx="12" cy="12" r="2" /><path d="M12 4v16" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="6" /></svg>;
  }
}

function Sparkle({ size = 32, className = "", style }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M16 2c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z" />
    </svg>
  );
}

function Star({ size = 28, className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M12 2l2.9 6.5 7.1.7-5.4 4.9 1.6 7L12 17.6 5.8 21.1l1.6-7L2 9.2l7.1-.7L12 2z" />
    </svg>
  );
}

function Moon({ size = 36, className = "", style }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M27 4c-9 0-16 7-16 16s7 16 16 16c4 0 8-1.5 11-4-7 0-13-5-13-13S20 6 27 6z" />
    </svg>
  );
}

function Sun({ size = 22, className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
    </svg>
  );
}

function ToggleMoon({ size = 22, className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z" />
    </svg>
  );
}

const RARITY_ORDER = ["common", "rare", "epic", "legendary"];
const RARITY_LABEL = { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" };

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("pfm-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Ignore storage restrictions.
  }
  return "dark";
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

function Hero({ theme }) {
  return (
    <header className="relative px-6 pb-12 pt-12 text-center md:pb-16 md:pt-16">
      <Sparkle className="sparkle-deco sparkle-gold bob hidden md:block" size={42} style={{ top: "8%", left: "8%", "--rot": "-12deg" }} />
      <Star className="sparkle-deco sparkle-pink bob hidden md:block" size={36} style={{ top: "20%", right: "12%", "--rot": "18deg", animationDelay: "1s" }} />
      <Sparkle className="sparkle-deco sparkle-lime bob hidden md:block" size={28} style={{ top: "45%", left: "5%", "--rot": "20deg", animationDelay: "2s" }} />
      {theme === "light" ? (
        <Sun className="sparkle-deco sparkle-sun bob hidden md:block" size={64} style={{ top: "10%", right: "6%", "--rot": "0deg", animationDelay: "0.5s" }} />
      ) : (
        <Moon className="sparkle-deco sparkle-moon bob hidden md:block" size={56} style={{ top: "12%", right: "6%", "--rot": "-15deg", animationDelay: "0.5s" }} />
      )}
      <Star className="sparkle-deco sparkle-cyan bob hidden md:block" size={26} style={{ top: "60%", right: "8%", "--rot": "-22deg", animationDelay: "1.5s" }} />
      <Sparkle className="sparkle-deco sparkle-plum bob hidden md:block" size={34} style={{ top: "70%", left: "10%", "--rot": "8deg", animationDelay: "0.8s" }} />

      <div className="caption relative z-10 mb-6">A Friendly Grimoire, Vol. I</div>

      <h1 className="wordmark relative z-10" aria-label="Prompts for Mere Mortals">
        <span className="lo block text-[16vw] md:text-[10rem] lg:text-[12rem]">Prompts</span>
        <span className="my-3 block md:my-4">
          <span className="tag-script text-sm md:text-lg">For Mere</span>
        </span>
        <span className="lo2 block text-[16vw] md:text-[10rem] lg:text-[12rem]">Mortals</span>
      </h1>

      <p className="font-body relative z-10 mx-auto mt-10 max-w-2xl text-lg leading-relaxed md:text-xl">
        A pocket-sized collection of <strong className="text-gold">battle-tested prompts</strong> for{" "}
        <strong className="text-pink">Claude</strong>, <strong className="text-mint">Codex</strong>, and friends.
        Pick a school. Copy the scroll. Watch a real app appear.
      </p>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
        <a href="#tome" className="btn-fat">Open the Tome</a>
      </div>
    </header>
  );
}

function FilterBar({ rarity, setRarity, query, setQuery, resultCount }) {
  return (
    <div className="mx-auto mb-10 max-w-6xl px-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-3" aria-label="Filter prompts by rarity">
          <button className={`btn-pill ${rarity === "all" ? "active" : ""}`} type="button" onClick={() => setRarity("all")} aria-pressed={rarity === "all"}>
            All Spells
          </button>
          {RARITY_ORDER.map(r => (
            <button
              key={r}
              className={`btn-pill ${rarity === r ? "active" : ""}`}
              type="button"
              onClick={() => setRarity(r)}
              aria-pressed={rarity === r}
            >
              <span className={`rarity-dot rarity-dot-${r}`} aria-hidden="true" />
              {RARITY_LABEL[r]}
            </button>
          ))}
        </div>

        <label className="search-wrap">
          <span className="sr-only">Search {resultCount} prompts</span>
          <input
            className="search-input w-full md:w-80"
            type="search"
            aria-label="Search prompts"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the tome..."
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

function SpellCard({ spell, onOpen, onCopy, copied, copyFailed, loadingAction }) {
  const titleId = `spell-title-${spell.id}`;
  const isLoading = Boolean(loadingAction);

  return (
    <article
      className={`spell-card rarity-${spell.rarity}`}
    >
      <div className="card-band">
        <div className="glyph-badge">
          <SchoolIcon kind={spell.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 id={titleId} className="font-display card-title text-[1.35rem] leading-[1.05] md:text-[1.55rem]">
            {spell.title}
          </h3>
          <div className="card-school font-body mt-1 text-sm leading-tight">
            {spell.school}
          </div>
        </div>
        <div className="rarity-sticker"><span className="dot" aria-hidden="true" />{RARITY_LABEL[spell.rarity]}</div>
      </div>

      <div className="flex flex-col gap-3.5 p-5 pb-4">
        <p className="font-body card-subtitle leading-snug">{spell.subtitle}</p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2" aria-label={`Difficulty ${spell.difficulty} out of 5`}>
            <span className="stat-label">Diff</span>
            <span className="diff-dots" aria-hidden="true">
              {[0, 1, 2, 3, 4].map(i => (
                <span key={i} className={`d ${i < spell.difficulty ? "on" : ""}`} />
              ))}
            </span>
          </div>
          <div className="timepill"><span aria-hidden="true">Time</span>{spell.castTime}</div>
        </div>

        <p className="font-body card-summary text-[0.97rem] leading-relaxed">{spell.summary}</p>

        <div className="flex flex-wrap gap-1.5" aria-label={`Stack: ${spell.stack.join(", ")}`}>
          {spell.stack.slice(0, 4).map(s => (
            <span key={s} className="chip" aria-hidden="true">{s}</span>
          ))}
          {spell.stack.length > 4 && <span className="chip dark" aria-hidden="true">+{spell.stack.length - 4}</span>}
        </div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          onClick={() => onCopy(spell)}
          className={`btn-fat compact card-copy ${copied ? "lime" : ""}`}
          aria-label={`Copy prompt for ${spell.title}`}
          disabled={isLoading}
        >
          {loadingAction === "copy" ? "Loading" : copyFailed ? "Copy Failed" : copied ? "Copied" : "Copy Prompt"}
        </button>
        <button
          type="button"
          onClick={() => onOpen(spell)}
          className="btn-pill compact card-detail"
          aria-label={`View details for ${spell.title}`}
          disabled={isLoading}
        >
          <span>{loadingAction === "open" ? "Loading" : "Details"}</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

function Modal({ spell, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!spell) return;
    const previousActive = document.activeElement;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
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
    <div className="scrim fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:items-center md:p-10" onClick={onClose}>
      <div
        ref={dialogRef}
        onClick={event => event.stopPropagation()}
        className={`spellbook rarity-${spell.rarity} my-auto w-full max-w-3xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="spell-dialog-title"
      >
        <div className="spellbook-header">
          <button ref={closeRef} onClick={onClose} className="x-btn absolute right-5 top-5" type="button" aria-label="Close">×</button>
          <div className="relative z-10 flex items-center gap-5">
            <div className="glyph-badge modal-glyph">
              <SchoolIcon kind={spell.icon} className="h-9 w-9" />
            </div>
            <div className="min-w-0 flex-1 pr-12">
              <div className="modal-kicker font-body mb-1.5 text-sm">
                {spell.school} · {RARITY_LABEL[spell.rarity]}
              </div>
              <h2 id="spell-dialog-title" className="font-display text-3xl leading-none md:text-4xl">
                {spell.title}
              </h2>
              <p className="font-body modal-subtitle mt-1.5 text-base md:text-lg">
                {spell.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 pt-10 md:px-9">
          <div className="mb-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Difficulty">
              <span className="diff-dots" aria-label={`Difficulty ${spell.difficulty} out of 5`}>
                {[0, 1, 2, 3, 4].map(i => (
                  <span key={i} className={`d ${i < spell.difficulty ? "on" : ""}`} />
                ))}
              </span>
            </StatTile>
            <StatTile label="Cast Time">{spell.castTime}</StatTile>
            <StatTile label="Rarity"><span className={`rarity-dot rarity-dot-${spell.rarity}`} aria-hidden="true" />{RARITY_LABEL[spell.rarity]}</StatTile>
            <StatTile label="School">{spell.school}</StatTile>
          </div>

          <div className="mb-7 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-display section-title mb-3 text-xl"><span className="text-pink" aria-hidden="true">◆</span> Material Reagents</h4>
              <ul className="font-body modal-list space-y-1.5">
                {spell.reagents.map(reagent => (
                  <li key={reagent} className="flex items-start gap-2">
                    <span className="text-tangerine mt-0.5" aria-hidden="true">▸</span>
                    <span>{reagent}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display section-title mb-3 text-xl"><span className="text-mint" aria-hidden="true">✦</span> Effect Upon Casting</h4>
              <p className="font-body modal-body leading-relaxed drop-cap">{spell.effect}</p>
            </div>
          </div>

          <div className="mb-7">
            <h4 className="font-display section-title mb-3 text-xl"><span className="text-plum" aria-hidden="true">✧</span> Schools Invoked</h4>
            <div className="flex flex-wrap gap-2">
              {spell.stack.map(stack => (
                <span key={stack} className="chip">{stack}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-display section-title text-xl"><span className="text-gold" aria-hidden="true">✦</span> The Incantation</h4>
              <button onClick={copy} className={`btn-fat ${copied ? "lime" : ""}`} type="button" aria-describedby="copy-status">
                {copyError ? "Copy failed" : copied ? "Inscribed" : "Copy Scroll"}
              </button>
            </div>
            <p id="copy-status" className="sr-only" aria-live="polite">
              {copyError ? "Copy failed. Select the prompt text and copy it manually." : copied ? "Prompt copied." : ""}
            </p>
            <pre className="incantation-block max-h-[420px] overflow-y-auto p-5 md:p-6">{spell.prompt}</pre>
          </div>

          <div className="chunky-sm cast-note p-5">
            <h4 className="font-display section-title mb-2.5 text-xl"><span className="text-pink" aria-hidden="true">♥</span> How to Cast</h4>
            <ol className="font-body modal-list list-decimal space-y-1.5 pl-5">
              <li>Press <strong>Copy Scroll</strong> above.</li>
              <li>Open Claude, Codex, Cursor, or another coding assistant.</li>
              <li>Paste the incantation. Replace the bracketed <span className="font-mono text-sm">[DESCRIBE...]</span> line with what you actually want.</li>
              <li>Run it, then review the proposed work before approving changes.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, children }) {
  return (
    <div className="stat-tile">
      <div className="caption mb-1.5">{label}</div>
      <div className="font-body stat-value flex items-center gap-1.5 text-base">{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24">
      <div className="banner-stitch" />
      <div className="mx-auto max-w-4xl px-6 py-14 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Sparkle size={28} className="sparkle-gold spin-slow" />
          <span className="font-display footer-title text-3xl">Finis</span>
          <Sparkle size={28} className="sparkle-pink spin-slow" />
        </div>
        <p className="font-body text-base leading-relaxed md:text-lg">
          Compiled with reverence at <strong>promptsformortals.com</strong>.
          <br />Read the scroll, adjust the bracketed request, then review what your assistant changes.
        </p>
        <p className="caption mt-6">Made for people who want useful defaults before clever wording.</p>
      </div>
    </footer>
  );
}

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
  const [loadingAction, setLoadingAction] = useState(null);
  const [catalogStatus, setCatalogStatus] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);
  const promptCache = useRef(new Map());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("pfm-theme", theme);
    } catch {
      // Ignore storage restrictions.
    }
  }, [theme]);

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
    setLoadingAction("open");
    setCopyFailedId(null);
    setCatalogStatus(`Loading ${spell.title} prompt.`);
    try {
      setOpen(await loadPrompt(spell));
      setCatalogStatus("");
    } catch {
      setCopyFailedId(spell.id);
      setCatalogStatus(`Could not load ${spell.title} prompt. Try again.`);
      window.setTimeout(() => {
        setCopyFailedId(null);
        setCatalogStatus("");
      }, 2600);
    } finally {
      setLoadingId(null);
      setLoadingAction(null);
    }
  };

  const handleCopy = async (spell) => {
    setLoadingId(spell.id);
    setLoadingAction("copy");
    try {
      const fullSpell = await loadPrompt(spell);
      const ok = await copyPrompt(fullSpell.prompt);
      setCopiedId(ok ? spell.id : null);
      setCopyFailedId(ok ? null : spell.id);
      setCatalogStatus(ok ? `Copied ${spell.title} prompt.` : `Could not copy ${spell.title} prompt. Open details and copy it manually.`);
      window.setTimeout(() => {
        setCopiedId(null);
        setCopyFailedId(null);
        setCatalogStatus("");
      }, 1800);
    } catch {
      setCopiedId(null);
      setCopyFailedId(spell.id);
      setCatalogStatus(`Could not load ${spell.title} prompt. Try again.`);
      window.setTimeout(() => {
        setCopyFailedId(null);
        setCatalogStatus("");
      }, 2600);
    } finally {
      setLoadingId(null);
      setLoadingAction(null);
    }
  };

  const filtered = useMemo(() => {
    let arr = incantations;
    if (rarity !== "all") arr = arr.filter(spell => spell.rarity === rarity);
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter(spell =>
        spell.title.toLowerCase().includes(q) ||
        spell.subtitle.toLowerCase().includes(q) ||
        spell.summary.toLowerCase().includes(q) ||
        spell.stack.some(tag => tag.toLowerCase().includes(q)) ||
        spell.school.toLowerCase().includes(q)
      );
    }
    return arr.slice().sort((a, b) =>
      RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.difficulty - b.difficulty
    );
  }, [incantations, rarity, query]);

  const toggleTheme = () => setTheme(current => current === "dark" ? "light" : "dark");

  return (
    <div className="cartoon-sky min-h-screen">
      <nav className="site-nav relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <Sparkle size={22} className="sparkle-gold" />
          <span className="font-body site-name text-sm">promptsformortals.com</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="#tome" className="btn-pill">The Tome</a>
          <a href="#council" className="btn-pill hidden sm:inline-flex">Add Prompt</a>
          <a href="#about" className="btn-pill hidden md:inline-flex">About</a>
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-pill theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <ToggleMoon size={18} />}
            <span className="hidden md:inline">{theme === "dark" ? "Day" : "Night"}</span>
          </button>
        </div>
      </nav>

      <Hero theme={theme} />

      <main id="tome" className="relative z-10 pb-20">
        <p className="sr-only" aria-live="polite" aria-atomic="true">{catalogStatus}</p>

        <FilterBar rarity={rarity} setRarity={setRarity} query={query} setQuery={setQuery} resultCount={filtered.length} />

        <div className="mx-auto max-w-6xl px-6">
          <div className="spell-catalog">
            {filtered.map(spell => (
              <SpellCard
                key={spell.id}
                spell={spell}
                onOpen={handleOpen}
                onCopy={handleCopy}
                copied={copiedId === spell.id}
                copyFailed={copyFailedId === spell.id}
                loadingAction={loadingId === spell.id ? loadingAction : null}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state py-20 text-center">
              <Sparkle size={56} className="sparkle-pink mx-auto mb-4" />
              <p className="font-display mb-2 text-3xl">No scrolls found</p>
              <p className="font-body text-lg">The librarian shrugs. Try API, mobile, Tauri, or clear the search.</p>
              {query && <button type="button" className="btn-fat mt-5" onClick={() => setQuery("")}>Clear search</button>}
            </div>
          )}
        </div>

        <section id="council" className="mx-auto mt-14 max-w-6xl px-6">
          <div className="contribution-callout" aria-labelledby="council-title">
            <div className="council-seal" aria-hidden="true">
              <Sparkle size={34} />
              <span>PR</span>
            </div>
            <div className="contribution-copy">
              <p className="council-label">Council of Mages</p>
              <h2 id="council-title" className="font-display text-3xl leading-tight md:text-4xl">Add a Prompt to the Codex</h2>
              <p className="font-body mt-3 max-w-3xl text-lg leading-relaxed">
                If you want to add a prompt to the codex, or think the stack of a spell could be improved, open a PR and add it to the tome.
              </p>
            </div>
            <a
              href="https://github.com/pandemicsyn/prompts-for-mortals/compare"
              className="btn-fat lime contribution-button"
              target="_blank"
              rel="noreferrer"
            >
              Open a Pull Request
            </a>
          </div>
        </section>

        <section id="about" className="mx-auto mt-24 max-w-3xl px-6">
          <div className="parchment-strip">
            <div className="mb-4 flex items-center gap-3">
              <Sparkle size={32} className="sparkle-pink" />
              <h2 className="font-display text-3xl md:text-4xl">On the Nature of This Work</h2>
            </div>
            <p className="font-body drop-cap text-lg leading-relaxed">
              Large language models are useful builders, but vague requests still produce vague software. Each scroll here is opinionated on purpose: it picks libraries, file layout, and conventions so the model does not have to guess. Adapt the defaults when you have a reason, then read the result before you ship it.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <Modal spell={open} onClose={() => setOpen(null)} />
    </div>
  );
}
