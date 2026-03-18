const CATEGORIES = [
  { name: "red", label: "Red", bg: "oklch(42% 0.2 25)", fg: "#fff" },
  { name: "orange", label: "Orange", bg: "oklch(62% 0.22 52)", fg: "#fff" },
  { name: "yellow", label: "Yellow", bg: "oklch(88% 0.18 98)", fg: "oklch(30% 0.05 80)" },
  { name: "brown", label: "Brown", bg: "oklch(40% 0.08 40)", fg: "#fff" },
  { name: "green", label: "Green", bg: "oklch(50% 0.18 140)", fg: "#fff" },
  { name: "cyan", label: "Cyan", bg: "oklch(55% 0.16 200)", fg: "#fff" },
  { name: "blue", label: "Blue", bg: "oklch(46% 0.2 240)", fg: "#fff" },
  { name: "purple", label: "Purple", bg: "oklch(42% 0.22 300)", fg: "#fff" },
  { name: "pink", label: "Pink", bg: "oklch(56% 0.2 330)", fg: "#fff" },
]

export default function WelcomePage({ onSelect, savedCount, onGoSaved }) {
  return (
    <div className="page">
      <div className="welcome-page">
        <div className="welcome-left">
          <div className="welcome-intro">
            <div className="welcome-eyebrow">color exploration tool</div>
            <h1 className="welcome-heading">
              Discover
              <em>beautiful</em>
              colors
            </h1>
            <p className="welcome-desc">
              Generate palettes, explore harmonies, check accessibility, and build gradients — all in OKLCH color space for perceptually uniform results.
            </p>
          </div>
          <div className="welcome-stats">
            <div className="stat-item">
              <span className="stat-value">10</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5</span>
              <span className="stat-label">Harmony types</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4</span>
              <span className="stat-label">Export formats</span>
            </div>
            {savedCount > 0 && (
              <div className="stat-item" style={{ cursor: "pointer" }} onClick={onGoSaved}>
                <span className="stat-value">{savedCount}</span>
                <span className="stat-label">Saved colors</span>
              </div>
            )}
          </div>
        </div>

        <div className="welcome-right">
          <div className="categories-heading">select a color family</div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="cat-btn"
                style={{ background: cat.bg, color: cat.fg }}
                onClick={() => onSelect(cat.name)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button
            className="cat-btn wide"
            onClick={() => onSelect("random")}
          >
            ✦ Absolute Random
          </button>
        </div>
      </div>
    </div>
  )
}
