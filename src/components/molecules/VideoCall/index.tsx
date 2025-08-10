
"use client";
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoCallProps {
  roomID: string;
  userID: string;
  userName: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomID, userID, userName }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID || '0');
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET || '';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol + '//' + window.location.host + window.location.pathname +
              '?roomID=' + roomID,
          },
        ],
        scenario: { 
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls.
        },
        showScreenSharingButton: false,
      });
    };

    if (containerRef.current) {
      myMeeting(containerRef.current);
    }
  }, [roomID, userID, userName]);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    >
    </div>
  );
};

export default VideoCall;


