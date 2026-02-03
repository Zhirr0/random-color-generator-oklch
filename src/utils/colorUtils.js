// Color hue ranges
const colorRanges = {
  red: { hueMin: 20, hueMax: 40, lightnessMax: 0.5 },
  brown: { 
    hueMin: 20, 
    hueMax: 60, 
    chromaMin: 0.02, 
    chromaMax: 0.12, 
    lightnessMin: 0.25, 
    lightnessMax: 0.55 
  },
  cyan: { hueMin: 160, hueMax: 260 },
  blue: { hueMin: 210, hueMax: 270 },
  purple: { hueMin: 270, hueMax: 315 },
  pink: { hueMin: 315, hueMax: 345 },
}

// Green subcategories
const greenVariants = [
  { name: 'true-green', hueMin: 115, hueMax: 135, lightnessMin: 0.35, lightnessMax: 0.65 },
  { name: 'forest', hueMin: 115, hueMax: 140, lightnessMin: 0.30, lightnessMax: 0.45 },
  { name: 'emerald', hueMin: 125, hueMax: 145, lightnessMin: 0.40, lightnessMax: 0.65 },
  { name: 'mint-green', hueMin: 120, hueMax: 145, lightnessMin: 0.65, lightnessMax: 0.75 },
]

// Orange subcategories
const orangeVariants = [
  { name: 'pale-orange', hueMin: 50, hueMax: 70, lightnessMin: 0.80, lightnessMax: 0.95 },
  { name: 'true-orange', hueMin: 52, hueMax: 68, lightnessMin: 0.55, lightnessMax: 0.85 },
  { name: 'bright-orange', hueMin: 54, hueMax: 66, lightnessMin: 0.60, lightnessMax: 0.90 },
  { name: 'golden-orange', hueMin: 45, hueMax: 60, lightnessMin: 0.40, lightnessMax: 0.75 },
  { name: 'dark-orange', hueMin: 45, hueMax: 60, lightnessMin: 0.25, lightnessMax: 0.55 },
  { name: 'neon-orange', hueMin: 52, hueMax: 64, lightnessMin: 0.70, lightnessMax: 0.95 },
]

// Yellow subcategories
const yellowVariants = [
  { name: 'pale-yellow', hueMin: 85, hueMax: 100, lightnessMin: 0.85, lightnessMax: 0.95 },
  { name: 'true-yellow', hueMin: 90, hueMax: 110, lightnessMin: 0.70, lightnessMax: 0.90 },
  { name: 'bright-yellow', hueMin: 92, hueMax: 108, lightnessMin: 0.75, lightnessMax: 0.92 },
  { name: 'golden-yellow', hueMin: 85, hueMax: 95, lightnessMin: 0.60, lightnessMax: 0.80 },
  { name: 'dark-yellow', hueMin: 88, hueMax: 105, lightnessMin: 0.45, lightnessMax: 0.65 },
  { name: 'neon-yellow', hueMin: 95, hueMax: 110, lightnessMin: 0.80, lightnessMax: 0.95 },
]

// Constants for chroma range (applied to all colors except brown)
const CHROMA_MIN = 0
const CHROMA_MAX = 0.4

// Helper: generate random value within range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

// Helper: generate from variant ranges
function generateFromVariant(variant) {
  const h = randomInRange(variant.hueMin, variant.hueMax)
  const c = randomInRange(CHROMA_MIN, CHROMA_MAX)
  const l = randomInRange(variant.lightnessMin, variant.lightnessMax)
  return { l, c, h }
}

// Generate random OKLCH color
export function generateRandomOKLCH(category = 'random') {
  let l, c, h

  if (category === 'random') {
    l = randomInRange(0.2, 1.0)
    c = randomInRange(CHROMA_MIN, CHROMA_MAX)
    h = randomInRange(0, 360)
    return { l, c, h }
  }

  if (category === 'green') {
    const variant = greenVariants[Math.floor(Math.random() * greenVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === 'orange') {
    const variant = orangeVariants[Math.floor(Math.random() * orangeVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === 'yellow') {
    const variant = yellowVariants[Math.floor(Math.random() * yellowVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === 'brown') {
    const range = colorRanges.brown
    h = randomInRange(range.hueMin, range.hueMax)
    c = randomInRange(range.chromaMin, range.chromaMax) // Brown uses its own chroma range
    l = randomInRange(range.lightnessMin, range.lightnessMax)
    return { l, c, h }
  }

  // All other color categories
  const range = colorRanges[category]
  if (!range) {
    console.warn(`Unknown category: ${category}, using random`)
    return generateRandomOKLCH('random')
  }

  // Generate hue (handle wrap-around if needed)
  if (range.hueMin > range.hueMax) {
    h = Math.random() < 0.5
      ? randomInRange(range.hueMin, 360)
      : randomInRange(0, range.hueMax)
  } else {
    h = randomInRange(range.hueMin, range.hueMax)
  }

  // Lightness (with optional max constraint)
  const maxLightness = range.lightnessMax || 1.0
  l = randomInRange(0.2, maxLightness * 0.8)

  // Chroma: full 0-0.4 range for all non-brown colors
  c = randomInRange(CHROMA_MIN, CHROMA_MAX)

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
      c: baseColor.c * (1 - i * 0.01),
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
      c: baseColor.c * (1 - i * 0.006),
      h: baseColor.h,
    })
  }
  return shades
}