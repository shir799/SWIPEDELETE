/**
 * Swipe Card Component
 * Tinder-like swipe interface with gesture handling
 */

import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { ImageHash } from '@/utils/duplicateDetection';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface SwipeCardProps {
  image: ImageHash;
  onSwipeLeft: (image: ImageHash) => void;
  onSwipeRight: (image: ImageHash) => void;
  isTop?: boolean;
}

export default function SwipeCard({
  image,
  onSwipeLeft,
  onSwipeRight,
  isTop = false,
}: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') {
        onSwipeLeft(image);
      } else {
        onSwipeRight(image);
      }
    },
    [image, onSwipeLeft, onSwipeRight]
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      const shouldDismiss = Math.abs(translateX.value) > SWIPE_THRESHOLD;

      if (shouldDismiss) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        const targetX = translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH;

        translateX.value = withSpring(
          targetX,
          { velocity: event.velocityX },
          () => runOnJS(handleSwipeComplete)(direction)
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
      opacity: isTop ? opacity : 0.95,
    };
  });

  const deleteOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  const keepOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={isTop}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Delete Overlay (Left Swipe) */}
        <Animated.View style={[styles.overlay, styles.deleteOverlay, deleteOverlayStyle]}>
          <Text style={styles.overlayText}>DELETE</Text>
        </Animated.View>

        {/* Keep Overlay (Right Swipe) */}
        <Animated.View style={[styles.overlay, styles.keepOverlay, keepOverlayStyle]}>
          <Text style={styles.overlayText}>KEEP</Text>
        </Animated.View>

        {/* Image Info */}
        <View style={styles.info}>
          <Text style={styles.infoText}>
            {image.width} × {image.height}
          </Text>
          <Text style={styles.infoText}>
            {(image.fileSize / 1024 / 1024).toFixed(2)} MB
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteOverlay: {
    backgroundColor: 'rgba(220, 38, 38, 0.85)',
  },
  keepOverlay: {
    backgroundColor: 'rgba(34, 197, 94, 0.85)',
  },
  overlayText: {
    fontSize: 56,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
