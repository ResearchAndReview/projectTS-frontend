import { Message, Rect } from '@/types';

export const captureVisibleTab = (rect: Rect) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab.id || !tab.windowId) return;

    chrome.tabs.captureVisibleTab(
      tab.windowId,
      { format: 'png' },
      (dataUrl) => {
        if (!dataUrl) return;

        chrome.tabs.sendMessage(tab.id!, {
          type: 'SCREENSHOT_DATA',
          payload: { rect, dataUrl },
        } as Message);
      }
    );
  });
};
