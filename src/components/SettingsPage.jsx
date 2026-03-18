import { useState, useEffect } from "react"
import { oklchToString, getTextColor, getClosestColorName } from "../utils/colorUtils"

export default function SettingsPage({ color, onUpdateColor, onCopy, onToggleSave, isSaved }) {
  const [l, setL] = useState(color.l * 100)
  const [c, setC] = useState(color.c)
  const [h, setH] = useState(color.h)

  useEffect(() => {
    setL(color.l * 100)
    setC(color.c)
    setH(color.h)
  }, [color])

  const current = { l: l / 100, c, h }
  const colorStr = oklchToString(current)
  const textColor = getTextColor(current.l)
  const name = getClosestColorName(current)
  const saved = isSaved(current)

  function update(newL, newC, newH) {
    const updated = { l: newL / 100, c: newC, h: newH }
    onUpdateColor(updated)
  }

  function handleL(val) {
    const v = Math.max(0, Math.min(100, parseFloat(val) || 0))
    setL(v)
    update(v, c, h)
  }

  function handleC(val) {
    const v = Math.max(0, Math.min(0.4, parseFloat(val) || 0))
    setC(v)
    update(l, v, h)
  }

  function handleH(val) {
    const v = Math.max(0, Math.min(360, parseFloat(val) || 0))
    setH(v)
    update(l, c, v)
  }

  return (
    <div className="page settings-page">
      <div className="settings-preview-col">
        <div className="big-preview" style={{ backgroundColor: colorStr }} />
        <div className="preview-meta">
          <span className="preview-name">{name}</span>
          <span className="preview-code" onClick={() => onCopy(colorStr)}>{colorStr}</span>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <span className="section-tag">blend mode preview</span>
          <div className="blend-row">
            <div className="blend-chip" style={{ backgroundColor: "#fff" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: colorStr }} />
              <span className="blend-label" style={{ color: "#333" }}>white</span>
            </div>
            <div className="blend-chip" style={{ backgroundColor: "#808080" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: colorStr }} />
              <span className="blend-label" style={{ color: "#fff" }}>gray</span>
            </div>
            <div className="blend-chip" style={{ backgroundColor: "#111" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: colorStr }} />
              <span className="blend-label" style={{ color: "#fff" }}>black</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => onCopy(colorStr)}>Copy</button>
          <button
            className={`btn${saved ? " btn-primary" : ""}`}
            onClick={() => onToggleSave(current)}
          >
            {saved ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>

      <div className="settings-controls-col">
        <span className="section-tag">fine-tune color</span>

        <div className="control-block">
          <div className="control-header">
            <span className="control-label-text">Lightness</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="control-value-display">{l.toFixed(1)}%</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "72px" }}
                min="0"
                max="100"
                step="0.1"
                value={l.toFixed(1)}
                onChange={(e) => handleL(e.target.value)}
              />
            </div>
          </div>
          <input type="range" className="slider" min="0" max="100" step="0.1" value={l} onChange={(e) => handleL(e.target.value)} />
        </div>

        <div className="control-block">
          <div className="control-header">
            <span className="control-label-text">Chroma (Saturation)</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="control-value-display">{c.toFixed(3)}</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "72px" }}
                min="0"
                max="0.4"
                step="0.001"
                value={c.toFixed(3)}
                onChange={(e) => handleC(e.target.value)}
              />
            </div>
          </div>
          <input type="range" className="slider" min="0" max="40" step="0.1" value={c * 100} onChange={(e) => handleC(e.target.value / 100)} />
        </div>

        <div className="control-block">
          <div className="control-header">
            <span className="control-label-text">Hue</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="control-value-display">{h.toFixed(1)}°</span>
              <input
                type="number"
                className="input-field"
                style={{ width: "72px" }}
                min="0"
                max="360"
                step="0.1"
                value={h.toFixed(1)}
                onChange={(e) => handleH(e.target.value)}
              />
            </div>
          </div>
          <input type="range" className="slider" min="0" max="360" step="0.1" value={h} onChange={(e) => handleH(e.target.value)} />
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <span className="section-tag">hue spectrum preview</span>
          <div style={{
            height: "12px",
            borderRadius: "6px",
            background: "linear-gradient(to right, oklch(60% 0.2 0), oklch(60% 0.2 30), oklch(60% 0.2 60), oklch(60% 0.2 90), oklch(60% 0.2 120), oklch(60% 0.2 150), oklch(60% 0.2 180), oklch(60% 0.2 210), oklch(60% 0.2 240), oklch(60% 0.2 270), oklch(60% 0.2 300), oklch(60% 0.2 330), oklch(60% 0.2 360))",
            position: "relative",
            marginTop: "6px"
          }}>
            <div style={{
              position: "absolute",
              top: "50%",
              left: `${(h / 360) * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "2px solid white",
              background: colorStr,
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              transition: "left 0.1s ease"
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
