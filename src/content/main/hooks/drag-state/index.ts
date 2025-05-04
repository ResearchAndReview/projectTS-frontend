import { useEffect, useState } from 'react';
import { MessageTo } from '@/types';
import { DragState } from './types';

/**
 * Custom hook to manage the drag state.
 *
 * - Listens for ENTER_DRAG_MODE messages from the background script to trigger drag mode.
 * - Provides the current drag state and a setter.
 * - Automatically exits drag mode when the Escape key is pressed.
 */
export const useDragState = () => {
  const [dragState, setDragState] = useState<DragState>('IDLE');

  useEffect(() => {
    const listener = (msg: MessageTo<'content'>) => {
      if (msg.type === 'ENTER_DRAG_MODE') {
        setDragState('DRAG');
      }
    };

    // Register the message listener to react to background events.
    chrome.runtime.onMessage.addListener(listener);

    // Cleanup on unmount.
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  // Automatically exit drag mode when Escape is pressed.
  useEscape(() => setDragState('IDLE'), dragState === 'DRAG');

  return { dragState, setDragState };
};

/**
 * Hook to bind Escape key handling.
 *
 * When `enabled` is true, this hook listens for the Escape key
 * and calls the provided callback when it's pressed.
 *
 * @param callback - Function to execute when Escape is pressed.
 * @param enabled - Whether to enable the Escape key listener (default: true).
 */
const useEscape = (callback: () => void, enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [callback, enabled]);
};
