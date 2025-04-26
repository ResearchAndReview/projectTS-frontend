import { Rect } from '../geometry';
import { Task } from '../task';

export interface MessageMap {
  ENTER_DRAG_MODE: {
    payload: undefined;
    meta: { from: 'background'; to: 'content' };
  };
  CAPTURE_SCREENSHOT: {
    payload: { rect: Rect };
    meta: { from: 'content'; to: 'background' };
  };
  SCREENSHOT_DATA: {
    payload: { rect: Rect; dataUrl: string };
    meta: { from: 'background'; to: 'content' };
  };
  SUBMIT_TASK: {
    payload: { rect: Rect; image: string; sessionId: string };
    meta: { from: 'content'; to: 'background' };
  };
  TASK_CREATED: {
    payload: Task;
    meta: { from: 'background'; to: 'content' };
  };
  TASK_UPDATED: {
    payload: Task;
    meta: { from: 'background'; to: 'content' };
  };
  REQUEST_TASKS: {
    payload: { sessionId: string };
    meta: { from: 'content'; to: 'background' };
  };
  TASKS_SYNC: {
    payload: Task[];
    meta: { from: 'background'; to: 'content' };
  };
  GET_ALL_TASKS: {
    payload: undefined;
    meta: { from: 'popup'; to: 'background' };
  };
}
