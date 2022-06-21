import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

export default function MusicPlayer({ url }) {
  const [playing, toggle] = useAudio(url);

  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <IconButton aria-label='play' onClick={toggle}>
        {playing ? (
          <PauseIcon htmlColor='#FFFFFF' />
        ) : (
          <PlayArrowIcon htmlColor='#FFFFFF' />
        )}
      </IconButton>
    </div>
  );
}