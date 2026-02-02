import ColorBox from "./ColorBox";

function MainSection({
  colors,
  onGenerateColors,
  onBackToWelcome,
  onShowLighter,
  onShowDarker,
  onShowSettings,
  onCopy,
}) {
  return (
    <div className="section main-section-wrapper">
      <div className="color-grid main-grid">
        {colors.map((color, index) => (
          <ColorBox
            key={index}
            color={color}
            index={index}
            isMain={true}
            onShowLighter={onShowLighter}
            onShowDarker={onShowDarker}
            onShowSettings={onShowSettings}
            onCopy={onCopy}
          />
        ))}
      </div>
      <button className="generate-btn" onClick={onGenerateColors}>
        Generate Colors
      </button>
      <button className="back-btn" onClick={onBackToWelcome}>
        Back
      </button>
    </div>
  );
}

export default MainSection;
