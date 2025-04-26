import { Message } from '@/types';
import { Task } from '@/types/task';
import { processTask } from './service';
import { addTask, getTasks } from './storage';

export const handleTaskMessages = (msg: Message, sender: chrome.runtime.MessageSender): boolean => {
  const tabId = sender.tab?.id;
  const url = sender.url;

  if (tabId === undefined || !url) {
    console.warn('[handleTaskMessages] missing tabId or url', sender);
    return false;
  }

  switch (msg.type) {
    case 'SUBMIT_TASK': {
      const { rect, image, sessionId } = msg.payload;
      const task: Task = {
        id: crypto.randomUUID(),
        context: {
          sessionId,
          url,
        },
        rect,
        image,
        status: 'pending',
        captions: [],
      };
      addTask(task);
      chrome.tabs.sendMessage(tabId, {
        type: 'TASK_CREATED',
        payload: task,
      });
      processTask(tabId, task);
      return true;
    }

    case 'REQUEST_TASKS': {
      const { sessionId } = msg.payload;
      const tasks = getTasks(sessionId);
      chrome.tabs.sendMessage(tabId, {
        type: 'TASKS_SYNC',
        payload: tasks,
      });
      return true;
    }

    default:
      return false;
  }
};
