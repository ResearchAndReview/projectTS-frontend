import { api } from '@/lib/api';
import { ENVIRONMENT } from '@/lib/utils';
import { Message, RecoveryPayload, Task } from '@/types';
import { TaskPollResponse } from '@/types/task/server';
import { DevCreateResponse, DevPollResponse, retryTaskMapper, taskResultsMapper } from './utils';

type SendResponse = Parameters<Parameters<typeof chrome.runtime.onMessage.addListener>[0]>[2];

// Handling logics

const captureScreenshot = async (windowId: number, tabId: number, sendResponse: SendResponse) => {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
    const zoom = await new Promise<number>((resolve) => {
      chrome.tabs.getZoom(tabId, (zoom) => {
        resolve(zoom * 100);
      });
    });

    sendResponse({ success: true, data: { screenshot: dataUrl, zoom } });
  } catch (error) {
    console.error('[captureScreenshot] error:', error);
    sendResponse({ success: false, error: String(error) });
  }
};

const createTask = async (image: Task['image'], sendResponse: SendResponse) => {
  if (ENVIRONMENT === 'dev') {
    sendResponse(DevCreateResponse);
    return;
  }

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

    sendResponse({ success: true, data: { taskId: createdTaskId } });
  } catch (error) {
    console.error('[createTask] error:', error);
    sendResponse({ success: false, error: String(error) });
  }
};

const pollTask = async (taskId: string, sendResponse: SendResponse) => {
  if (ENVIRONMENT === 'dev') {
    sendResponse(DevPollResponse);
    return;
  }

  try {
    const result = await api<TaskPollResponse>({
      method: 'get',
      url: 'task/status',
      options: { searchParams: { taskId } },
    });

    if (result.status === 'pending' || result.status === 'success') {
      const { status, taskResults } = result as TaskPollResponse<'pending' | 'success'>;

      sendResponse({
        success: true,
        data: { status, captions: taskResults.map(taskResultsMapper), reason: undefined },
      });

      return;
    }

    if (result.status === 'failed') {
      const { task } = result as TaskPollResponse<'failed'>;

      sendResponse({
        success: true,
        data: { status: 'error', captions: [], reason: task.failCause },
      });

      return;
    }

    throw new Error(`Unexpected status: ${result.status}`);
  } catch (error) {
    console.error('[pollTask] error', error);
    sendResponse({ success: false, error: String(error) });
  }
};

const retryTask = async (data: RecoveryPayload, sendResponse: SendResponse) => {
  if (ENVIRONMENT === 'dev') {
    sendResponse({ success: true, data: { message: JSON.stringify(data) } });
    return;
  }

  try {
    const { message } = await api<{ message: string }>({
      method: 'post',
      url: 'task/recovery-list',
      options: { json: data.map(retryTaskMapper) },
    });

    sendResponse({ success: true, data: { message } });
  } catch (error) {
    console.error('[retryTranslation] error:', error);
    sendResponse({ success: false, error: String(error) });
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

    case 'RETRY_TASK': {
      retryTask(payload.data, sendResponse);
      return true;
    }

    default:
      return false;
  }
};
