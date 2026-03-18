import { oklchToString, getTextColor, generateDarkerShades } from "../utils/colorUtils"

export default function DarkerPage({ baseColor, onCopy, onToggleSave, isSaved }) {
  if (!baseColor) return null
  const shades = generateDarkerShades(baseColor)
  const baseStr = oklchToString(baseColor)

  return (
    <div className="page shade-page">
      <div className="shade-info">
        <div className="shade-preview-chip" style={{ backgroundColor: baseStr }} />
        <div>
          <span className="section-tag">darker shades</span>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-cream-muted)" }}>{baseStr}</p>
        </div>
      </div>

      <div className="shade-grid">
        {shades.map((shade, i) => {
          const str = oklchToString(shade)
          const textColor = getTextColor(shade.l)
          const saved = isSaved(shade)
          return (
            <div
              key={i}
              className="shade-swatch"
              style={{ backgroundColor: str }}
              onClick={() => onCopy(str)}
              title={str}
            >
              <div className="shade-swatch-code" style={{ color: textColor }}>{str}</div>
              {saved && (
                <div style={{ position: "absolute", top: 4, right: 4, fontSize: "0.6rem", color: textColor, opacity: 0.7 }}>♥</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
