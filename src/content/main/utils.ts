import { MessageHandlerMapFor } from '@/types';
import { Task } from '@/types/task';
import { cropImage } from '../utils';
import { DragState } from './types';

export const createMessageHandlers = (
  setState: React.Dispatch<React.SetStateAction<DragState>>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  sessionId: string,
): MessageHandlerMapFor<'content'> => {
  return {
    ENTER_DRAG_MODE: () => {
      setState('DRAG');
    },

    SCREENSHOT_DATA: async ({ rect, dataUrl }) => {
      const cropped = await cropImage(dataUrl, rect);

      chrome.runtime.sendMessage({
        type: 'SUBMIT_TASK',
        payload: { rect, image: cropped, sessionId },
      });
    },

    TASK_CREATED: (task) => {
      setTasks((prev) => [...prev, task]);
    },

    TASK_UPDATED: (updatedTask) => {
      setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    },

    TASKS_SYNC: (tasks) => {
      setTasks(tasks);
    },
  };
};
