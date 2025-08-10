/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { memo } from 'react';
import { ChatProvider } from './ChatContext';
import ChatDialog from './Chat';

interface IChat {
  onDrawerClose?: () => void;
}

const Chat = ({ onDrawerClose }: IChat) => {
  return (
    <ChatProvider>
      <ChatDialog onDrawerClose={onDrawerClose} />
    </ChatProvider>
  );
};

export default memo(Chat);
