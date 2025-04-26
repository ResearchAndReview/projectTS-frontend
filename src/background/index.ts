import { registerContextMenu } from './context-menu';
import { registerMessageListeners } from './messaging';
import { initTaskStorage } from './tasks';

registerContextMenu();
registerMessageListeners();
initTaskStorage();
