// Color hue ranges
export const colorRanges = {
  red: { hueMin: 345, hueMax: 15 },
  orange: { hueMin: 15, hueMax: 45 },
  yellow: { hueMin: 45, hueMax: 75 },
  brown: { hueMin: 20, hueMax: 40, lightnessMax: 0.5 },
  green: { hueMin: 90, hueMax: 150 },
  cyan: { hueMin: 150, hueMax: 210 },
  blue: { hueMin: 210, hueMax: 270 },
  purple: { hueMin: 270, hueMax: 315 },
  pink: { hueMin: 315, hueMax: 345 },
};

// Generate random OKLCH color
export function generateRandomOKLCH(category = "random") {
  let l, c, h;

  if (category === "random") {
    l = Math.random() * 0.8 + 0; // Lightness: 0 to 1.0
    c = Math.random() * 0.25; // Chroma: 0 to 0.25
    h = Math.random() * 360; // Hue: 0 to 360
  } else {
    const range = colorRanges[category];

    // Generate hue within range
    if (range.hueMin > range.hueMax) {
      // Handle wrap-around (e.g., red: 345-15)
      h =
        Math.random() < 0.5
          ? Math.random() * (360 - range.hueMin) + range.hueMin
          : Math.random() * range.hueMax;
    } else {
      h = Math.random() * (range.hueMax - range.hueMin) + range.hueMin;
    }

    // Adjust lightness for specific colors (like brown)
    const maxLightness = range.lightnessMax || 1.0;
    l = Math.random() * (maxLightness * 0.8 - 0.2) + 0.2;

    // Higher chroma for more saturated colors
    c = Math.random() * 0.15 + 0.1; // 0.1 to 0.25
  }

  return { l, c, h };
}

// Convert OKLCH to string
export function oklchToString(oklch) {
  return `oklch(${(oklch.l * 100).toFixed(1)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`;
}

// Determine if text should be dark or light based on lightness
export function getTextColor(lightness) {
  return lightness > 0.6 ? "var(--primary-dark)" : "var(--primary-light)";
}

// Generate lighter shades
export function generateLighterShades(baseColor) {
  const shades = [];
  for (let i = 1; i <= 50; i++) {
    const lightnessIncrease = (1 - baseColor.l) * (i / 50);
    shades.push({
      l: Math.min(baseColor.l + lightnessIncrease, 1),
      c: baseColor.c * (1 - i * 0.01), // Slightly reduce chroma
      h: baseColor.h,
    });
  }
  return shades;
}

// Generate darker shades
export function generateDarkerShades(baseColor) {
  const shades = [];
  for (let i = 1; i <= 50; i++) {
    const lightnessDecrease = baseColor.l * (i / 50);
    shades.push({
      l: Math.max(baseColor.l - lightnessDecrease, 0),
      c: baseColor.c * (1 - i * 0.006), // Slightly reduce chroma
      h: baseColor.h,
    });
  }
  return shades;
}
