'use client';

import React from 'react';
import type { ReactElement } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { getAudioPath } from '@/utils/paths';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

// Since we don't have type declarations for react-h5-audio-player,
// we'll use a more generic type for the component
type H5AudioPlayerProps = {
  src: string;
  autoPlay?: boolean;
  showJumpControls?: boolean;
  layout?: 'horizontal' | 'vertical' | 'stacked';
  customProgressBarSection?: any[];
  customControlsSection?: any[];
};

export default function AudioPlayer({ src, title }: AudioPlayerProps): ReactElement {
  return (
    <div className="w-full">
      <H5AudioPlayer
        src={getAudioPath(src)}
        autoPlay={false}
        showJumpControls={true}
        layout="horizontal"
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
      />
    </div>
  );
} 