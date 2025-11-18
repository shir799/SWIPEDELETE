/**
 * Icon Generator Script
 * Generates all app icons programmatically using node-canvas
 * Run: npm run generate:icons
 */

const fs = require('fs');
const path = require('path');

// Try to use canvas, fall back to instructions if not available
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.log('\n⚠️  Canvas library not installed.');
  console.log('📝 Please use the HTML generator instead:');
  console.log('   1. Open scripts/generateIcons.html in your browser');
  console.log('   2. Download all assets');
  console.log('   3. Move them to the assets/ folder\n');
  console.log('Or install canvas: npm install canvas\n');
  process.exit(0);
}

const { createCanvas } = Canvas;

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#1a1a1a',
  darkGray: '#2a2a2a',
};

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

/**
 * Helper to draw rounded rectangle
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

/**
 * Generate App Icon (1024x1024)
 */
function generateAppIcon() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, size, size);

  // Design: Two overlapping cards with swipe motion
  const cardWidth = size * 0.55;
  const cardHeight = size * 0.7;
  const centerX = size / 2;
  const centerY = size / 2;

  // Back card (slightly tilted right)
  ctx.save();
  ctx.translate(centerX + 40, centerY);
  ctx.rotate(8 * Math.PI / 180);
  ctx.fillStyle = colors.darkGray;
  roundRect(ctx, -cardWidth/2, -cardHeight/2, cardWidth, cardHeight, 40);
  ctx.fill();
  ctx.restore();

  // Front card (tilted left)
  ctx.save();
  ctx.translate(centerX - 40, centerY);
  ctx.rotate(-8 * Math.PI / 180);

  ctx.fillStyle = colors.white;
  roundRect(ctx, -cardWidth/2, -cardHeight/2, cardWidth, cardHeight, 40);
  ctx.fill();

  // Arrow on card
  ctx.strokeStyle = colors.black;
  ctx.lineWidth = 24;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-80, 0);
  ctx.stroke();

  // Arrow head
  ctx.beginPath();
  ctx.moveTo(-80, 0);
  ctx.lineTo(-40, -40);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-80, 0);
  ctx.lineTo(-40, 40);
  ctx.stroke();

  ctx.restore();

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'icon.png'), buffer);
  console.log('✅ Generated icon.png (1024x1024)');
}

/**
 * Generate Adaptive Icon (1024x1024) - Foreground only
 */
function generateAdaptiveIcon() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  const centerX = size / 2;
  const centerY = size / 2;

  // Two cards
  ctx.fillStyle = colors.darkGray;
  roundRect(ctx, centerX - 180, centerY - 280, 400, 560, 40);
  ctx.fill();

  ctx.fillStyle = colors.white;
  roundRect(ctx, centerX - 220, centerY - 280, 400, 560, 40);
  ctx.fill();

  // Arrow
  ctx.strokeStyle = colors.black;
  ctx.lineWidth = 32;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(centerX - 20, centerY);
  ctx.lineTo(centerX - 140, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX - 140, centerY);
  ctx.lineTo(centerX - 80, centerY - 60);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX - 140, centerY);
  ctx.lineTo(centerX - 80, centerY + 60);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), buffer);
  console.log('✅ Generated adaptive-icon.png (1024x1024)');
}

/**
 * Generate Splash Screen (1284x2778)
 */
function generateSplash() {
  const width = 1284;
  const height = 2778;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, width, height);

  // Center logo
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 1.0;

  // Card
  ctx.fillStyle = colors.white;
  roundRect(ctx, centerX - 200 * scale, centerY - 300 * scale, 400 * scale, 600 * scale, 40 * scale);
  ctx.fill();

  // Arrow
  ctx.strokeStyle = colors.black;
  ctx.lineWidth = 24 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(centerX + 20 * scale, centerY);
  ctx.lineTo(centerX - 60 * scale, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX - 60 * scale, centerY);
  ctx.lineTo(centerX - 20 * scale, centerY - 40 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX - 60 * scale, centerY);
  ctx.lineTo(centerX - 20 * scale, centerY + 40 * scale);
  ctx.stroke();

  // App name
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 72px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SWIPE DELETE', centerX, centerY + 400);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'splash.png'), buffer);
  console.log('✅ Generated splash.png (1284x2778)');
}

/**
 * Generate Favicon (512x512)
 */
function generateFavicon() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = colors.black;
  ctx.fillRect(0, 0, size, size);

  // Simple arrow
  const centerX = size / 2;
  const centerY = size / 2;

  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 40;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(centerX + 100, centerY);
  ctx.lineTo(centerX - 100, centerY);
  ctx.stroke();

  // Arrow head
  ctx.beginPath();
  ctx.moveTo(centerX - 100, centerY);
  ctx.lineTo(centerX - 30, centerY - 70);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX - 100, centerY);
  ctx.lineTo(centerX - 30, centerY + 70);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'favicon.png'), buffer);
  console.log('✅ Generated favicon.png (512x512)');
}

// Generate all icons
console.log('\n🎨 Generating SwipeDelete Assets...\n');

try {
  generateAppIcon();
  generateAdaptiveIcon();
  generateSplash();
  generateFavicon();

  console.log('\n✨ All assets generated successfully!');
  console.log('📁 Check the assets/ folder\n');
} catch (error) {
  console.error('\n❌ Error generating assets:', error.message);
  console.log('\n📝 Fallback: Use scripts/generateIcons.html in your browser\n');
}
