import ColorBox from "./ColorBox";
import { generateDarkerShades } from "../utils/colorUtils";

function DarkerSection({ baseColor, onBackToMain, onCopy }) {
  const darkerShades = generateDarkerShades(baseColor);

  return (
    <div className="section darker-section-wrapper">
      <div className="section-header">Darker Shades</div>
      <div className="color-grid shader-grid">
        {darkerShades.map((shade, index) => (
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

export default DarkerSection;
