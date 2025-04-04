import { Rect } from './types';

export type MessageType =
  | 'ENTER_DRAG_MODE'
  | 'CAPTURE_SCREENSHOT'
  | 'SCREENSHOT_DATA';

export interface MessageMap {
  ENTER_DRAG_MODE: undefined;
  CAPTURE_SCREENSHOT: { rect: Rect };
  SCREENSHOT_DATA: { rect: Rect; dataUrl: string };
}

export type Message = {
  [K in keyof MessageMap]: {
    type: K;
    payload: MessageMap[K];
  };
}[keyof MessageMap];
