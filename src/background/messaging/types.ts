export type OnContextMenuClicked = (
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
) => void;

export type OnRuntimeMessage = Parameters<typeof chrome.runtime.onMessage.addListener>[0];
