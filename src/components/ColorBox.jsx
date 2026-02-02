import { useState, useRef, useEffect } from "react";
import { oklchToString, getTextColor } from "../utils/colorUtils";

function ColorBox({
  color,
  index,
  isMain,
  onShowLighter,
  onShowDarker,
  onShowSettings,
  onCopy,
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBoxClick = (e) => {
    if (isMain) {
      e.stopPropagation();
      setShowOverlay(!showOverlay);
    } else {
      onCopy(oklchToString(color));
    }
  };

  const handleOptionClick = (e, callback) => {
    e.stopPropagation();
    setShowOverlay(false);
    callback();
  };

  const colorString = oklchToString(color);
  const textColor = getTextColor(color.l);

  return (
    <div
      ref={boxRef}
      className="color-box"
      style={{ backgroundColor: colorString }}
      onClick={handleBoxClick}
    >
      <div className="color-info">
        <div className="color-name" style={{ color: textColor }}>
          {colorString}
        </div>
      </div>

      {isMain && (
        <div className={`options-overlay ${showOverlay ? "active" : ""}`}>
          <button
            className="option-btn copy"
            onClick={(e) => handleOptionClick(e, () => onCopy(colorString))}
          >
            Copy
          </button>
          <button
            className="option-btn lighter"
            onClick={(e) => handleOptionClick(e, () => onShowLighter(index))}
          >
            Lighter
          </button>
          <button
            className="option-btn darker"
            onClick={(e) => handleOptionClick(e, () => onShowDarker(index))}
          >
            Darker
          </button>
          <button
            className="option-btn settings"
            onClick={(e) => handleOptionClick(e, () => onShowSettings(index))}
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorBox;
