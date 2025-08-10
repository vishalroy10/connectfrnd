import { useContext } from 'react';

import ChatContext from './ChatContext';

export enum conversationType {
  normal,
  deleted,
}

const useChatHook = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('context must be use inside provider');
  return context;
};

export default useChatHook;
