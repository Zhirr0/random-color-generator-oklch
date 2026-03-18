import { useState } from "react"
import { oklchToString } from "../utils/colorUtils"

const DIRECTIONS = [
  { label: "→", value: "to right" },
  { label: "↘", value: "to bottom right" },
  { label: "↓", value: "to bottom" },
  { label: "↙", value: "to bottom left" },
  { label: "←", value: "to left" },
  { label: "↗", value: "to top right" },
  { label: "↑", value: "to top" },
]

export default function GradientPage({ palette, onCopy }) {
  const [stops, setStops] = useState(palette.length >= 2 ? [palette[0], palette[1]] : palette.slice(0, 2))
  const [direction, setDirection] = useState("to right")

  const stopStrings = stops.map((c) => oklchToString(c))
  const gradientCSS = `linear-gradient(${direction}, ${stopStrings.join(", ")})`

  function addStop(color) {
    if (stops.length >= 5) return
    setStops((prev) => [...prev, color])
  }

  function removeStop(idx) {
    if (stops.length <= 2) return
    setStops((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="page gradient-page">
      <div>
        <span className="section-tag">gradient builder</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-cream)", marginBottom: "0.25rem" }}>
          Build a <em style={{ fontStyle: "italic", fontWeight: 400 }}>gradient</em>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--color-cream-muted)", fontWeight: 300 }}>
          Combine colors from your palette into a CSS gradient.
        </p>
      </div>

      <div className="gradient-preview-area" style={{ background: gradientCSS }} />

      <div>
        <span className="section-tag">direction</span>
        <div className="gradient-direction-picker">
          {DIRECTIONS.map((d) => (
            <button
              key={d.value}
              className={`direction-btn${direction === d.value ? " active" : ""}`}
              onClick={() => setDirection(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="section-tag">color stops ({stops.length}/5)</span>
        <div className="gradient-stops">
          {stops.map((color, i) => (
            <div key={i} className="gradient-stop">
              <div className="gradient-stop-chip" style={{ backgroundColor: oklchToString(color) }} />
              <span className="gradient-stop-code">{oklchToString(color)}</span>
              {stops.length > 2 && (
                <button className="gradient-stop-remove" onClick={() => removeStop(i)}>✕</button>
              )}
            </div>
          ))}
          {stops.length < 5 && (
            <button
              className="btn btn-sm"
              onClick={() => {}}
              style={{ alignSelf: "center" }}
            >
              + Add stop
            </button>
          )}
        </div>

        {stops.length < 5 && (
          <div style={{ marginTop: "1rem" }}>
            <span className="section-tag">add from palette</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {palette.map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: oklchToString(color),
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "transform 0.15s"
                  }}
                  onClick={() => addStop(color)}
                  title={`Add ${oklchToString(color)}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <span className="section-tag">css output — click to copy</span>
        <div className="gradient-code-block" onClick={() => onCopy(`background: ${gradientCSS};`)}>
          background: {gradientCSS};
        </div>
      </div>
    </div>
  )
}
