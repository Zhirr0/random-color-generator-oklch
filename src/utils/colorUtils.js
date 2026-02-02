// Color hue ranges (simple categories)
const colorRanges = {
  red: { hueMin: 20, hueMax: 40, lightnessMax: 0.5 }, // Using old brown settings (better reds)
  brown: { hueMin: 20, hueMax: 60, chromaMin: 0.02, chromaMax: 0.12, lightnessMin: 0.25, lightnessMax: 0.55 }, // True browns: orange to yellow with low chroma
  cyan: { hueMin: 150, hueMax: 210 },
  blue: { hueMin: 210, hueMax: 270 },
  purple: { hueMin: 270, hueMax: 315 },
  pink: { hueMin: 315, hueMax: 345 },
}

// Green subcategories
const greenVariants = [
  { name: 'chartreuse', hueMin: 80, hueMax: 110, chromaMin: 0.08, chromaMax: 0.30, lightnessMin: 0.45, lightnessMax: 0.80 },
  { name: 'true-green', hueMin: 110, hueMax: 130, chromaMin: 0.06, chromaMax: 0.30, lightnessMin: 0.25, lightnessMax: 0.70 },
  { name: 'teal', hueMin: 130, hueMax: 170, chromaMin: 0.04, chromaMax: 0.30, lightnessMin: 0.20, lightnessMax: 0.75 },
  { name: 'olive', hueMin: 70, hueMax: 105, chromaMin: 0.02, chromaMax: 0.12, lightnessMin: 0.18, lightnessMax: 0.45 },
  { name: 'forest', hueMin: 100, hueMax: 140, chromaMin: 0.06, chromaMax: 0.18, lightnessMin: 0.12, lightnessMax: 0.35 },
  { name: 'mint', hueMin: 100, hueMax: 140, chromaMin: 0.02, chromaMax: 0.10, lightnessMin: 0.65, lightnessMax: 0.92 },
  { name: 'neon-lime', hueMin: 80, hueMax: 100, chromaMin: 0.25, chromaMax: 0.45, lightnessMin: 0.60, lightnessMax: 0.90 },
]

// Orange subcategories (using old yellow ranges - they make better oranges)
const orangeVariants = [
  { name: 'pale-orange', hueMin: 50, hueMax: 70, chromaMin: 0.02, chromaMax: 0.10, lightnessMin: 0.80, lightnessMax: 0.95 },
  { name: 'true-orange', hueMin: 52, hueMax: 68, chromaMin: 0.12, chromaMax: 0.30, lightnessMin: 0.55, lightnessMax: 0.85 },
  { name: 'bright-orange', hueMin: 54, hueMax: 66, chromaMin: 0.20, chromaMax: 0.40, lightnessMin: 0.60, lightnessMax: 0.90 },
  { name: 'golden-orange', hueMin: 45, hueMax: 60, chromaMin: 0.10, chromaMax: 0.28, lightnessMin: 0.40, lightnessMax: 0.75 },
  { name: 'dark-orange', hueMin: 45, hueMax: 60, chromaMin: 0.03, chromaMax: 0.12, lightnessMin: 0.25, lightnessMax: 0.55 },
  { name: 'neon-orange', hueMin: 52, hueMax: 64, chromaMin: 0.30, chromaMax: 0.55, lightnessMin: 0.70, lightnessMax: 0.95 },
]

// Yellow subcategories (new proper yellow ranges)
const yellowVariants = [
  { name: 'pale-yellow', hueMin: 85, hueMax: 100, chromaMin: 0.05, chromaMax: 0.15, lightnessMin: 0.85, lightnessMax: 0.95 },
  { name: 'true-yellow', hueMin: 90, hueMax: 110, chromaMin: 0.15, chromaMax: 0.30, lightnessMin: 0.70, lightnessMax: 0.90 },
  { name: 'bright-yellow', hueMin: 92, hueMax: 108, chromaMin: 0.25, chromaMax: 0.40, lightnessMin: 0.75, lightnessMax: 0.92 },
  { name: 'golden-yellow', hueMin: 85, hueMax: 95, chromaMin: 0.12, chromaMax: 0.25, lightnessMin: 0.60, lightnessMax: 0.80 },
  { name: 'dark-yellow', hueMin: 88, hueMax: 105, chromaMin: 0.10, chromaMax: 0.20, lightnessMin: 0.45, lightnessMax: 0.65 },
  { name: 'neon-yellow', hueMin: 95, hueMax: 110, chromaMin: 0.30, chromaMax: 0.50, lightnessMin: 0.80, lightnessMax: 0.95 },
]

// Helper function to generate from variant ranges
function generateFromVariant(variant) {
  const h = Math.random() * (variant.hueMax - variant.hueMin) + variant.hueMin
  const c = Math.random() * (variant.chromaMax - variant.chromaMin) + variant.chromaMin
  const l = Math.random() * (variant.lightnessMax - variant.lightnessMin) + variant.lightnessMin
  return { l, c, h }
}

// Generate random OKLCH color
export function generateRandomOKLCH(category = 'random') {
  let l, c, h

  if (category === 'random') {
    l = Math.random() * 0.8 + 0.2 // Lightness: 0.2 to 1.0
    c = Math.random() * 0.25 // Chroma: 0 to 0.25
    h = Math.random() * 360 // Hue: 0 to 360
  } else if (category === 'green') {
    // Pick random green variant
    const variant = greenVariants[Math.floor(Math.random() * greenVariants.length)]
    return generateFromVariant(variant)
  } else if (category === 'orange') {
    // Pick random orange variant (using old yellow ranges)
    const variant = orangeVariants[Math.floor(Math.random() * orangeVariants.length)]
    return generateFromVariant(variant)
  } else if (category === 'yellow') {
    // Pick random yellow variant (new proper yellow ranges)
    const variant = yellowVariants[Math.floor(Math.random() * yellowVariants.length)]
    return generateFromVariant(variant)
  } else if (category === 'brown') {
    // Brown colors: h: 20-60°, c: 0.02-0.12, L: 0.25-0.55
    const range = colorRanges[category]
    h = Math.random() * (range.hueMax - range.hueMin) + range.hueMin
    c = Math.random() * (range.chromaMax - range.chromaMin) + range.chromaMin
    l = Math.random() * (range.lightnessMax - range.lightnessMin) + range.lightnessMin
  } else {
    const range = colorRanges[category]

    // Generate hue within range
    if (range.hueMin > range.hueMax) {
      // Handle wrap-around (e.g., red: 345-15)
      h =
        Math.random() < 0.5
          ? Math.random() * (360 - range.hueMin) + range.hueMin
          : Math.random() * range.hueMax
    } else {
      h = Math.random() * (range.hueMax - range.hueMin) + range.hueMin
    }

    // Adjust lightness for specific colors (like red with old brown settings)
    const maxLightness = range.lightnessMax || 1.0
    l = Math.random() * (maxLightness * 0.8 - 0.2) + 0.2

    // Higher chroma for more saturated colors
    c = Math.random() * 0.15 + 0.1 // 0.1 to 0.25
  }

  return { l, c, h }
}

// Convert OKLCH to string
export function oklchToString(oklch) {
  return `oklch(${(oklch.l * 100).toFixed(1)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`
}

// Determine if text should be dark or light based on lightness
export function getTextColor(lightness) {
  return lightness > 0.6 ? 'var(--primary-dark)' : 'var(--primary-light)'
}

// Generate lighter shades
export function generateLighterShades(baseColor) {
  const shades = []
  for (let i = 1; i <= 50; i++) {
    const lightnessIncrease = (1 - baseColor.l) * (i / 50)
    shades.push({
      l: Math.min(baseColor.l + lightnessIncrease, 1),
      c: baseColor.c * (1 - i * 0.01), // Slightly reduce chroma
      h: baseColor.h,
    })
  }
  return shades
}

// Generate darker shades
export function generateDarkerShades(baseColor) {
  const shades = []
  for (let i = 1; i <= 50; i++) {
    const lightnessDecrease = baseColor.l * (i / 50)
    shades.push({
      l: Math.max(baseColor.l - lightnessDecrease, 0),
      c: baseColor.c * (1 - i * 0.006), // Slightly reduce chroma
      h: baseColor.h,
    })
  }
  return shades
}