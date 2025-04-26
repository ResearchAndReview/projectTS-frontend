import React from 'react';

export const useEscape = (callback: () => void, enabled: boolean = true) => {
  React.useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callback, enabled]);
};
