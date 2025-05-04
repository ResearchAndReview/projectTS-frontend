import { Message } from '@/types';
import { handleContentMessages, registerPopupPortHandler } from './handlers';

// Event handling functions

type OnContextMenuClicked = (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => void;
type OnRuntimeMessage = Parameters<typeof chrome.runtime.onMessage.addListener>[0];

const onRuntimeMessage: OnRuntimeMessage = (msg: Message, sender, sendResponse) => {
  if (handleContentMessages(msg, sender, sendResponse)) return true;
  console.warn(`unhandled message ${msg}`);

  return true;
};

const onContextMenuClicked: OnContextMenuClicked = (info, tab) => {
  if (info.menuItemId === 'enter-drag-mode' && tab?.id !== undefined) {
    chrome.tabs.sendMessage(tab.id, { type: 'ENTER_DRAG_MODE' });
  }
};

// Function to register event handlers

export const registerMessageListeners = () => {
  chrome.runtime.onMessage.removeListener(onRuntimeMessage);
  chrome.runtime.onMessage.addListener(onRuntimeMessage);

  chrome.contextMenus.onClicked.removeListener(onContextMenuClicked);
  chrome.contextMenus.onClicked.addListener(onContextMenuClicked);

  registerPopupPortHandler();
};
