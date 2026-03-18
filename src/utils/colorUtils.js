const colorRanges = {
  red: { hueMin: 0, hueMax: 30, lightnessMax: 0.65 },
  brown: {
    hueMin: 20,
    hueMax: 60,
    chromaMin: 0.02,
    chromaMax: 0.12,
    lightnessMin: 0.25,
    lightnessMax: 0.55,
  },
  cyan: { hueMin: 160, hueMax: 210 },
  blue: { hueMin: 210, hueMax: 270 },
  purple: { hueMin: 270, hueMax: 315 },
  pink: { hueMin: 315, hueMax: 360 },
}

const greenVariants = [
  { name: "true-green", hueMin: 115, hueMax: 135, lightnessMin: 0.35, lightnessMax: 0.65 },
  { name: "forest", hueMin: 115, hueMax: 140, lightnessMin: 0.3, lightnessMax: 0.45 },
  { name: "emerald", hueMin: 125, hueMax: 145, lightnessMin: 0.4, lightnessMax: 0.65 },
  { name: "mint-green", hueMin: 120, hueMax: 145, lightnessMin: 0.65, lightnessMax: 0.75 },
]

const orangeVariants = [
  { name: "pale-orange", hueMin: 50, hueMax: 70, lightnessMin: 0.8, lightnessMax: 0.95 },
  { name: "true-orange", hueMin: 52, hueMax: 68, lightnessMin: 0.55, lightnessMax: 0.85 },
  { name: "bright-orange", hueMin: 54, hueMax: 66, lightnessMin: 0.6, lightnessMax: 0.9 },
  { name: "golden-orange", hueMin: 45, hueMax: 60, lightnessMin: 0.4, lightnessMax: 0.75 },
  { name: "dark-orange", hueMin: 45, hueMax: 60, lightnessMin: 0.25, lightnessMax: 0.55 },
  { name: "neon-orange", hueMin: 52, hueMax: 64, lightnessMin: 0.7, lightnessMax: 0.95 },
]

const yellowVariants = [
  { name: "pale-yellow", hueMin: 85, hueMax: 100, lightnessMin: 0.85, lightnessMax: 0.95 },
  { name: "true-yellow", hueMin: 90, hueMax: 110, lightnessMin: 0.7, lightnessMax: 0.9 },
  { name: "bright-yellow", hueMin: 92, hueMax: 108, lightnessMin: 0.75, lightnessMax: 0.92 },
  { name: "golden-yellow", hueMin: 85, hueMax: 95, lightnessMin: 0.6, lightnessMax: 0.8 },
  { name: "dark-yellow", hueMin: 88, hueMax: 105, lightnessMin: 0.45, lightnessMax: 0.65 },
  { name: "neon-yellow", hueMin: 95, hueMax: 110, lightnessMin: 0.8, lightnessMax: 0.95 },
]

const CHROMA_MIN = 0.02
const CHROMA_MAX = 0.38

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

function generateFromVariant(variant) {
  const h = randomInRange(variant.hueMin, variant.hueMax)
  const c = randomInRange(CHROMA_MIN, CHROMA_MAX)
  const l = randomInRange(variant.lightnessMin, variant.lightnessMax)
  return { l, c, h }
}

export function generateRandomOKLCH(category = "random") {
  let l, c, h

  if (category === "random") {
    l = randomInRange(0.25, 0.9)
    c = randomInRange(CHROMA_MIN, CHROMA_MAX)
    h = randomInRange(0, 360)
    return { l, c, h }
  }

  if (category === "green") {
    const variant = greenVariants[Math.floor(Math.random() * greenVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === "orange") {
    const variant = orangeVariants[Math.floor(Math.random() * orangeVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === "yellow") {
    const variant = yellowVariants[Math.floor(Math.random() * yellowVariants.length)]
    return generateFromVariant(variant)
  }

  if (category === "brown") {
    const range = colorRanges.brown
    h = randomInRange(range.hueMin, range.hueMax)
    c = randomInRange(range.chromaMin, range.chromaMax)
    l = randomInRange(range.lightnessMin, range.lightnessMax)
    return { l, c, h }
  }

  const range = colorRanges[category]
  if (!range) {
    return generateRandomOKLCH("random")
  }

  if (range.hueMin > range.hueMax) {
    h =
      Math.random() < 0.5
        ? randomInRange(range.hueMin, 360)
        : randomInRange(0, range.hueMax)
  } else {
    h = randomInRange(range.hueMin, range.hueMax)
  }

  const maxLightness = range.lightnessMax || 0.85
  l = randomInRange(0.3, maxLightness)
  c = randomInRange(CHROMA_MIN, CHROMA_MAX)

  return { l, c, h }
}

export function oklchToString(oklch) {
  return `oklch(${(oklch.l * 100).toFixed(1)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`
}

export function getTextColor(lightness) {
  return lightness > 0.58 ? "var(--color-dark)" : "var(--color-cream)"
}

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

export function oklchToRGB(oklch) {
  const L = oklch.l
  const C = oklch.c
  const H = oklch.h * (Math.PI / 180)

  const a = C * Math.cos(H)
  const b = C * Math.sin(H)

  let l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  let m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  let s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3

  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let bv = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  const linearToSRGB = (c) => {
    if (c <= 0.0031308) return 12.92 * c
    return 1.055 * Math.pow(Math.abs(c), 1 / 2.4) - 0.055
  }

  r = Math.round(Math.min(255, Math.max(0, linearToSRGB(r) * 255)))
  g = Math.round(Math.min(255, Math.max(0, linearToSRGB(g) * 255)))
  bv = Math.round(Math.min(255, Math.max(0, linearToSRGB(bv) * 255)))

  return { r, g, b: bv }
}

export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
}

export function oklchToHex(oklch) {
  const { r, g, b } = oklchToRGB(oklch)
  return rgbToHex(r, g, b)
}

export function getRelativeLuminance(r, g, b) {
  const toLinear = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const R = toLinear(r)
  const G = toLinear(g)
  const B = toLinear(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function getContrastRatio(color1, color2) {
  const rgb1 = oklchToRGB(color1)
  const rgb2 = oklchToRGB(color2)
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getWCAGLevel(ratio) {
  if (ratio >= 7) return { large: "AAA", small: "AAA" }
  if (ratio >= 4.5) return { large: "AAA", small: "AA" }
  if (ratio >= 3) return { large: "AA", small: "FAIL" }
  return { large: "FAIL", small: "FAIL" }
}

export function generateHarmony(baseColor, type) {
  const { l, c, h } = baseColor

  switch (type) {
    case "complementary":
      return [
        baseColor,
        { l: Math.min(l + 0.05, 0.9), c, h: (h + 180) % 360 },
      ]
    case "triadic":
      return [
        baseColor,
        { l, c, h: (h + 120) % 360 },
        { l, c, h: (h + 240) % 360 },
      ]
    case "analogous":
      return [
        { l, c, h: (h - 30 + 360) % 360 },
        baseColor,
        { l, c, h: (h + 30) % 360 },
        { l, c, h: (h + 60) % 360 },
      ]
    case "split-complementary":
      return [
        baseColor,
        { l, c, h: (h + 150) % 360 },
        { l, c, h: (h + 210) % 360 },
      ]
    case "tetradic":
      return [
        baseColor,
        { l, c, h: (h + 90) % 360 },
        { l, c, h: (h + 180) % 360 },
        { l, c, h: (h + 270) % 360 },
      ]
    default:
      return [baseColor]
  }
}

const colorNames = [
  { name: "crimson", h: 0, c: 0.2, l: 0.4 },
  { name: "scarlet", h: 15, c: 0.25, l: 0.5 },
  { name: "vermillion", h: 20, c: 0.2, l: 0.55 },
  { name: "burnt sienna", h: 25, c: 0.1, l: 0.45 },
  { name: "terracotta", h: 28, c: 0.12, l: 0.55 },
  { name: "rust", h: 30, c: 0.15, l: 0.4 },
  { name: "copper", h: 35, c: 0.1, l: 0.5 },
  { name: "amber", h: 50, c: 0.18, l: 0.65 },
  { name: "goldenrod", h: 55, c: 0.18, l: 0.7 },
  { name: "saffron", h: 60, c: 0.2, l: 0.75 },
  { name: "marigold", h: 65, c: 0.22, l: 0.75 },
  { name: "canary", h: 95, c: 0.2, l: 0.88 },
  { name: "lemon", h: 98, c: 0.22, l: 0.9 },
  { name: "chartreuse", h: 110, c: 0.2, l: 0.75 },
  { name: "lime", h: 118, c: 0.25, l: 0.7 },
  { name: "mint", h: 128, c: 0.12, l: 0.78 },
  { name: "sage", h: 130, c: 0.06, l: 0.6 },
  { name: "forest green", h: 135, c: 0.15, l: 0.38 },
  { name: "emerald", h: 140, c: 0.22, l: 0.55 },
  { name: "jade", h: 148, c: 0.14, l: 0.5 },
  { name: "teal", h: 175, c: 0.15, l: 0.5 },
  { name: "seafoam", h: 165, c: 0.1, l: 0.72 },
  { name: "aquamarine", h: 170, c: 0.18, l: 0.72 },
  { name: "turquoise", h: 185, c: 0.18, l: 0.65 },
  { name: "cerulean", h: 215, c: 0.18, l: 0.55 },
  { name: "cobalt", h: 225, c: 0.2, l: 0.42 },
  { name: "azure", h: 220, c: 0.15, l: 0.65 },
  { name: "sapphire", h: 240, c: 0.2, l: 0.38 },
  { name: "indigo", h: 265, c: 0.2, l: 0.38 },
  { name: "violet", h: 275, c: 0.22, l: 0.55 },
  { name: "amethyst", h: 285, c: 0.16, l: 0.6 },
  { name: "lavender", h: 280, c: 0.08, l: 0.78 },
  { name: "mauve", h: 295, c: 0.1, l: 0.62 },
  { name: "plum", h: 300, c: 0.14, l: 0.42 },
  { name: "orchid", h: 305, c: 0.18, l: 0.65 },
  { name: "magenta", h: 325, c: 0.25, l: 0.55 },
  { name: "rose", h: 335, c: 0.16, l: 0.65 },
  { name: "blush", h: 340, c: 0.08, l: 0.78 },
  { name: "dusty rose", h: 345, c: 0.08, l: 0.65 },
  { name: "coral", h: 20, c: 0.18, l: 0.65 },
  { name: "peach", h: 45, c: 0.1, l: 0.82 },
  { name: "sand", h: 75, c: 0.06, l: 0.82 },
  { name: "khaki", h: 80, c: 0.08, l: 0.72 },
  { name: "olive", h: 95, c: 0.1, l: 0.48 },
  { name: "moss", h: 108, c: 0.1, l: 0.45 },
  { name: "slate", h: 220, c: 0.05, l: 0.5 },
  { name: "steel", h: 210, c: 0.06, l: 0.6 },
  { name: "ash", h: 200, c: 0.02, l: 0.65 },
  { name: "silver", h: 210, c: 0.01, l: 0.78 },
  { name: "charcoal", h: 200, c: 0.02, l: 0.3 },
]

export function getClosestColorName(oklch) {
  let closest = colorNames[0]
  let minDist = Infinity

  for (const named of colorNames) {
    const dh = Math.min(Math.abs(oklch.h - named.h), 360 - Math.abs(oklch.h - named.h)) / 180
    const dc = Math.abs(oklch.c - named.c) / 0.4
    const dl = Math.abs(oklch.l - named.l)
    const dist = dh * 2 + dc * 1.5 + dl
    if (dist < minDist) {
      minDist = dist
      closest = named
    }
  }

  if (oklch.c < 0.04) {
    if (oklch.l < 0.2) return "black"
    if (oklch.l < 0.4) return "charcoal"
    if (oklch.l < 0.6) return "gray"
    if (oklch.l < 0.8) return "silver"
    return "white"
  }

  return closest.name
}

export function exportPalette(colors, format) {
  const names = colors.map((c, i) => ({ color: c, name: `color-${i + 1}` }))

  if (format === "css") {
    const vars = names.map((n) => `  --${n.name}: ${oklchToString(n.color)};`).join("\n")
    return `:root {\n${vars}\n}`
  }

  if (format === "tailwind") {
    const entries = names
      .map((n) => `    '${n.name}': '${oklchToString(n.color)}',`)
      .join("\n")
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      }\n    }\n  }\n}`
  }

  if (format === "scss") {
    return names.map((n) => `$${n.name}: ${oklchToString(n.color)};`).join("\n")
  }

  if (format === "json") {
    const obj = {}
    names.forEach((n) => {
      obj[n.name] = {
        oklch: oklchToString(n.color),
        hex: oklchToHex(n.color),
      }
    })
    return JSON.stringify(obj, null, 2)
  }

  return ""
}
