import { useState, useEffect } from "react";
import { oklchToString } from "../utils/colorUtils";

function SettingsSection({ color, onUpdateColor, onBackToMain, onCopy }) {
  const [lightness, setLightness] = useState(color.l * 100);
  const [saturation, setSaturation] = useState(color.c);
  const [hue, setHue] = useState(color.h);

  useEffect(() => {
    setLightness(color.l * 100);
    setSaturation(color.c);
    setHue(color.h);
  }, [color]);

  const handleLightnessChange = (value) => {
    const newValue = Math.max(0, Math.min(100, parseFloat(value)));
    setLightness(newValue);
    onUpdateColor({ l: newValue / 100, c: saturation, h: hue });
  };

  const handleSaturationChange = (value) => {
    const newValue = Math.max(0, Math.min(0.4, parseFloat(value)));
    setSaturation(newValue);
    onUpdateColor({ l: lightness / 100, c: newValue, h: hue });
  };

  const handleHueChange = (value) => {
    const newValue = Math.max(0, Math.min(360, parseFloat(value)));
    setHue(newValue);
    onUpdateColor({ l: lightness / 100, c: saturation, h: newValue });
  };

  const currentColor = { l: lightness / 100, c: saturation, h: hue };
  const colorCode = oklchToString(currentColor);

  return (
    <div className="section settings-section-wrapper">
      <div className="section-header">Color Settings</div>
      <div className="settings-container">
        <div
          className="color-preview"
          style={{ backgroundColor: colorCode }}
        ></div>

        <div className="control-group">
          <div className="control-label">
            <span>Lightness</span>
            <div className="control-value-group">
              <span className="control-value">{lightness.toFixed(1)}%</span>
              <input
                type="number"
                className="control-input"
                min="0"
                max="100"
                step="0.1"
                value={lightness.toFixed(1)}
                onChange={(e) => handleLightnessChange(e.target.value)}
              />
            </div>
          </div>
          <input
            type="range"
            className="control-slider"
            min="0"
            max="100"
            step="0.1"
            value={lightness}
            onChange={(e) => handleLightnessChange(e.target.value)}
          />
        </div>

        <div className="control-group">
          <div className="control-label">
            <span>Saturation (Chroma)</span>
            <div className="control-value-group">
              <span className="control-value">{saturation.toFixed(3)}</span>
              <input
                type="number"
                className="control-input"
                min="0"
                max="0.400"
                step="0.001"
                value={saturation.toFixed(3)}
                onChange={(e) => handleSaturationChange(e.target.value)}
              />
            </div>
          </div>
          <input
            type="range"
            className="control-slider"
            min="0"
            max="40"
            step="0.1"
            value={saturation * 100}
            onChange={(e) => handleSaturationChange(e.target.value / 100)}
          />
        </div>

        <div className="control-group">
          <div className="control-label">
            <span>Hue</span>
            <div className="control-value-group">
              <span className="control-value">{hue.toFixed(1)}°</span>
              <input
                type="number"
                className="control-input"
                min="0"
                max="360"
                step="0.1"
                value={hue.toFixed(1)}
                onChange={(e) => handleHueChange(e.target.value)}
              />
            </div>
          </div>
          <input
            type="range"
            className="control-slider"
            min="0"
            max="360"
            step="0.1"
            value={hue}
            onChange={(e) => handleHueChange(e.target.value)}
          />
        </div>

        <div className="color-code-display" onClick={() => onCopy(colorCode)}>
          {colorCode}
        </div>
      </div>
      <button className="back-btn" onClick={onBackToMain}>
        Back
      </button>
    </div>
  );
}

export default SettingsSection;
