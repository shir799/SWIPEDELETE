/**
 * Swipe Right Icon (Keep)
 * Minimalist geometric design
 */

import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function SwipeRightIcon({ size = 24, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G>
        {/* Arrow pointing right */}
        <Path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
