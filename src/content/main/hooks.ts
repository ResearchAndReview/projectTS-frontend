import { useEffect, useState } from 'react';
import { ExtractPayload } from '@/types';
import { MessageHandlerMapFor, MessageTo } from '@/types/message';

export const useEscape = (callback: () => void, enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callback, enabled]);
};

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

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>(crypto.randomUUID());

  useEffect(() => {
    let previousUrl = location.href;

    const observer = new MutationObserver(() => {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        setSessionId(crypto.randomUUID());
      }
    });

    observer.observe(document, { subtree: true, childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return sessionId;
};
