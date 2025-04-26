// features/tasks/service.ts
import { fetchDummy } from '@/dummy-api';
import { Task } from '@/types/task';
import { updateTask } from './storage';

export const processTask = async (tabId: number, task: Task) => {
  if (!task.image) return;

  const { sessionId } = task.context;
  const response = await fetchDummy(task.image);

  if (response.status === 'success') {
    const updated: Task = {
      ...task,
      status: 'success',
      captions: response.captions,
    };
    updateTask(sessionId, updated);
    chrome.tabs.sendMessage(tabId, {
      type: 'TASK_UPDATED',
      payload: updated,
    });
  } else {
    updateTask(sessionId, { ...task, status: 'error' });
  }
};
