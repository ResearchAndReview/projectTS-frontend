import { useMemo, useState } from 'react';
import { Rect } from '@/types';
import { useTaskManager } from '../task-manager';
import { DragController, TranslationOverlay } from './components';
import { useEscape, useMessageRouter } from './hooks';
import { createMessageHandlers } from './message-handler';
import { DragState } from './types';

export const Main = () => {
  const [state, setState] = useState<DragState>('IDLE');
  const { tasks, requestTask } = useTaskManager();
  // const sessionId = useSessionId();

  const messageHandlers = useMemo(() => createMessageHandlers(setState), []);

  useMessageRouter(messageHandlers);
  useEscape(() => setState('IDLE'), state === 'DRAG');

  const handleComplete = (rect: Rect) => {
    setState('IDLE');
    requestTask(rect);
  };

  return (
    <>
      <TranslationOverlay tasks={tasks} />
      {state === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
