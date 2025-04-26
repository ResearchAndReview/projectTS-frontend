import { Rect } from './geometry';

export type TaskStatus = 'pending' | 'success' | 'error';

export interface Caption {
  id: string;
  rect: Rect;
  text: string;
  translation: string;
}

export interface Task {
  id: string;
  context: { sessionId: string; url: string };
  status: TaskStatus;
  image: string;
  rect: Rect;
  captions: Caption[];
}
