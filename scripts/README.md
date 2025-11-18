# Asset Generation Scripts

Multiple options for generating SwipeDelete app icons and assets.

## Methods

### 1. HTML Generator (Easiest - No Installation)

**Best for:** Quick generation, no dependencies

```bash
# Just open in browser
open scripts/generateIcons.html
# or
firefox scripts/generateIcons.html
# or drag file into browser
```

Features:
- No installation required
- Visual preview of all assets
- One-click download for each asset
- Works on any platform

### 2. Node.js Script (Automated)

**Best for:** Automated builds, CI/CD

```bash
# Install dependencies first
npm install

# Generate all assets
npm run generate:icons
```

Requirements:
- Node.js installed
- `canvas` package (automatically installed)

### 3. Manual Design (Custom)

Use design tools like:
- **Figma** - Professional design tool
- **Sketch** - macOS design app
- **Affinity Designer** - One-time purchase alternative
- **Inkscape** - Free open-source vector editor

Follow the design specs in `assets/README.md`

## Asset Specifications

All generated assets follow these specifications:

### App Icon (icon.png)
- Size: 1024×1024 px
- Format: PNG
- Color: Black background, white elements
- Design: Overlapping cards with arrow

### Adaptive Icon (adaptive-icon.png)
- Size: 1024×1024 px
- Format: PNG with transparency
- Safe zone: Central 66% circle
- Design: Same as app icon, transparent background

### Splash Screen (splash.png)
- Size: 1284×2778 px (iPhone 14 Pro Max)
- Format: PNG
- Background: Solid black
- Design: Centered logo with app name

### Favicon (favicon.png)
- Size: 512×512 px
- Format: PNG
- Design: Simplified arrow icon

## Verification

After generation, verify assets:

```bash
# Check if all files exist
ls -lh ../assets/*.png

# Check image dimensions (requires ImageMagick)
identify ../assets/*.png
```

Expected output:
```
icon.png PNG 1024x1024
adaptive-icon.png PNG 1024x1024
splash.png PNG 1284x2778
favicon.png PNG 512x512
```

## Troubleshooting

### Canvas installation fails
If Node.js canvas fails to install:
1. Use the HTML generator instead
2. Or install system dependencies:
   - macOS: `brew install pkg-config cairo pango libpng jpeg giflib librsvg`
   - Ubuntu: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`

### Generated assets look wrong
1. Clear browser cache if using HTML generator
2. Re-run the script
3. Check that `assets/` folder exists
4. Verify file permissions

## Design Credits

Icons designed following Apple Human Interface Guidelines:
- Minimalist geometric shapes
- High contrast (black & white)
- Clear hierarchy
- No gradients or complex effects
- Consistent 2dp stroke width
