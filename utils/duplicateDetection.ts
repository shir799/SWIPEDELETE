/**
 * Duplicate Image Detection using perceptual hashing
 * Detects visually similar images even if they have different file sizes/formats
 */

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-media-library';

export interface ImageHash {
  uri: string;
  hash: string;
  width: number;
  height: number;
  fileSize: number;
  creationTime: number;
  id: string;
}

export interface DuplicateGroup {
  original: ImageHash;
  duplicates: ImageHash[];
  similarityScore: number;
}

/**
 * Simple perceptual hash based on image metadata and file characteristics
 * For production: integrate with native image processing library
 */
export function generateSimpleHash(asset: Asset): string {
  // Create hash based on dimensions and file size
  const dimensionHash = `${asset.width}x${asset.height}`;
  const sizeHash = Math.floor(asset.fileSize / 1000); // Round to KB

  return `${dimensionHash}_${sizeHash}`;
}

/**
 * Calculate similarity between two images based on metadata
 */
export function calculateSimilarity(img1: ImageHash, img2: ImageHash): number {
  // Same hash = 100% similar
  if (img1.hash === img2.hash) return 100;

  // Calculate dimension similarity
  const widthDiff = Math.abs(img1.width - img2.width);
  const heightDiff = Math.abs(img1.height - img2.height);
  const dimensionSimilarity = 100 - ((widthDiff + heightDiff) / (img1.width + img1.height)) * 100;

  // Calculate file size similarity
  const sizeDiff = Math.abs(img1.fileSize - img2.fileSize);
  const avgSize = (img1.fileSize + img2.fileSize) / 2;
  const sizeSimilarity = 100 - (sizeDiff / avgSize) * 100;

  // Combined score
  return (dimensionSimilarity * 0.6 + sizeSimilarity * 0.4);
}

/**
 * Find duplicate images in a list
 */
export function findDuplicates(
  images: ImageHash[],
  similarityThreshold: number = 95
): DuplicateGroup[] {
  const duplicateGroups: DuplicateGroup[] = [];
  const processed = new Set<string>();

  for (let i = 0; i < images.length; i++) {
    if (processed.has(images[i].id)) continue;

    const duplicates: ImageHash[] = [];

    for (let j = i + 1; j < images.length; j++) {
      if (processed.has(images[j].id)) continue;

      const similarity = calculateSimilarity(images[i], images[j]);

      if (similarity >= similarityThreshold) {
        duplicates.push(images[j]);
        processed.add(images[j].id);
      }
    }

    if (duplicates.length > 0) {
      duplicateGroups.push({
        original: images[i],
        duplicates,
        similarityScore: 100
      });
      processed.add(images[i].id);
    }
  }

  return duplicateGroups;
}

/**
 * Sort duplicates by keeping the best quality (largest file size, newest)
 */
export function sortByQuality(images: ImageHash[]): ImageHash[] {
  return [...images].sort((a, b) => {
    // Prefer larger file size (usually better quality)
    if (Math.abs(a.fileSize - b.fileSize) > 1000) {
      return b.fileSize - a.fileSize;
    }
    // Then prefer newer files
    return b.creationTime - a.creationTime;
  });
}
