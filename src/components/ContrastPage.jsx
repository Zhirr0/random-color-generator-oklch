import { useState } from "react"
import { oklchToString, getContrastRatio, getWCAGLevel, getClosestColorName } from "../utils/colorUtils"

const WHITE = { l: 1, c: 0, h: 0 }
const BLACK = { l: 0, c: 0, h: 0 }

export default function ContrastPage({ palette, onCopy }) {
  const [color1, setColor1] = useState(palette[0] || WHITE)
  const [color2, setColor2] = useState(WHITE)
  const [useCustom2, setUseCustom2] = useState(false)

  const c1str = oklchToString(color1)
  const c2str = oklchToString(color2)
  const ratio = getContrastRatio(color1, color2)
  const wcag = getWCAGLevel(ratio)

  const presets2 = [WHITE, BLACK, { l: 0.5, c: 0, h: 0 }]
  const preset2Labels = ["White", "Black", "Gray"]

  return (
    <div className="page contrast-page">
      <div>
        <span className="section-tag">wcag contrast checker</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-cream)", marginBottom: "0.25rem" }}>
          Accessibility <em style={{ fontStyle: "italic", fontWeight: 400 }}>check</em>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--color-cream-muted)", fontWeight: 300 }}>
          Check if your colors meet WCAG 2.1 accessibility guidelines for text contrast.
        </p>
      </div>

      <div className="contrast-pickers">
        <div className="contrast-picker-card">
          <span className="section-tag">foreground / text color</span>
          <div className="picker-preview" style={{ backgroundColor: c1str }} />
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--color-cream)", marginBottom: "8px", textTransform: "capitalize" }}>
            {getClosestColorName(color1)}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-cream-muted)", marginBottom: "12px" }}>{c1str}</p>
          <span className="section-tag">select from palette</span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {palette.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: oklchToString(color),
                  cursor: "pointer",
                  border: JSON.stringify(color) === JSON.stringify(color1) ? "2px solid var(--color-cream)" : "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.15s"
                }}
                onClick={() => setColor1(color)}
                title={oklchToString(color)}
              />
            ))}
          </div>
        </div>

        <div className="contrast-picker-card">
          <span className="section-tag">background color</span>
          <div className="picker-preview" style={{ backgroundColor: c2str }} />
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--color-cream)", marginBottom: "8px", textTransform: "capitalize" }}>
            {getClosestColorName(color2)}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-cream-muted)", marginBottom: "12px" }}>{c2str}</p>
          <span className="section-tag">quick presets</span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
            {presets2.map((preset, i) => (
              <button
                key={i}
                className={`btn btn-sm${JSON.stringify(color2) === JSON.stringify(preset) ? " btn-primary" : ""}`}
                onClick={() => { setColor2(preset); setUseCustom2(false) }}
              >
                {preset2Labels[i]}
              </button>
            ))}
          </div>
          <span className="section-tag">or from palette</span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {palette.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: oklchToString(color),
                  cursor: "pointer",
                  border: JSON.stringify(color) === JSON.stringify(color2) ? "2px solid var(--color-cream)" : "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.15s"
                }}
                onClick={() => setColor2(color)}
                title={oklchToString(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="contrast-result">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="section-tag">contrast ratio</span>
            <div className="contrast-ratio-display">
              <span className="ratio-number">{ratio.toFixed(2)}</span>
              <span className="ratio-unit">: 1</span>
            </div>
          </div>
          <div>
            <span className="section-tag">wcag 2.1 compliance</span>
            <div className="wcag-badges">
              <div className={`wcag-badge ${wcag.small === "FAIL" ? "fail" : "pass"}`}>
                <span className="wcag-level">Normal text</span>
                <span className="wcag-result">{wcag.small}</span>
              </div>
              <div className={`wcag-badge ${wcag.large === "FAIL" ? "fail" : "pass"}`}>
                <span className="wcag-level">Large text</span>
                <span className="wcag-result">{wcag.large}</span>
              </div>
              <div className={`wcag-badge ${ratio >= 3 ? "pass" : "fail"}`}>
                <span className="wcag-level">UI Elements</span>
                <span className="wcag-result">{ratio >= 3 ? "AA" : "FAIL"}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="section-tag">preview</span>
          <div className="contrast-preview-text" style={{ backgroundColor: c2str }}>
            <div className="preview-text-lg" style={{ color: c1str }}>The quick brown fox jumps over the lazy dog</div>
            <div className="preview-text-sm" style={{ color: c1str }}>
              Small body text at 14px — used for paragraphs, captions, and secondary information across your interface.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn" onClick={() => onCopy(`${c1str} on ${c2str} — ratio ${ratio.toFixed(2)}:1`)}>
            Copy result
          </button>
        </div>
      </div>
    </div>
  )
}
