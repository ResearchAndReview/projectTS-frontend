import React from 'react';
import { MessageMap } from '@/types';

export const useTaskSync = (sessionId: string) => {
  React.useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'REQUEST_TASKS',
      payload: { sessionId } as MessageMap['REQUEST_TASKS']['payload'],
    });
  }, [sessionId]);
};
