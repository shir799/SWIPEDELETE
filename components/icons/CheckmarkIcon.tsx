/**
 * Checkmark Icon
 * Success/completion indicator
 */

import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function CheckmarkIcon({ size = 64, color = '#22c55e' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle
        cx="32"
        cy="32"
        r="30"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
      />
      <Path
        d="M20 32L28 40L44 24"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
