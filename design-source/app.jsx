/* global React, ReactDOM, INCANTATIONS */
const { useState, useMemo, useEffect, useRef } = React;

// ─── Iconography (simple, geometric — no fancy hand-drawn SVG) ──────────────

function SchoolIcon({ kind, className = "w-7 h-7" }) {
  const stroke = "currentColor";
  const props = { className, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
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

function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
    </svg>
  );
}

// ─── Rarity helpers ────────────────────────────────────────────────────────

const RARITY_ORDER = ["common", "rare", "epic", "legendary"];
const RARITY_LABEL = { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" };

const SCHOOLS = ["Conjuration", "Transmutation", "Evocation", "Enchantment", "Illusion", "Necromancy", "Abjuration"];

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header className="relative pt-16 pb-10 md:pt-24 md:pb-14 text-center px-6">
      <div className="caption-mono mb-5">A Grimoire · Vol. I · 2026</div>

      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
        <span className="gilded">Prompts</span>
        <span className="block text-[0.55em] md:text-[0.5em] tracking-[0.4em] mt-3 mb-3 text-amber-100/60">FOR · MERE</span>
        <span className="gilded">Mortals</span>
      </h1>

      <div className="divider max-w-md mx-auto mt-10">
        <span className="glyph">✦ ✦ ✦</span>
      </div>

      <p className="font-body italic text-amber-50/80 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed">
        A small collection of curated incantations, faithfully transcribed for use with{" "}
        <span className="text-amber-200 not-italic font-semibold">Claude</span>,{" "}
        <span className="text-amber-200 not-italic font-semibold">Codex</span>, and other arcane familiars.
        Pick a school. Copy the scroll. Watch a working thing appear.
      </p>

      <div className="mt-10 flex items-center justify-center gap-3 text-xs caption-mono">
        <span>↓ Choose your school ↓</span>
      </div>
    </header>
  );
}

// ─── Filter bar ────────────────────────────────────────────────────────────

function FilterBar({ rarity, setRarity, query, setQuery }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            className={`filter-pill ${rarity === "all" ? "active" : ""}`}
            onClick={() => setRarity("all")}
          >
            All Spells
          </button>
          {RARITY_ORDER.map(r => (
            <button
              key={r}
              className={`filter-pill rarity-${r} ${rarity === r ? "active" : ""}`}
              onClick={() => setRarity(r)}
              style={rarity === r ? { color: "var(--r)", borderColor: "var(--r)", boxShadow: "inset 0 0 12px color-mix(in oklch, var(--r) 24%, transparent)" } : null}
            >
              {RARITY_LABEL[r]}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search the tome…"
            className="font-body italic text-amber-50 placeholder-amber-100/30 bg-transparent border border-amber-200/20 hover:border-amber-200/40 focus:border-amber-200/70 outline-none px-4 py-2 rounded-sm w-full md:w-72 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-200/40 text-xs">⌕</span>
        </div>
      </div>
    </div>
  );
}

// ─── Spell card ────────────────────────────────────────────────────────────

function SpellCard({ spell, onOpen }) {
  return (
    <button
      onClick={() => onOpen(spell)}
      className={`spell-card rarity-${spell.rarity} text-left p-6 rounded-md flex flex-col w-full`}
    >
      <span className="rune-corner tl" />
      <span className="rune-corner tr" />
      <span className="rune-corner bl" />
      <span className="rune-corner br" />

      {/* Top row: glyph + rarity */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="glyph-disc text-amber-50">
          <SchoolIcon kind={spell.icon} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rarity-pill">{RARITY_LABEL[spell.rarity]}</span>
          <span className="caption-mono">{spell.school}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight text-amber-50 mb-1">
        {spell.title}
      </h3>
      <p className="font-body italic text-amber-100/70 text-sm md:text-base mb-5">
        {spell.subtitle}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-5 mb-5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="caption-mono text-amber-200/70">DIFFICULTY</span>
          <span className="flex gap-1 ml-1">
            {[0,1,2,3,4].map(i => (
              <span key={i} className={`stat-dot ${i < spell.difficulty ? "" : "dim"}`} />
            ))}
          </span>
        </div>
        <div className="caption-mono text-amber-200/70">
          ⌛ {spell.castTime}
        </div>
      </div>

      {/* Summary */}
      <p className="font-body text-amber-50/85 leading-relaxed text-[0.95rem] mb-5 flex-1">
        {spell.summary}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {spell.stack.slice(0, 4).map(s => (
          <span key={s} className="tag-mono">{s}</span>
        ))}
        {spell.stack.length > 4 && (
          <span className="tag-mono">+{spell.stack.length - 4}</span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-amber-200/10">
        <span className="caption-mono">Reveal Incantation</span>
        <span className="text-amber-200 text-lg leading-none">→</span>
      </div>
    </button>
  );
}

// ─── Modal: the unfurled scroll ────────────────────────────────────────────

function Modal({ spell, onClose }) {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!spell) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [spell, onClose]);

  if (!spell) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(spell.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = spell.prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 scrim flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-10" onClick={onClose}>
      <div
        ref={dialogRef}
        onClick={e => e.stopPropagation()}
        className={`relative w-full max-w-3xl my-auto rarity-${spell.rarity}`}
      >
        <div className="scroll-edge-top" />

        <div className="scroll-body px-8 md:px-14 py-10 md:py-12 text-stone-900">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-12 right-8 md:right-12 text-stone-700 hover:text-stone-900 text-2xl leading-none w-8 h-8 grid place-items-center"
            aria-label="Close"
          >×</button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="caption-mono" style={{color: "var(--oxblood)"}}>
              {spell.school} · {RARITY_LABEL[spell.rarity]}
            </div>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-2" style={{color: "var(--oxblood)"}}>
              {spell.title}
            </h2>
            <p className="font-body italic text-stone-700 text-lg">
              {spell.subtitle}
            </p>
            <div className="divider max-w-xs mx-auto mt-6" style={{color: "var(--parchment-shadow)"}}>
              <span className="glyph">✦</span>
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-center">
            <Stat label="Difficulty" value={"●".repeat(spell.difficulty) + "○".repeat(5 - spell.difficulty)} />
            <Stat label="Cast Time" value={spell.castTime} />
            <Stat label="Rarity" value={RARITY_LABEL[spell.rarity]} />
            <Stat label="School" value={spell.school} />
          </div>

          {/* Reagents + effect */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-display text-sm tracking-[0.2em] uppercase text-stone-600 mb-2">Material Reagents</h4>
              <ul className="font-body text-stone-800 space-y-1">
                {spell.reagents.map(r => (
                  <li key={r} className="flex items-start gap-2"><span className="text-amber-700 mt-1">◆</span><span>{r}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm tracking-[0.2em] uppercase text-stone-600 mb-2">Effect Upon Casting</h4>
              <p className="font-body text-stone-800 leading-relaxed drop-cap">
                {spell.effect}
              </p>
            </div>
          </div>

          {/* Stack */}
          <div className="mb-6">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-stone-600 mb-2">Schools Invoked</h4>
            <div className="flex flex-wrap gap-2">
              {spell.stack.map(s => (
                <span key={s} className="font-mono text-xs px-2.5 py-1 rounded-sm" style={{background:"rgba(122,29,29,0.08)", border:"1px solid rgba(122,29,29,0.25)", color:"var(--oxblood)"}}>{s}</span>
              ))}
            </div>
          </div>

          {/* The incantation */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm tracking-[0.2em] uppercase text-stone-600">The Incantation</h4>
              <button onClick={copy} className="btn-gilded">
                {copied ? "✓ Inscribed" : "Copy Scroll"}
              </button>
            </div>
            <pre className="incantation-block p-5 md:p-6 max-h-[420px] overflow-y-auto">{spell.prompt}</pre>
          </div>

          {/* Cast directions */}
          <div className="border-t border-stone-400/30 pt-5">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-stone-600 mb-2">How to Cast</h4>
            <ol className="font-body text-stone-800 space-y-1.5 list-decimal pl-5">
              <li>Press <span className="font-mono text-sm bg-stone-900/10 px-1.5 py-0.5 rounded">Copy Scroll</span> above.</li>
              <li>Open Claude, Codex, Cursor, or another familiar of your choosing.</li>
              <li>Paste the incantation. Replace the bracketed <span className="font-mono text-xs">[DESCRIBE…]</span> line with what you actually want.</li>
              <li>Cast. Read what the familiar produces before approving its work.</li>
            </ol>
          </div>
        </div>

        <div className="scroll-edge-bottom" />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-stone-400/40 rounded-sm py-3 px-2 bg-stone-100/30">
      <div className="caption-mono mb-1" style={{color: "var(--parchment-shadow)"}}>{label}</div>
      <div className="font-display text-stone-900">{value}</div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
      <div className="divider max-w-md mx-auto mb-8">
        <span className="glyph">⚜ FINIS ⚜</span>
      </div>
      <p className="font-body italic text-amber-100/60 text-base leading-relaxed">
        Compiled with reverence at <span className="font-mono not-italic text-amber-200/80">promptsformortals.com</span>.
        <br />
        No warranty is offered, expressed or implied, on the behavior of summoned familiars.
        <br />
        Always read the scroll before you cast it.
      </p>
      <p className="caption-mono mt-8 text-amber-200/40">
        Made for those who'd rather not memorize the whole tome.
      </p>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

function App() {
  const [rarity, setRarity] = useState("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    let arr = INCANTATIONS;
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
    // sort by rarity asc then difficulty
    return arr.slice().sort((a,b) =>
      RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity) || a.difficulty - b.difficulty
    );
  }, [rarity, query]);

  return (
    <div className="night-sky min-h-screen">
      {/* Top banner edge */}
      <div className="banner-edge" />

      {/* Tiny nav row */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 caption-mono">
          <span className="text-amber-200">✦</span>
          <span>promptsformortals.com</span>
        </div>
        <div className="flex items-center gap-4 caption-mono">
          <a href="#tome" className="hover:text-amber-200 transition-colors">The Tome</a>
          <a href="#about" className="hover:text-amber-200 transition-colors">About</a>
          <a href="https://github.com" className="hover:text-amber-200 transition-colors">Contribute</a>
        </div>
      </nav>

      <Hero />

      <main id="tome" className="pb-20">
        <FilterBar rarity={rarity} setRarity={setRarity} query={query} setQuery={setQuery} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <SpellCard key={s.id} spell={s} onOpen={setOpen} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-amber-100/60 mb-2">No scrolls found</p>
              <p className="font-body italic text-amber-100/40">The librarian shrugs. Try different terms.</p>
            </div>
          )}
        </div>

        {/* About strip */}
        <section id="about" className="max-w-3xl mx-auto px-6 mt-24">
          <div className="divider mb-8"><span className="glyph">ON THE NATURE OF THIS WORK</span></div>
          <p className="font-body text-amber-50/85 text-lg leading-relaxed drop-cap">
            Large language models are remarkable conjurers, but a poorly-phrased request will produce a poorly-built application. Each scroll in this tome is opinionated on purpose — it picks the libraries, the file layout, and the conventions, so the model does not have to guess. You may adapt them, but the defaults are battle-tested and ought to be respected unless you have reason to do otherwise. Cast freely.
          </p>
        </section>
      </main>

      <Footer />

      <Modal spell={open} onClose={() => setOpen(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
