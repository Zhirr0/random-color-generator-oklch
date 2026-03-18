import ColorSwatch from "./ColorSwatch"

export default function MainPage({ palette, category, onRegenerate, onShowLighter, onShowDarker, onShowSettings, onCopy, onToggleSave, isSaved }) {
  return (
    <div className="page main-page">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <span className="section-tag">generated palette</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-cream)", textTransform: "capitalize" }}>
            {category === "random" ? <em style={{ fontStyle: "italic", fontWeight: 400 }}>Absolute Random</em> : category}
          </h2>
        </div>
        <div className="main-actions">
          <button className="btn btn-primary" onClick={onRegenerate}>
            ↻ Regenerate
          </button>
        </div>
      </div>

      <div className="main-palette-row">
        {palette.map((color, i) => (
          <ColorSwatch
            key={i}
            color={color}
            index={i}
            onShowLighter={onShowLighter}
            onShowDarker={onShowDarker}
            onShowSettings={onShowSettings}
            onCopy={onCopy}
            onToggleSave={onToggleSave}
            isSaved={isSaved}
          />
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--color-cream-muted)", letterSpacing: "0.08em", textAlign: "center", marginTop: "0.5rem" }}>
        click any swatch to reveal options
      </p>
    </div>
  )
}
