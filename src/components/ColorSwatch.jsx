import { useState, useRef, useEffect } from "react"
import { oklchToString, getTextColor, getClosestColorName } from "../utils/colorUtils"

export default function ColorSwatch({ color, index, onShowLighter, onShowDarker, onShowSettings, onCopy, onToggleSave, isSaved }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const colorStr = oklchToString(color)
  const textColor = getTextColor(color.l)
  const name = getClosestColorName(color)
  const saved = isSaved(color)

  return (
    <div
      ref={ref}
      className="color-swatch"
      style={{ backgroundColor: colorStr }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="swatch-body">
        <div className="swatch-name" style={{ color: textColor }}>{name}</div>
        <div className="swatch-code" style={{ color: textColor }}>{colorStr}</div>
      </div>

      <div className={`swatch-overlay${open ? " open" : ""}`}>
        <button className="overlay-favorite" onClick={(e) => { e.stopPropagation(); onToggleSave(color) }} style={saved ? { background: "oklch(55% 0.18 25)", borderColor: "transparent" } : {}}>
          {saved ? "♥" : "♡"}
        </button>
        <button className="overlay-action" onClick={(e) => { e.stopPropagation(); setOpen(false); onCopy(colorStr) }}>
          Copy code
        </button>
        <button className="overlay-action" onClick={(e) => { e.stopPropagation(); setOpen(false); onShowLighter(index) }}>
          Lighter shades
        </button>
        <button className="overlay-action" onClick={(e) => { e.stopPropagation(); setOpen(false); onShowDarker(index) }}>
          Darker shades
        </button>
        <button className="overlay-action" onClick={(e) => { e.stopPropagation(); setOpen(false); onShowSettings(index) }}>
          Fine-tune
        </button>
      </div>
    </div>
  )
}
