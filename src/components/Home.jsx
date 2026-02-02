import { useState } from "react";
import WelcomeSection from "./WelcomeSection";
import MainSection from "./MainSection";
import LighterSection from "./LighterSection";
import DarkerSection from "./DarkerSection";
import SettingsSection from "./SettingsSection";
import CopyFeedback from "./CopyFeedback";
import { generateRandomOKLCH } from "../utils/colorUtils";

function Home() {
  const [currentView, setCurrentView] = useState("welcome"); // welcome, main, lighter, darker, settings
  const [currentCategory, setCurrentCategory] = useState("random");
  const [mainColors, setMainColors] = useState([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(-1);
  const [settingsColor, setSettingsColor] = useState({
    l: 0.5,
    c: 0.15,
    h: 180,
  });
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  function handleSelectCategory(category) {
    setCurrentCategory(category);
    setCurrentView("main");
    generateColors(category);
  }

  function generateColors(category = currentCategory) {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      colors.push(generateRandomOKLCH(category));
    }
    setMainColors(colors);
  }

  function handleBackToWelcome() {
    setCurrentView("welcome");
  }

  function handleBackToMain() {
    setCurrentView("main");
  }

  function handleShowLighter(index) {
    setCurrentColorIndex(index);
    setCurrentView("lighter");
  }

  function handleShowDarker(index) {
    setCurrentColorIndex(index);
    setCurrentView("darker");
  }

  function handleShowSettings(index) {
    setCurrentColorIndex(index);
    setSettingsColor({ ...mainColors[index] });
    setCurrentView("settings");
  }

  async function handleCopyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function handleUpdateSettingsColor(newColor) {
    setSettingsColor(newColor);
  }

  return (
    <div className="container">
      {currentView === "welcome" && (
        <WelcomeSection onSelectCategory={handleSelectCategory} />
      )}

      {currentView === "main" && (
        <MainSection
          colors={mainColors}
          onGenerateColors={() => generateColors()}
          onBackToWelcome={handleBackToWelcome}
          onShowLighter={handleShowLighter}
          onShowDarker={handleShowDarker}
          onShowSettings={handleShowSettings}
          onCopy={handleCopyToClipboard}
        />
      )}

      {currentView === "lighter" && (
        <LighterSection
          baseColor={mainColors[currentColorIndex]}
          onBackToMain={handleBackToMain}
          onCopy={handleCopyToClipboard}
        />
      )}

      {currentView === "darker" && (
        <DarkerSection
          baseColor={mainColors[currentColorIndex]}
          onBackToMain={handleBackToMain}
          onCopy={handleCopyToClipboard}
        />
      )}

      {currentView === "settings" && (
        <SettingsSection
          color={settingsColor}
          onUpdateColor={handleUpdateSettingsColor}
          onBackToMain={handleBackToMain}
          onCopy={handleCopyToClipboard}
        />
      )}

      <CopyFeedback show={showCopyFeedback} />
    </div>
  );
}

export default Home;
