import { useEffect } from 'react';
import { ExtractPayload, MessageHandlerMapFor, MessageTo } from '@/types/message';

export const useMessageRouter = (handlers: MessageHandlerMapFor<'content'>) => {
  useEffect(() => {
    const listener = (msg: MessageTo<'content'>) => {
      const handler = handlers[msg.type];

      if (!handler) return;

      type T = typeof msg.type;
      type Payload = ExtractPayload<T>;

      if (msg.payload !== undefined) {
        (handler as (payload: Payload) => void)(msg.payload);
      } else {
        (handler as () => void)();
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [handlers]);
};
