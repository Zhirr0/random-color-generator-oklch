import { useState, useEffect } from "react"
import Nav from "./components/Nav"
import WelcomePage from "./components/WelcomePage"
import MainPage from "./components/MainPage"
import LighterPage from "./components/LighterPage"
import DarkerPage from "./components/DarkerPage"
import SettingsPage from "./components/SettingsPage"
import HarmonyPage from "./components/HarmonyPage"
import ContrastPage from "./components/ContrastPage"
import GradientPage from "./components/GradientPage"
import SavedPage from "./components/SavedPage"
import ExportPage from "./components/ExportPage"
import CopyToast from "./components/CopyToast"
import { generateRandomOKLCH } from "./utils/colorUtils"

const ROUTES = {
  welcome: "welcome",
  main: "main",
  lighter: "lighter",
  darker: "darker",
  settings: "settings",
  harmony: "harmony",
  contrast: "contrast",
  gradient: "gradient",
  saved: "saved",
  export: "export",
}

function loadSaved() {
  try {
    const raw = sessionStorage.getItem("chroma-saved")
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistSaved(colors) {
  try {
    sessionStorage.setItem("chroma-saved", JSON.stringify(colors))
  } catch {
    console.error('error in the app component')
  }
}

export default function App() {
  const [route, setRoute] = useState(ROUTES.welcome)
  const [category, setCategory] = useState("random")
  const [palette, setPalette] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [settingsColor, setSettingsColor] = useState({ l: 0.5, c: 0.15, h: 180 })
  const [savedColors, setSavedColors] = useState(loadSaved)
  const [toast, setToast] = useState({ show: false, msg: "" })

  useEffect(() => {
    persistSaved(savedColors)
  }, [savedColors])

  function generatePalette(cat = category) {
    const colors = Array.from({ length: 5 }, () => generateRandomOKLCH(cat))
    setPalette(colors)
  }

  function navigate(to) {
    setRoute(to)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSelectCategory(cat) {
    setCategory(cat)
    generatePalette(cat)
    navigate(ROUTES.main)
  }

  function handleShowLighter(idx) {
    setActiveIndex(idx)
    navigate(ROUTES.lighter)
  }

  function handleShowDarker(idx) {
    setActiveIndex(idx)
    navigate(ROUTES.darker)
  }

  function handleShowSettings(idx) {
    setActiveIndex(idx)
    setSettingsColor({ ...palette[idx] })
    navigate(ROUTES.settings)
  }

  function handleToggleSave(color) {
    setSavedColors((prev) => {
      const key = JSON.stringify(color)
      const exists = prev.some((c) => JSON.stringify(c) === key)
      if (exists) {
        showToast("Removed from saved")
        return prev.filter((c) => JSON.stringify(c) !== key)
      }
      showToast("Saved!")
      return [...prev, color]
    })
  }

  function isSaved(color) {
    const key = JSON.stringify(color)
    return savedColors.some((c) => JSON.stringify(c) === key)
  }

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text)
      showToast("Copied!")
    } catch {
      showToast("Copy failed")
    }
  }

  function showToast(msg) {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: "" }), 2000)
  }

  const inPalette = [ROUTES.main, ROUTES.lighter, ROUTES.darker, ROUTES.settings, ROUTES.harmony, ROUTES.gradient, ROUTES.export].includes(route)

  const navTabs = inPalette
    ? [
        { id: ROUTES.main, label: "Palette" },
        { id: ROUTES.harmony, label: "Harmony" },
        { id: ROUTES.contrast, label: "Contrast" },
        { id: ROUTES.gradient, label: "Gradient" },
        { id: ROUTES.saved, label: `Saved${savedColors.length > 0 ? ` (${savedColors.length})` : ""}` },
        { id: ROUTES.export, label: "Export" },
      ]
    : [
        { id: ROUTES.saved, label: `Saved${savedColors.length > 0 ? ` (${savedColors.length})` : ""}` },
      ]

  function renderPage() {
    switch (route) {
      case ROUTES.welcome:
        return <WelcomePage onSelect={handleSelectCategory} savedCount={savedColors.length} onGoSaved={() => navigate(ROUTES.saved)} />
      case ROUTES.main:
        return (
          <MainPage
            palette={palette}
            category={category}
            onRegenerate={() => generatePalette()}
            onShowLighter={handleShowLighter}
            onShowDarker={handleShowDarker}
            onShowSettings={handleShowSettings}
            onCopy={handleCopy}
            onToggleSave={handleToggleSave}
            isSaved={isSaved}
          />
        )
      case ROUTES.lighter:
        return <LighterPage baseColor={palette[activeIndex]} onCopy={handleCopy} onToggleSave={handleToggleSave} isSaved={isSaved} />
      case ROUTES.darker:
        return <DarkerPage baseColor={palette[activeIndex]} onCopy={handleCopy} onToggleSave={handleToggleSave} isSaved={isSaved} />
      case ROUTES.settings:
        return (
          <SettingsPage
            color={settingsColor}
            onUpdateColor={setSettingsColor}
            onCopy={handleCopy}
            onToggleSave={handleToggleSave}
            isSaved={isSaved}
          />
        )
      case ROUTES.harmony:
        return <HarmonyPage palette={palette} onCopy={handleCopy} onToggleSave={handleToggleSave} isSaved={isSaved} />
      case ROUTES.contrast:
        return <ContrastPage palette={palette} onCopy={handleCopy} />
      case ROUTES.gradient:
        return <GradientPage palette={palette} onCopy={handleCopy} />
      case ROUTES.saved:
        return <SavedPage colors={savedColors} onRemove={handleToggleSave} onCopy={handleCopy} onGoBack={() => navigate(inPalette ? ROUTES.main : ROUTES.welcome)} />
      case ROUTES.export:
        return <ExportPage palette={palette} savedColors={savedColors} onCopy={handleCopy} />
      default:
        return <WelcomePage onSelect={handleSelectCategory} savedCount={savedColors.length} onGoSaved={() => navigate(ROUTES.saved)} />
    }
  }

  return (
    <div className="app-shell">
      <Nav
        tabs={navTabs}
        activeTab={route}
        onTabClick={navigate}
        showBack={route !== ROUTES.welcome}
        onBack={() => {
          if ([ROUTES.lighter, ROUTES.darker, ROUTES.settings].includes(route)) {
            navigate(ROUTES.main)
          } else if (inPalette) {
            navigate(ROUTES.welcome)
          } else {
            navigate(ROUTES.welcome)
          }
        }}
      />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <CopyToast show={toast.show} message={toast.msg} />
    </div>
  )
}
