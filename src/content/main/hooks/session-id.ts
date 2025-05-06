import { useEffect, useState } from 'react';

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
