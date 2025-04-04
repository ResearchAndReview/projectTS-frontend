import React from 'react';
import { DragController } from './components/drag-controller';
import { Message, Rect } from '@/types';
import { cropImage, mockTranslate, afterPaint } from './utils';
import { DummyMessage } from './components/dummy-message';

type State = 'IDLE' | 'DRAG';

export const Main = () => {
  const [state, setState] = React.useState<State>('IDLE');
  const [tasks, setTasks] = React.useState<{ rect: Rect; text: string }[]>([]);

  React.useEffect(() => {
    const handler = (msg: Message) => {
      switch (msg.type) {
        case 'ENTER_DRAG_MODE': {
          setState('DRAG');
          break;
        }
        case 'SCREENSHOT_DATA': {
          const { rect, dataUrl } = msg.payload;

          cropImage(dataUrl, rect).then(async (cropped) => {
            const translated = await mockTranslate(cropped);
            setTasks((prev) => [...prev, { rect, text: translated }]);
          });
          break;
        }
      }
    };

    chrome.runtime.onMessage.addListener(handler);
    return () => chrome.runtime.onMessage.removeListener(handler);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state === 'DRAG') setState('IDLE');
      }
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state]);

  const handleComplete = (rect: Rect) => {
    setState('IDLE'); // TODO: add some other state to prevent spamming

    afterPaint(() => {
      chrome.runtime.sendMessage({
        type: 'CAPTURE_SCREENSHOT',
        payload: { rect },
      } as Message);
    });
  };

  return (
    <>
      {state === 'DRAG' && <DragController onComplete={handleComplete} />}
      <DummyMessage tasks={tasks.map((i) => i.text)} />
    </>
  );
};
