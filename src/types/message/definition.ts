import { Rect } from '../geometry';
import { RecoveryPayload, Task, TaskPollResponse } from '../task';

export interface MessageMap {
  ENTER_DRAG_MODE: {
    payload: undefined;
    response: undefined;
    meta: { from: 'background'; to: 'content' };
  };
  CAPTURE_SCREENSHOT: {
    payload: { rect: Rect };
    response: { screenshot: string; zoom: number };
    meta: { from: 'content'; to: 'background' };
  };
  CREATE_TASK: {
    payload: { image: Task['image'] };
    response: { taskId: string };
    meta: { from: 'content'; to: 'background' };
  };
  POLL_TASK: {
    payload: { taskId: string };
    response: TaskPollResponse;
    meta: { from: 'content'; to: 'background' };
  };
  REQUEST_TASKS: {
    payload: undefined;
    response: { tasks: Task[] };
    meta: { from: 'popup'; to: 'content' };
  };
  RECOVER_TASK: {
    payload: {
      data: RecoveryPayload;
    };
    response: { message: string };
    meta: { from: 'content'; to: 'background' };
  };
}
