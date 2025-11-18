# SwipeDelete Assets

Professional, minimalist app icons and assets.

## Quick Start

### Option 1: HTML Generator (Recommended)

1. Open `scripts/generateIcons.html` in your browser
2. Click each "Download" button to save the assets
3. Move all downloaded files to this folder (`assets/`)

### Option 2: Node.js Script

```bash
# Install dependencies (if not already installed)
npm install

# Generate all assets
npm run generate:icons
```

## Required Assets

All assets use a minimalist black & white design with geometric swipe cards:

- **icon.png** (1024×1024) - App icon for iOS/Android
- **adaptive-icon.png** (1024×1024) - Android adaptive icon (transparent background)
- **splash.png** (1284×2778) - Launch screen
- **favicon.png** (512×512) - Web favicon

## Design System

**Color Palette:**
- Primary: `#000000` (Black)
- Secondary: `#FFFFFF` (White)
- Surface: `#1a1a1a` (Dark Gray)
- Accent: `#2a2a2a` (Medium Gray)

**Icon Concept:**
- Two overlapping cards representing duplicates
- Left-pointing arrow showing swipe gesture
- Clean geometric shapes, no gradients
- Apple-like minimalism

## In-App SVG Icons

Custom vector icons are located in `components/icons/`:

- **ImageStackIcon** - Stacked images representing duplicates
- **SwipeLeftIcon** - Delete gesture indicator
- **SwipeRightIcon** - Keep gesture indicator
- **CheckmarkIcon** - Success/completion state
- **ScanIcon** - Scanning/searching state

All SVG icons are:
- Scalable without quality loss
- Optimized for performance
- Consistent stroke weights
- Accessible color contrast

## Usage in App

Icons are imported and used throughout the app:

```typescript
import { ImageStackIcon, CheckmarkIcon } from '@/components/icons';

<ImageStackIcon size={80} color="#ffffff" />
<CheckmarkIcon size={64} color="#22c55e" />
```

## Platform Requirements

### iOS
- App icon should be 1024×1024 PNG
- No transparency, no rounded corners (iOS adds them)
- sRGB color space

### Android
- Adaptive icon with transparent background
- Safe zone: keep important elements within central 66% circle
- Background color defined in app.json

### Web
- Favicon in various sizes (512×512 is base)
- Will be resized automatically for different contexts

## File Checklist

- [ ] icon.png
- [ ] adaptive-icon.png
- [ ] splash.png
- [ ] favicon.png

Once all assets are in place, you're ready to build!
