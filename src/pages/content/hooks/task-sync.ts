import React from 'react';
import { ExtractPayload } from '@/types';

export const useTaskSync = (sessionId: string) => {
  React.useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'REQUEST_TASKS',
      payload: { sessionId } as ExtractPayload<'REQUEST_TASKS'>,
    });
  }, [sessionId]);
};
