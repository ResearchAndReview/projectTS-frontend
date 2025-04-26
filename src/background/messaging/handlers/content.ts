import { addTask, getTasks, processTask } from '@/background/tasks';
import { ExtractPayload, Message, Rect, Task } from '@/types';

// Handling logics

const captureScreenshot = (rect: Rect) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab.id || !tab.windowId) return;

    chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, (dataUrl) => {
      if (!dataUrl) return;

      chrome.tabs.sendMessage(tab.id!, {
        type: 'SCREENSHOT_DATA',
        payload: { rect, dataUrl },
      } as Message);
    });
  });
};

const submitTask = ({
  payload: { rect, image, sessionId },
  url,
  tabId,
}: {
  payload: ExtractPayload<'SUBMIT_TASK'>;
  url: string;
  tabId: number;
}) => {
  const task: Task = {
    id: crypto.randomUUID(),
    context: { sessionId, url },
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
};

const requestTasks = ({
  payload: { sessionId },
  tabId,
}: {
  payload: ExtractPayload<'REQUEST_TASKS'>;
  tabId: number;
}) => {
  chrome.tabs.sendMessage(tabId, {
    type: 'TASKS_SYNC',
    payload: getTasks(sessionId),
  });
};

// Content message handler (call appropriate logic for each message)

export const handleContentMessages = (
  msg: Message,
  sender: chrome.runtime.MessageSender,
): boolean => {
  const tabId = sender.tab?.id;
  const url = sender.url;

  if (tabId === undefined || !url) {
    console.warn('[handleTaskMessages] missing tabId or url', sender);
    return false;
  }

  switch (msg.type) {
    case 'CAPTURE_SCREENSHOT':
      captureScreenshot(msg.payload.rect);
      return true;

    case 'SUBMIT_TASK':
      submitTask({ payload: msg.payload, url, tabId });
      return true;

    case 'REQUEST_TASKS': {
      requestTasks({ payload: msg.payload, tabId });
      return true;
    }

    default:
      return false;
  }
};
