import { handleUpdate } from '@/components/page/OnboardingSteps';
import { voiceUrlKey } from '@/keys/firestoreKeys';
import { Helper } from '@/utility/helper';
import React, { useEffect, useState } from 'react';
import useStateRef from 'react-usestateref';
import { useUserStore } from '@/store/reducers/usersReducer';

export interface RecorderProps {
  blob: Blob;
  duration: number;
  fileType: string;
}

export default function useAudioRecording({ audioURL, setAudioURL, setVoiceDetails }: any) {
  const userStore = useUserStore();
  const currentUser: any = userStore?.currentUser;
  const [uid] = [currentUser?.uid];
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const timerRef = React.useRef<number | null>(null);
  const playbackRef = React.useRef<number | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const minDuration = 5;
  const maxDuration = 15;

  const [totalSeconds, setTotalSeconds, totalSecondsRef] = useStateRef<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [finalDuration, setFinalDuration] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioValue, setCurrentAudioValue] = useState<number>(0);
  const [requireMicroPhone, setRequireMicroPhone] = useState(false);
  const [microphoneError, setMicrophoneError] = useState<any>();

  const handleClose = () => {
    setRequireMicroPhone(false);
  };

  useEffect(() => {
    if (audioURL) {
      const link = audioURL?.split('duration=');
      if (link?.length > 1) {
        setTotalSeconds(+link[1]);
        if (Number(link[1] >= 5)) {
          setVoiceDetails((pre: any) => ({
            ...pre,
            next: true,
          }));
        }
      }
    }
  }, [audioURL]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopPlayback = () => {
    if (playbackRef.current) {
      clearInterval(playbackRef.current);
      playbackRef.current = null;
    }
  };

  const updateWidth = (seconds: number) => {
    const newWidth = Math.ceil((seconds / maxDuration) * 100);
    document.documentElement.style.setProperty('--progress-width', `${newWidth}`);
    setCurrentAudioValue(finalDuration ? finalDuration - totalSeconds : 0);
  };

  const handleStartRecording = async () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true });

    try {
      setIsRecording(true);
      setVoiceDetails((pre: any) => ({
        ...pre,
        next: false,
      }));
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });

        let meme = '';
        if (chunksRef.current.length !== 0) {
          meme = chunksRef.current[0].type;
        }

        if (totalSecondsRef.current >= minDuration) {
          setVoiceDetails({
            blob: blob,
            duration: totalSecondsRef.current,
            fileType: meme,
            next: true,
          });

          const vendorURL = window.URL || window.webkitURL;
          setAudioURL(vendorURL.createObjectURL(blob));
          setIsRecording(false);
          setFinalDuration(
            Math.min(
              Math.floor(chunksRef.current.length / (stream.getAudioTracks()[0]?.getSettings()?.sampleRate || 1)),
              maxDuration
            )
          );
        }
      };

      mediaRecorder.start(10);

      // Start timer
      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds++;
        if (seconds >= maxDuration) {
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
          }
          stopTimer();
        }
        setTotalSeconds(seconds);
        updateWidth(seconds);
      }, 1000);

      document.documentElement.style.setProperty('--animation-duration', `${maxDuration}s`);
      document.documentElement.classList.add('start-animation');
    } catch (error: any) {
      console.error('Error accessing microphone:', error);
      handleReset();
      setRequireMicroPhone(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
      if (error?.name === 'NotAllowedError') {
        setMicrophoneError('Please allow microphone permission from your browser settings!');
      }
    }
  };

  const handleStopRecording = () => {
    console.log('mediaRecorderRef.current && isRecording', mediaRecorderRef.current, isRecording);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Check if recording duration is less than the minimum duration
      if (totalSecondsRef.current < minDuration) {
        handleReset();
      }
    }
    stopTimer();
  };

  const handlePlay = () => {
    const audio = document.getElementById('recorder-audio') as HTMLAudioElement;

    if (audioURL && audio) {
      if (audio.src !== audioURL) {
        // this supports mobile version of safari
        if (Helper.isChrome()) {
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

        playbackRef.current = window.setInterval(() => {
          setCurrentAudioValue((prevValue) => {
            return prevValue - 1;
          });
        }, 1000);

        audio.onerror = () => {
          handleReset();
        };

        audio.onended = () => {
          stopPlayback();
          setIsPlaying(false);
          setCurrentAudioValue(0);
        };
      } else {
        audio.pause();
        setIsPlaying(false);
        stopPlayback();
      }
    }
  };

  const handleReset = async () => {
    setVoiceDetails(null);

    const audio = document.getElementById('recorder-audio') as HTMLAudioElement;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
    }
    const updateData: Record<string, any> = {};
    updateData[voiceUrlKey] = '';
    await handleUpdate(updateData, uid);
    setIsRecording(false);
    setAudioURL(undefined);
    setTotalSeconds(0);
    setFinalDuration(null);
    setCurrentAudioValue(0);
    setIsPlaying(false);

    stopTimer();
    stopPlayback();

    chunksRef.current = [];
  };

  return {
    requireMicroPhone,
    totalSecondsRef,
    isRecording,
    handleStopRecording,
    handleStartRecording,
    setIsRecording,
    isPlaying,
    handlePlay,
    totalSeconds,
    currentAudioValue,
    handleReset,
    microphoneError,
    handleClose,
  };
}
