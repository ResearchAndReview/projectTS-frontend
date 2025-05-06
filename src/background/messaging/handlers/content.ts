import { api } from '@/lib/api';
import { Message, Task, TaskPollResponse } from '@/types';

type SendResponse = Parameters<Parameters<typeof chrome.runtime.onMessage.addListener>[0]>[2];

// Handling logics

const captureScreenshot = async (windowId: number, tabId: number, sendResponse: SendResponse) => {
  const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
  const zoom = await new Promise<number>((resolve) => {
    chrome.tabs.getZoom(tabId, (zoom) => {
      resolve(zoom * 100);
    });
  });

  sendResponse({ screenshot: dataUrl, zoom });
};

const createTask = async (image: Task['image'], sendResponse: SendResponse) => {
  try {
    // Convert DataURL to Blob
    const blob = await (await fetch(image)).blob();

    // Build the multipart form data
    const formData = new FormData();
    formData.append('request', JSON.stringify({ translateFrom: 'ja-JP', translateTo: 'ko-KR' }));
    formData.append('file', blob);

    // Make the API request
    const { createdTaskId } = await api<{ createdTaskId: string }>({
      method: 'post',
      url: 'task/create',
      options: {
        body: formData,
      },
      body: 'json',
    });

    sendResponse({ taskId: createdTaskId });
  } catch (err) {
    console.error('[createTask] Failed to create task:', err);
    sendResponse({ taskId: null });
  }
};

type TempTaskPollResponse = {
  status: 'success' | 'pending' | 'failed';
  taskResults: {
    ocrResultId: number;
    x: number;
    y: number;
    width: number;
    height: number;
    originalText: string;
    translatedText: string;
  }[];
};

const pollTask = async (taskId: string, sendResponse: SendResponse) => {
  try {
    const result = await api<TempTaskPollResponse>({
      method: 'get',
      url: 'task/status',
      options: {
        searchParams: { taskId },
      },
    });

    if (result.status === 'success') {
      const newResult: TaskPollResponse = {
        status: 'success',
        captions: result.taskResults.map((i) => ({
          id: crypto.randomUUID(),
          rect: { x: i.x, y: i.y, width: i.width, height: i.height },
          text: i.originalText,
          translation: i.translatedText,
        })),
        reason: undefined,
      };

      sendResponse(newResult);
    }

    if (result.status === 'pending') {
      sendResponse({ status: 'pending', reason: undefined, captions: undefined });
    }

    if (result.status === 'failed') {
      sendResponse({ status: 'error', reason: '', captions: undefined });
    }
  } catch (err) {
    console.error('[pollTask] Failed to poll task:', err);
    sendResponse({ status: 'error', reason: 'Failed to fetch task status' });
  }
};

// Content message handler (call appropriate logic for each message)

export const handleContentMessages = (
  msg: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: SendResponse,
): boolean => {
  if (!sender.tab || !sender.tab.id || !sender.url) {
    console.warn('[handleContentMessages] missing tabId or url', sender);
    return false;
  }

  const { type, payload } = msg;

  switch (type) {
    case 'CAPTURE_SCREENSHOT':
      captureScreenshot(sender.tab.windowId, sender.tab.id, sendResponse);
      return true;

    case 'CREATE_TASK':
      createTask(payload.image, sendResponse);
      return true;

    case 'POLL_TASK': {
      pollTask(payload.taskId, sendResponse);
      return true;
    }

    default:
      return false;
  }
};
