import { useState } from "react"
import { oklchToString, getClosestColorName, exportPalette, oklchToHex } from "../utils/colorUtils"

const FORMATS = [
  { id: "css", label: "CSS Variables" },
  { id: "tailwind", label: "Tailwind" },
  { id: "scss", label: "SCSS" },
  { id: "json", label: "JSON" },
]

export default function ExportPage({ palette, savedColors, onCopy }) {
  const [format, setFormat] = useState("css")
  const [source, setSource] = useState("palette")

  const colors = source === "palette" ? palette : savedColors
  const code = exportPalette(colors, format)

  function handleDownload() {
    const ext = format === "tailwind" ? "js" : format === "json" ? "json" : format === "scss" ? "scss" : "css"
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chroma-palette.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page export-page">
      <div>
        <span className="section-tag">export panel</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-cream)", marginBottom: "0.25rem" }}>
          Export <em style={{ fontStyle: "italic", fontWeight: 400 }}>palette</em>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--color-cream-muted)", fontWeight: 300 }}>
          Download your palette as CSS variables, Tailwind config, SCSS tokens, or JSON.
        </p>

        <div style={{ display: "flex", gap: "8px", marginTop: "1rem", flexWrap: "wrap" }}>
          <button className={`btn btn-sm${source === "palette" ? " btn-primary" : ""}`} onClick={() => setSource("palette")}>
            Current palette ({palette.length})
          </button>
          {savedColors.length > 0 && (
            <button className={`btn btn-sm${source === "saved" ? " btn-primary" : ""}`} onClick={() => setSource("saved")}>
              Saved colors ({savedColors.length})
            </button>
          )}
        </div>
      </div>

      <div className="export-preview-palette">
        <span className="section-tag">color preview</span>
        {colors.map((color, i) => {
          const str = oklchToString(color)
          const hex = oklchToHex(color)
          const name = getClosestColorName(color)
          return (
            <div key={i} className="export-swatch-row">
              <div className="export-swatch-chip" style={{ backgroundColor: str }} />
              <div className="export-swatch-info">
                <div className="export-swatch-name">{name}</div>
                <div className="export-swatch-hex">{str} · {hex}</div>
              </div>
              <button className="btn btn-sm" style={{ marginRight: "8px", flexShrink: 0 }} onClick={() => onCopy(str)}>
                Copy
              </button>
            </div>
          )
        })}
      </div>

      <div className="export-controls">
        <div>
          <span className="section-tag">format</span>
          <div className="format-tabs">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                className={`format-tab${format === f.id ? " active" : ""}`}
                onClick={() => setFormat(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="section-tag">output — click to copy all</span>
          <pre className="export-code-area" onClick={() => onCopy(code)}>{code}</pre>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => onCopy(code)}>
            Copy all
          </button>
          <button className="btn" onClick={handleDownload}>
            ↓ Download file
          </button>
        </div>
      </div>
    </div>
  )
}
