/**
 * Image Stack Icon
 * Represents multiple/duplicate images
 */

import React from 'react';
import Svg, { Rect, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function ImageStackIcon({ size = 64, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <G opacity={0.4}>
        <Rect
          x="18"
          y="14"
          width="32"
          height="40"
          rx="4"
          stroke={color}
          strokeWidth={2}
        />
      </G>
      <G opacity={0.7}>
        <Rect
          x="14"
          y="18"
          width="32"
          height="40"
          rx="4"
          stroke={color}
          strokeWidth={2}
        />
      </G>
      <Rect
        x="10"
        y="22"
        width="32"
        height="40"
        rx="4"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
      />
    </Svg>
  );
}
