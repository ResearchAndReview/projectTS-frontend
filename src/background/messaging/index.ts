import { Message } from '@/types';
import { captureVisibleTab } from '@back/logic/capture';
import { handleTaskMessages } from '../tasks';
import { OnContextMenuClicked, OnRuntimeMessage } from './types';

const onRuntimeMessage: OnRuntimeMessage = (msg: Message, sender) => {
  if (handleTaskMessages(msg, sender)) return;

  switch (msg.type) {
    case 'CAPTURE_SCREENSHOT': {
      captureVisibleTab(msg.payload.rect);
      break;
    }
    default:
      console.warn('Unhandled message:', msg);
  }
};

const onContextMenuClicked: OnContextMenuClicked = (info, tab) => {
  if (info.menuItemId === 'enter-drag-mode' && tab?.id !== undefined) {
    chrome.tabs.sendMessage(tab.id, { type: 'ENTER_DRAG_MODE' } as Message);
  }
};

export const registerMessageListeners = () => {
  chrome.runtime.onMessage.removeListener(onRuntimeMessage);
  chrome.runtime.onMessage.addListener(onRuntimeMessage);

  chrome.contextMenus.onClicked.removeListener(onContextMenuClicked);
  chrome.contextMenus.onClicked.addListener(onContextMenuClicked);
};
