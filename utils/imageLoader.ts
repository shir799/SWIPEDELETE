/**
 * Image loading and media library access utilities
 */

import * as MediaLibrary from 'expo-media-library';
import { ImageHash, generateSimpleHash } from './duplicateDetection';

export interface LoadImagesOptions {
  first?: number;
  after?: string;
  sortBy?: MediaLibrary.SortBy[];
}

/**
 * Request permissions for media library access
 */
export async function requestPermissions(): Promise<boolean> {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Load images from device gallery
 */
export async function loadImages(
  options: LoadImagesOptions = {}
): Promise<ImageHash[]> {
  const {
    first = 100,
    after,
    sortBy = [MediaLibrary.SortBy.creationTime]
  } = options;

  try {
    const result = await MediaLibrary.getAssetsAsync({
      first,
      after,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy
    });

    const imageHashes: ImageHash[] = result.assets.map(asset => ({
      uri: asset.uri,
      hash: generateSimpleHash(asset),
      width: asset.width,
      height: asset.height,
      fileSize: asset.fileSize || 0,
      creationTime: asset.creationTime,
      id: asset.id
    }));

    return imageHashes;
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
}

/**
 * Delete image from device
 */
export async function deleteImage(assetId: string): Promise<boolean> {
  try {
    await MediaLibrary.deleteAssetsAsync([assetId]);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Delete multiple images
 */
export async function deleteImages(assetIds: string[]): Promise<number> {
  try {
    await MediaLibrary.deleteAssetsAsync(assetIds);
    return assetIds.length;
  } catch (error) {
    console.error('Error deleting images:', error);
    return 0;
  }
}
