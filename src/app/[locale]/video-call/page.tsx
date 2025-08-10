
"use client";
import React from 'react';
import VideoCall from '@/components/molecules/VideoCall';
import { useSearchParams } from 'next/navigation';

const VideoCallPage: React.FC = () => {
  const searchParams = useSearchParams();
  const roomID = searchParams.get('roomID') || 'test-room'; // Default room ID
  const userID = searchParams.get('userID') || `user_${Math.floor(Math.random() * 10000)}`; // Default user ID
  const userName = searchParams.get('userName') || `User ${userID.split('_')[1]}`; // Default user name

  return (
    <VideoCall roomID={roomID} userID={userID} userName={userName} />
  );
};

export default VideoCallPage;


