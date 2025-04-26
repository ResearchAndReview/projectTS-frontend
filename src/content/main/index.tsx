import React from 'react';
import { Message, Rect, Task } from '@/types';
import { DragController } from '@content/components/drag-controller';
import { afterPaint } from '@content/utils';
import { TranslationOverlay } from '../components/overlay';
import { useEscape, useMessageRouter } from '../hooks';
import { useTaskSync } from '../hooks/task-sync';
import { DragState } from './types';
import { createMessageHandlers } from './utils';

export const Main = () => {
  const [state, setState] = React.useState<DragState>('IDLE');
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [sessionId] = React.useState<string>(crypto.randomUUID());

  const messageHandlers = createMessageHandlers(setState, setTasks, sessionId);

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
