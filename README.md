# OKLCH Color Generator - React Version

A beautiful, modern color generator built with React 19+ and Vite, featuring OKLCH color space support.

## Features

- Generate random colors in OKLCH color space
- Category-based color generation (red, orange, yellow, brown, green, cyan, blue, purple, pink)
- Generate lighter and darker shades (50 variations each)
- Fine-tune colors with interactive settings
- One-click copy to clipboard
- Fully responsive design
- Smooth animations and transitions

## Tech Stack

- React 19
- Vite 6
- CSS3 (with modern features)
- OKLCH Color Space

## Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Main container component
│   ├── WelcomeSection.jsx    # Category selection screen
│   ├── MainSection.jsx       # Generated colors display
│   ├── LighterSection.jsx    # Lighter shades view
│   ├── DarkerSection.jsx     # Darker shades view
│   ├── SettingsSection.jsx   # Color adjustment controls
│   ├── ColorBox.jsx          # Individual color box component
│   ├── CopyFeedback.jsx      # Copy notification
├── utils/
│   └── colorUtils.js         # Color generation utilities
├── App.jsx                   # Root component               
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

1. **Select a Category:** Choose from absolute random or specific color categories
2. **Generate Colors:** Click "Generate Colors" to create new color variations
3. **Explore Options:** Click any color box to:
   - Copy the color code
   - View lighter shades
   - View darker shades
   - Adjust with settings
4. **Fine-tune:** Use the settings panel to precisely adjust lightness, saturation, and hue

## Color Space

This project uses the OKLCH color space, which provides:
- Perceptually uniform colors
- Better interpolation between colors
- More accurate representation of human color perception
- Consistent lightness across different hues

## Browser Compatibility

Modern browsers with OKLCH support:
- Chrome 111+
- Edge 111+
- Safari 15.4+
- Firefox 113+

## License

MIT
