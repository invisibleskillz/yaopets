import React from 'react';

interface MobileStatusBarProps {
  style?: 'light' | 'dark';
  backgroundColor?: string;
}

/**
 * Component to control the status bar in mobile applications.
 * This component does not render anything visually; it only interacts with the native API.
 */
const MobileStatusBar: React.FC<MobileStatusBarProps> = ({
  style = 'light',
  backgroundColor = '#FFFFFF'
}) => {
  // This is a simplified version without Capacitor
  return null;
};

export default MobileStatusBar;