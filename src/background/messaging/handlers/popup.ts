import { getTasks } from '@/background/tasks/storage';
import { MessageTo } from '@/types';

// Prevent multiple registration of the port handler
let connected = false;

export const registerPopupPortHandler = () => {
  // Skip if already registered
  if (connected) return;
  connected = true;

  // Listen for incoming connections from popup
  chrome.runtime.onConnect.addListener((port) => {
    // Only handle connections explicitly named "popup"
    if (port.name !== 'popup') {
      console.warn(`Message from unknown port: ${port.name}`);
      return;
    }

    // Notify the popup that the background is ready to receive messages
    port.postMessage({ type: 'READY' });

    // Define a message handler for messages received through the port
    const handler = async (msg: MessageTo<'background'>) => {
      switch (msg.type) {
        case 'GET_ALL_TASKS':
          port.postMessage({
            type: 'GET_ALL_TASKS_RESPONSE',
            payload: await getTasks(),
          });
          return;
        default:
          return;
      }
    };

    // Attach the message handler to the port
    port.onMessage.addListener(handler);
  });
};
