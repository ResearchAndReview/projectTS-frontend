import { Task } from '@/types/task';
import { updateTask } from './storage';

export const processTask = async (tabId: number, task: Task) => {
  if (!task.image) return;

  const response = await fetchTaskStatus();

  if (response.status === 'SUCCESS') {
    const updated: Task = {
      ...task,
      status: 'success',
      captions: getCaptions(response),
    };
    updateTask(updated);
    chrome.tabs.sendMessage(tabId, {
      type: 'TASK_UPDATED',
      payload: updated,
    });
  } else {
    updateTask({ ...task, status: 'error' });
  }
};

async function fetchTaskStatus(taskId = 1, uuid = 'TEST01') {
  const url = 'https://js.thxx.xyz/task/status?' + new URLSearchParams({ taskId: String(taskId) });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-uuid': uuid,
    },
  });

  const data = await response.json();

  return data;
}

export const getCaptions = (apiData: ApiResponse): Task['captions'] => {
  const { taskResults } = apiData.resultData;

  return taskResults.map((result: TaskResult) => ({
    id: String(result.transResultId),
    rect: {
      x: result.x,
      y: result.y,
      width: result.width,
      height: result.height,
    },
    text: result.originalText,
    translation: result.translatedText,
  }));
};

export interface ApiResponse {
  resultData: ResultData;
  message: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAIL' | string;
  elapsedTime: number;
}

export interface ResultData {
  image: Image;
  task: TaskInfo;
  taskResults: TaskResult[];
}

export interface Image {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string | null;
  createdAt: string;
  taskId: number;
}

export interface TaskInfo {
  id: number;
  workingNodeId: string;
  ownerNodeId: string;
  status: 'SUCCESS' | 'FAIL' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  failCause: string | null;
  translateFrom: string;
  translateTo: string;
}

export interface TaskResult {
  ocrResultId: number;
  transResultId: number;
  x: number;
  y: number;
  width: number;
  height: number;
  originalText: string;
  translatedText: string;
  translateFrom: string;
  translateTo: string;
}
