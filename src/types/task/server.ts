type TaskStatus = 'success' | 'failed' | 'pending';

interface TaskDescription<S extends TaskStatus> {
  id: number;
  status: S;
  failCause: S extends 'failed' ? string : null;
  createdAt: string;
  updatedAt: string;
  translateFrom: string;
  translateTo: string;
}

type TaskResult<S extends TaskStatus> = {
  ocrResultId: number;
  transResultId: number;
  x: number;
  y: number;
  width: number;
  height: number;
  originalText: string;
  translatedText: S extends 'success' ? string : string | null;
  translateFrom: string;
  translateTo: string;
};

export interface TaskPollResponse<S extends TaskStatus = 'success' | 'pending' | 'failed'> {
  status: S;
  taskResults: TaskResult<S>[];
  task: TaskDescription<S>;
  message: string;
  timestamp: string;
  elapsedTime: number;
}
