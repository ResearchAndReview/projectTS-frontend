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
        rect: { x: 267, y: 75, width: 16, height: 30 },
        text: 'さび',
        translation: '사비',
      },
      {
        id: '3',
        rect: { x: 467, y: 47, width: 108, height: 174 },
        text: '筆坊は寒い日も布団に入ってはくれぬ。',
        translation: '후데보는 추운 날에도 이불에 들어와 주지 않는다.',
      },
      {
        id: '5',
        rect: { x: 498, y: 306, width: 56, height: 74 },
        text: '布団に\nしかも',
        translation: '이불에\n게다가',
      },
      {
        id: '6',
        rect: { x: 111, y: 497, width: 60, height: 142 },
        text: '祭壇みたいに\nされたりする',
        translation: '제단처럼\n되기도 한다',
      },
      {
        id: '7',
        rect: { x: 518, y: 506, width: 32, height: 148 },
        text: '各種並べられ',
        translation: '각종이 늘어놓이고',
      },
      {
        id: '8',
        rect: { x: 145, y: 71, width: 48, height: 110 },
        text: '結界',
        translation: '결계',
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
