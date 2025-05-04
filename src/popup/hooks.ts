import { useEffect, useRef, useState } from 'react';
import { MessageTo } from '@/types';
import { Task } from '@/types/task';

export const useTasks = () => {
  const [tasks /*, setTasks*/] = useState<Task[]>([]);
  const portRef = useRef<chrome.runtime.Port | null>(null);

  useEffect(() => {
    if (!portRef.current) portRef.current = chrome.runtime.connect({ name: 'popup' });

    const port = portRef.current;

    const handleMessage = (msg: MessageTo<'popup'> | { type: 'READY' }) => {
      console.log('popup', msg);

      switch (msg.type) {
        case 'READY':
          port.postMessage({ type: 'GET_ALL_TASKS' });
          return;
        // case 'GET_ALL_TASKS_RESPONSE':
        //   setTasks(msg.payload.reverse());
        //   return;
        default:
          console.warn(`invalid message: ${msg}`);
          return;
      }
    };

    port.onMessage.addListener(handleMessage);

    return () => {
      port.onMessage.removeListener(handleMessage);
      port.disconnect();
      portRef.current = null;
    };
  }, []);

  return { tasks };
};
