import { getTasks } from '@/background/tasks/storage';
import { Message } from '@/types';

export const handlePopupMessages = (
  msg: Message,
  sendResponse: (response?: unknown) => void,
): boolean => {
  switch (msg.type) {
    case 'GET_ALL_TASKS': {
      sendResponse(getTasks());
      return true;
    }
    default:
      return false;
  }
};
