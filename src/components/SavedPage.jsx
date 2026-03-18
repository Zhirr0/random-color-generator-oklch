import { oklchToString, getTextColor, getClosestColorName } from "../utils/colorUtils"

export default function SavedPage({ colors, onRemove, onCopy, onGoBack }) {
  if (!colors.length) {
    return (
      <div className="page">
        <span className="section-tag">saved colors</span>
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <div className="empty-title">No saved colors yet</div>
          <div className="empty-desc">
            Click the heart icon on any color swatch while exploring palettes to save it here.
          </div>
          <button className="btn btn-primary" onClick={onGoBack} style={{ marginTop: "0.5rem" }}>
            Start exploring
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page saved-page">
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="section-tag">your collection</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-cream)" }}>
            {colors.length} <em style={{ fontStyle: "italic", fontWeight: 400 }}>saved</em>
          </h2>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--color-cream-muted)", fontWeight: 300 }}>
          Click any swatch to copy its code.
        </p>
      </div>

      <div className="saved-grid">
        {colors.map((color, i) => {
          const str = oklchToString(color)
          const textColor = getTextColor(color.l)
          const name = getClosestColorName(color)
          return (
            <div
              key={i}
              className="saved-swatch"
              style={{ backgroundColor: str }}
              onClick={() => onCopy(str)}
            >
              <div className="saved-swatch-body">
                <div className="swatch-name" style={{ color: textColor, fontSize: "0.75rem" }}>{name}</div>
                <div className="swatch-code" style={{ color: textColor, fontSize: "0.55rem" }}>{str}</div>
              </div>
              <button
                className="saved-swatch-remove"
                onClick={(e) => { e.stopPropagation(); onRemove(color) }}
                title="Remove"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
