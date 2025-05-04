import { Rect } from '../geometry';
import { TaskPollResponse } from '../task';

export interface MessageMap {
  ENTER_DRAG_MODE: {
    payload: undefined;
    response: undefined;
    meta: { from: 'background'; to: 'content' };
  };
  CAPTURE_SCREENSHOT: {
    payload: { rect: Rect };
    response: { screenshot: string };
    meta: { from: 'content'; to: 'background' };
  };
  CREATE_TASK: {
    payload: { image: Blob };
    response: { taskId: string };
    meta: { from: 'content'; to: 'background' };
  };
  POLL_TASK: {
    payload: { taskId: string };
    response: TaskPollResponse;
    meta: { from: 'content'; to: 'background' };
  };
}
