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
  status: TaskStatus;
  image: Blob;
  rect: Rect;
  captions: Caption[];
}

export type TaskPollResponse =
  | { status: 'pending'; captions: undefined; reason: undefined }
  | { status: 'success'; captions: Caption[]; reason: undefined }
  | { status: 'error'; captions: undefined; reason: string };
