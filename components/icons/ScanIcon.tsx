/**
 * Scan Icon
 * Scanning/searching indicator
 */

import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export default function ScanIcon({ size = 64, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Scanner corners */}
      <Path
        d="M16 20V16C16 14.8954 16.8954 14 18 14H22"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M42 14H46C47.1046 14 48 14.8954 48 16V20"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M48 44V48C48 49.1046 47.1046 50 46 50H42"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M22 50H18C16.8954 50 16 49.1046 16 48V44"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Scan line */}
      <Rect
        x="20"
        y="30"
        width="24"
        height="2"
        rx="1"
        fill={color}
        opacity={0.6}
      />
    </Svg>
  );
}
