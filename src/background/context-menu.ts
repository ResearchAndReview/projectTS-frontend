const enterDragMode: chrome.contextMenus.CreateProperties = {
  id: 'enter-drag-mode',
  title: '영역 선택 시작',
  type: 'normal',
  contexts: ['all'],
};

export const registerContextMenu = () => {
  chrome.contextMenus.removeAll(() =>
    chrome.contextMenus.create(enterDragMode)
  );
};
