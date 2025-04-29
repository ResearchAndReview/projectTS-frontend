import { useMemo, useState } from 'react';
import { Message, Rect, Task } from '@/types';
import { DragController, TranslationOverlay } from '../components';
import { useEscape, useMessageRouter, useSessionId, useTaskSync } from '../hooks';
import { afterPaint } from '../utils';
import { createMessageHandlers } from './message-handler';
import { DragState } from './types';

export const Main = () => {
  const [state, setState] = useState<DragState>('IDLE');
  const [tasks, setTasks] = useState<Task[]>([]);
  const sessionId = useSessionId();

  const messageHandlers = useMemo(
    () => createMessageHandlers(setState, setTasks, sessionId),
    [sessionId],
  );

  useTaskSync(sessionId);
  useMessageRouter(messageHandlers);
  useEscape(() => setState('IDLE'), state === 'DRAG');

  const handleComplete = (rect: Rect) => {
    setState('IDLE'); // TODO: add some other state to prevent spamming

    afterPaint(() => {
      chrome.runtime.sendMessage({
        type: 'CAPTURE_SCREENSHOT',
        payload: { rect, sessionId },
      } as Message);
    });
  };

  return (
    <>
      <TranslationOverlay tasks={tasks} />
      {state === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
