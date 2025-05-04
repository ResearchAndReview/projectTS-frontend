import { Rect, TaskPollResponse } from '@/types';
import { sendRuntimeMessage } from '@/utils/message';
import { cropImage } from './utils';

/**
 * Submits the cropped image and returns the created task ID.
 */
export const createTask = async (image: Blob) => {
  const { taskId } = await sendRuntimeMessage({
    type: 'CREATE_TASK',
    payload: { image },
  });

  return taskId;
};

/**
 * Poll a task specified by the taskId.
 */
export const pollTask = async (taskId: string): Promise<TaskPollResponse> => {
  const response = await sendRuntimeMessage({
    type: 'POLL_TASK',
    payload: { taskId },
  });

  return response;
};

/**
 * Requests a screenshot and crops it to the specified rect.
 */
export const requestScreenshot = async (rect: Rect) => {
  const { screenshot } = await sendRuntimeMessage({
    type: 'CAPTURE_SCREENSHOT',
    payload: { rect },
  });

  const image = await cropImage(screenshot, rect);
  return image;
};
