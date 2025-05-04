import { useMemo, useState } from 'react';
import { Rect, Task } from '@/types';
import { sendRuntimeMessage } from '@/utils/message';
import { DragController, TranslationOverlay } from './components';
import { useEscape, useMessageRouter } from './hooks';
import { createMessageHandlers } from './message-handler';
import { DragState } from './types';
import { afterPaint, cropImage } from './utils';

export const Main = () => {
  const [state, setState] = useState<DragState>('IDLE');
  const [tasks, setTasks] = useState<Task[]>([]);
  // const sessionId = useSessionId();

  const messageHandlers = useMemo(() => createMessageHandlers(setState), []);

  useMessageRouter(messageHandlers);
  useEscape(() => setState('IDLE'), state === 'DRAG');

  const handleComplete = (rect: Rect) => {
    setState('IDLE'); // TODO: add some other state to prevent spamming

    afterPaint(async () => {
      const { screenshot } = await sendRuntimeMessage({
        type: 'CAPTURE_SCREENSHOT',
        payload: { rect },
      });

      const image = await cropImage(screenshot, rect);

      const { taskId } = await sendRuntimeMessage({
        type: 'CREATE_TASK',
        payload: { image },
      });

      setTasks([...tasks, { id: taskId, status: 'pending', image, rect, captions: [] }]);
    });
  };

  return (
    <>
      <TranslationOverlay tasks={tasks} />
      {state === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
