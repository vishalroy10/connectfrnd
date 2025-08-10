'use client';
import { useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

export const isChrome = () => {
  const isChromium = (window as any).chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = typeof (window as any).opr !== 'undefined';
  const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
  const isIOSChrome = winNav.userAgent.match('CriOS');

  if (isIOSChrome) {
    // is Google Chrome on IOS
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    // is Google Chrome
    return true;
  } else {
    // not Google Chrome
    return false;
  }
};
const UseVoiceRulesHook = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackRef = useRef<number | null>(null);
  const t = useTranslations('voiceRules');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const audioCriterias = [
    {
      description: t('criteria1'),
    },
    {
      description: t('criteria2'),
    },
    {
      description: t('criteria3'),
    },
  ];

  const voiceHints = [
    {
      description: t('hint1'),
    },
    {
      description: t('hint2'),
    },
    {
      description: t('hint3'),
    },
    {
      description: t('hint4'),
    },
  ];

  const stopPlayback = () => {
    if (playbackRef.current) {
      clearInterval(playbackRef.current);
      playbackRef.current = null;
    }
  };

  const handlePlay = () => {
    const audio = document.getElementById('recorder-audio') as HTMLAudioElement;
    const audioURL = `https://${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/GUIDELINE/example.mp3?duration=12`;
    if (audioURL && audio) {
      if (audio.src !== audioURL) {
        if (isChrome()) {
          audio.src = audioURL;
        } else {
          audio.removeAttribute('src');
        }
        const children = audio.children;
        for (let index = 0; index < children.length; index++) {
          const child = children.item(index) as HTMLSourceElement;
          if (child && child.src !== audioURL) {
            child.src = audioURL;
          }
        }
      }

      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);

        audio.onended = () => {
          stopPlayback();
          setIsPlaying(false);
        };
      } else {
        audio.pause();
        setIsPlaying(false);
        stopPlayback();
      }
    }
  };

  return {
    handlePlay,
    audioCriterias,
    voiceHints,
    t,
    isMobile,
    isPlaying,
  };
};

export default UseVoiceRulesHook;
