import { Task } from '@/types/task';
import { updateTask } from './storage';

export const processTask = async (tabId: number, task: Task) => {
  if (!task.image) return;

  // const response = await fetchTaskStatus();
  const response = dummyApi();
  const captions = response.captions;

  if (response.status === 'success') {
    const updated: Task = {
      ...task,
      status: 'success',
      captions,
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

const dummyApi = () => {
  return {
    status: 'success',
    captions: [
      {
        id: '1',
        rect: { x: 10, y: 20, width: 100, height: 30 },
        text: 'Hello',
        translation: '안녕하세요',
      },
      {
        id: '2',
        rect: { x: 120, y: 50, width: 80, height: 25 },
        text: 'World',
        translation: '세계',
      },
      {
        id: '3',
        rect: { x: 50, y: 100, width: 150, height: 40 },
        text: 'How are you?',
        translation: '어떻게 지내?',
      },
    ],
  };
};

/*

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

*/
