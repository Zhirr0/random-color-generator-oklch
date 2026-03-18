import { useState } from "react"
import { oklchToString, getTextColor, getClosestColorName, generateHarmony } from "../utils/colorUtils"

const HARMONY_TYPES = [
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
  { id: "analogous", label: "Analogous" },
  { id: "split-complementary", label: "Split-comp" },
  { id: "tetradic", label: "Tetradic" },
]

export default function HarmonyPage({ palette, onCopy, onToggleSave, isSaved }) {
  const [sourceIdx, setSourceIdx] = useState(0)
  const [harmonyType, setHarmonyType] = useState("complementary")

  if (!palette.length) return null

  const baseColor = palette[sourceIdx]
  const harmonyColors = generateHarmony(baseColor, harmonyType)

  return (
    <div className="page harmony-page">
      <div>
        <span className="section-tag">source color</span>
        <div className="harmony-source">
          {palette.map((color, i) => {
            const str = oklchToString(color)
            return (
              <div
                key={i}
                className="harmony-chip"
                style={{
                  backgroundColor: str,
                  outline: i === sourceIdx ? "2px solid var(--color-cream)" : "none",
                  outlineOffset: "3px",
                  cursor: "pointer",
                  transition: "outline 0.2s ease"
                }}
                onClick={() => setSourceIdx(i)}
                title={str}
              />
            )
          })}
          <div style={{ marginLeft: "0.5rem" }}>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--color-cream)", textTransform: "capitalize" }}>
              {getClosestColorName(baseColor)}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-cream-muted)" }}>
              {oklchToString(baseColor)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <span className="section-tag">harmony type</span>
        <div className="harmony-type-tabs">
          {HARMONY_TYPES.map((t) => (
            <button
              key={t.id}
              className={`harmony-tab${harmonyType === t.id ? " active" : ""}`}
              onClick={() => setHarmonyType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="section-tag">{harmonyType} palette</span>
        <div className="harmony-palette">
          {harmonyColors.map((color, i) => {
            const str = oklchToString(color)
            const textColor = getTextColor(color.l)
            const name = getClosestColorName(color)
            const saved = isSaved(color)
            return (
              <div
                key={i}
                className="harmony-swatch"
                style={{ backgroundColor: str }}
                onClick={() => onCopy(str)}
              >
                <div className="harmony-swatch-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div className="swatch-name" style={{ color: textColor }}>{name}</div>
                      <div className="swatch-code" style={{ color: textColor }}>{str}</div>
                    </div>
                    <button
                      className="btn-icon btn"
                      style={{
                        borderColor: textColor === "var(--color-dark)" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)",
                        color: textColor,
                        background: saved ? "rgba(0,0,0,0.2)" : "transparent",
                        flexShrink: 0
                      }}
                      onClick={(e) => { e.stopPropagation(); onToggleSave(color) }}
                    >
                      {saved ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
