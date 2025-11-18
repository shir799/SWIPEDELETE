/**
 * Swipe Stack Component
 * Manages stack of swipeable cards
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import SwipeCard from './SwipeCard';
import { ImageHash } from '@/utils/duplicateDetection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeStackProps {
  images: ImageHash[];
  onDelete: (image: ImageHash) => void;
  onKeep: (image: ImageHash) => void;
  onComplete: () => void;
}

export default function SwipeStack({
  images,
  onDelete,
  onKeep,
  onComplete,
}: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = (image: ImageHash) => {
    onDelete(image);
    moveToNext();
  };

  const handleSwipeRight = (image: ImageHash) => {
    onKeep(image);
    moveToNext();
  };

  const moveToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= images.length) {
        setTimeout(onComplete, 300);
      }
      return next;
    });
  };

  if (currentIndex >= images.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more duplicates!</Text>
        <Text style={styles.emptySubtext}>Your gallery is clean</Text>
      </View>
    );
  }

  const visibleCards = images.slice(currentIndex, currentIndex + 3);

  return (
    <View style={styles.container}>
      {visibleCards.reverse().map((image, index) => {
        const reverseIndex = visibleCards.length - 1 - index;
        const isTop = reverseIndex === 0;

        return (
          <View
            key={image.id}
            style={[
              styles.cardContainer,
              {
                transform: [
                  { scale: 1 - reverseIndex * 0.05 },
                  { translateY: -reverseIndex * 10 },
                ],
                zIndex: -reverseIndex,
              },
            ]}
          >
            <SwipeCard
              image={image}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              isTop={isTop}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#808080',
    letterSpacing: 0.5,
  },
});
