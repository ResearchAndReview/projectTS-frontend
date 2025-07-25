import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MessageTo, RecoveryPayload, Rect, Task } from '@/types';
import { afterPaint, createTask, pollTask, recoverTask, requestScreenshot } from './utils';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { startPolling } = useTaskPolling(setTasks);

  /**
   * Creates a new task by capturing a screenshot,
   * cropping the image, and submitting it to the API.
   * Automatically starts polling after creation.
   */
  const requestTask = useCallback(
    async (rect: Rect) => {
      afterPaint(async () => {
        try {
          const image = await requestScreenshot(rect);
          const taskId = await createTask(image);

          const newTask: Task = {
            id: taskId,
            image,
            rect,
            status: 'pending',
            captions: [],
          };

          setTasks((prev) => [...prev, newTask]);
          startPolling(taskId);
        } catch (error) {
          console.error(error);
          toast.error('번역 요청에 실패했습니다.');
        }
      });
    },
    [startPolling],
  );

  /**
   * Request recovery on OCR failures.
   */
  const requestRecovery = useCallback(
    async (taskId: string, data: RecoveryPayload) => {
      try {
        await recoverTask(data);
        toast.success('재번역 요청을 전송했습니다.');
        startPolling(taskId);
      } catch (error) {
        console.error(error);
        toast.error('재번역 요청에 실패했습니다.');
      }
    },
    [startPolling],
  );

  useMessageHandler(tasks);

  return {
    tasks,
    requestTask,
    requestRecovery,
  };
};

const useMessageHandler = (tasks: Task[]) => {
  useEffect(() => {
    const listener = (
      msg: MessageTo<'content'>,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: { tasks: Task[] }) => void,
    ) => {
      if (msg.type === 'REQUEST_TASKS') {
        sendResponse({ tasks });
        return true;
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [tasks]);
};

const useTaskPolling = (
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  time: number = 1000,
) => {
  const pollingRefs = useRef<Record<string, NodeJS.Timeout>>({});

  /**
   * Stops polling for a specific task ID.
   */
  const stopPolling = useCallback((taskId: string) => {
    const interval = pollingRefs.current[taskId];
    if (interval) {
      clearInterval(interval);
      delete pollingRefs.current[taskId];
    }
  }, []);

  /**
   * Starts polling for a specific task ID.
   * If the task is already being polled, do nothing.
   */
  const startPolling = useCallback(
    (taskId: string) => {
      if (pollingRefs.current[taskId]) return;

      const interval = setInterval(async () => {
        if (!taskId) return;

        try {
          const { status, captions, reason } = await pollTask(taskId);

          if (status === 'error') {
            toast.error(`번역에 실패했습니다: ${reason}`);
            stopPolling(taskId);
            return;
          }

          setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status, captions } : t)));

          if (status === 'success') stopPolling(taskId);
        } catch (error) {
          console.error(error);
          toast.error(`번역에 실패했습니다: ${error}`);
          stopPolling(taskId);
        }
      }, time);

      pollingRefs.current[taskId] = interval;
    },
    [setTasks, stopPolling, time],
  );

  // Cleanup polling intervals when unmounting.
  useEffect(() => {
    return () => {
      Object.values(pollingRefs.current).forEach(clearInterval);
      pollingRefs.current = {};
    };
  }, []);

  return { startPolling, stopPolling };
};
