import { TaskPollResponse } from '@/types';
import { sendRuntimeMessage } from '@/utils/message';

export const createTask = async (image: Blob): Promise<string> => {
  const res = await sendRuntimeMessage({
    type: 'CREATE_TASK',
    payload: { image },
  });

  return res.taskId;
};

export const pollTask = async (taskId: string): Promise<TaskPollResponse> => {
  const res = await sendRuntimeMessage({
    type: 'POLL_TASK',
    payload: { taskId },
  });

  return res;
};
