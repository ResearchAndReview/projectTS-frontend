import { MessageHandlerMapFor } from '@/types';
import { DragState } from './types';

export const createMessageHandlers = (
  setState: React.Dispatch<React.SetStateAction<DragState>>,
): MessageHandlerMapFor<'content'> => {
  return {
    ENTER_DRAG_MODE: () => setState('DRAG'),
  };
};
