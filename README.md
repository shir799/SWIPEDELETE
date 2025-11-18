# SwipeDelete

A minimalist cross-platform mobile app for finding and deleting duplicate photos with an intuitive swipe interface.

## Features

- **Duplicate Detection**: Automatically scans your photo library for duplicate images
- **Swipe Interface**: Tinder-like swipe gestures - left to delete, right to keep
- **Cross-Platform**: Works on iOS, Android, and Web
- **Minimalist Design**: Clean, monochrome interface without distracting gradients
- **Smart Detection**: Uses perceptual hashing to find similar images even with different file sizes

## Tech Stack

- **React Native** with **Expo** for cross-platform development
- **Expo Router** for navigation
- **React Native Gesture Handler** for smooth swipe interactions
- **React Native Reanimated** for performant animations
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## How It Works

1. **Scan**: The app requests permission to access your photo library
2. **Detect**: Analyzes images to find duplicates based on dimensions and file size
3. **Review**: Shows duplicate groups one at a time
4. **Swipe**: Swipe left to delete, right to keep each image
5. **Clean**: Automatically removes deleted images from your device

## Permissions

The app requires the following permissions:

- **iOS**: Photo Library access (`NSPhotoLibraryUsageDescription`)
- **Android**: Read/Write External Storage, Read Media Images

## Design Philosophy

SwipeDelete follows a brutally minimal design approach:

- **Monochrome Color Scheme**: Pure black and white with accent colors only for actions
- **Clean Typography**: High contrast, readable fonts with generous letter spacing
- **Purposeful Motion**: Smooth animations that enhance usability
- **No Clutter**: Every element serves a clear purpose

## Project Structure

```
swipe-delete/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Main screen
├── components/            # React components
│   ├── SwipeCard.tsx     # Individual swipeable card
│   └── SwipeStack.tsx    # Stack of cards
├── utils/                # Utility functions
│   ├── duplicateDetection.ts
│   └── imageLoader.ts
└── assets/               # Images and fonts
```

## Future Enhancements

- Advanced perceptual hashing with native image processing
- Cloud backup before deletion
- Undo functionality
- Batch operations
- Export deleted images list
- ML-based duplicate detection

## License

MIT

## Author

Created with Claude Code
