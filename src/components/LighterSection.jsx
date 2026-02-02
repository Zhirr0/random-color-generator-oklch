import ColorBox from "./ColorBox";
import { generateLighterShades } from "../utils/colorUtils";

function LighterSection({ baseColor, onBackToMain, onCopy }) {
  const lighterShades = generateLighterShades(baseColor);

  return (
    <div className="section lighter-section-wrapper">
      <div className="section-header">Lighter Shades</div>
      <div className="color-grid shader-grid">
        {lighterShades.map((shade, index) => (
          <ColorBox
            key={index}
            color={shade}
            index={index}
            isMain={false}
            onCopy={onCopy}
          />
        ))}
      </div>
      <button className="back-btn" onClick={onBackToMain}>
        Back
      </button>
    </div>
  );
}

export default LighterSection;
