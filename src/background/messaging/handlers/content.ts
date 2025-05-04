import { Message } from '@/types';

type SendResponse = Parameters<Parameters<typeof chrome.runtime.onMessage.addListener>[0]>[2];

// Handling logics

const captureScreenshot = async (windowId: number, sendResponse: SendResponse) => {
  const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
  sendResponse({ screenshot: dataUrl });
};

const createTask = async (image: Blob, sendResponse: SendResponse) => {
  console.log('CREATE_TASK received', image);

  sendResponse({ taskId: 'hardcoded-id-for-test' });
};

const pollTask = async (taskId: string, sendResponse: SendResponse) => {
  console.log('POLL_TASK received', taskId);

  sendResponse({
    captions: [
      {
        id: '1',
        rect: { x: 16, y: 16, width: 32, height: 64 },
        text: '筆坊は寒い日も布団に入ってはくれぬ。',
        translation: '후데보는 추운 날에도 이불에 들어와 주지 않는다.',
      },
    ],
  });
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
      captureScreenshot(sender.tab.windowId, sendResponse);
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
