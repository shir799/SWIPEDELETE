/**
 * Swipe Left Icon (Delete)
 * Minimalist geometric design
 */

import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function SwipeLeftIcon({ size = 24, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G>
        {/* Arrow pointing left */}
        <Path
          d="M19 12H5M5 12L12 5M5 12L12 19"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
