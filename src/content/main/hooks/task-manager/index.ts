import { useCallback, useEffect, useRef, useState } from 'react';
import { Rect, Task } from '@/types';
import { afterPaint, createTask, pollTask, requestScreenshot } from './utils';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
        const { status, captions /*, reason*/ } = await pollTask(taskId);

        if (status === 'pending') {
          // Do nothing while the task is still pending.
          return;
        }

        switch (status) {
          case 'success':
            // Update task with captions on success.
            setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status, captions } : t)));
            break;
          case 'error':
            // Mark the task as errored.
            setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
            break;
          default:
            break;
        }

        // Stop polling once the task is no longer pending.
        stopPolling(taskId);
      }, 2000);

      pollingRefs.current[taskId] = interval;
    },
    [stopPolling],
  );

  /**
   * Creates a new task by capturing a screenshot,
   * cropping the image, and submitting it to the API.
   * Automatically starts polling after creation.
   */
  const requestTask = useCallback(
    async (rect: Rect) => {
      afterPaint(async () => {
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
      });
    },
    [startPolling],
  );

  // Cleanup polling intervals when unmounting.
  useEffect(() => {
    return () => {
      Object.values(pollingRefs.current).forEach(clearInterval);
      pollingRefs.current = {};
    };
  }, []);

  return {
    tasks,
    requestTask,
  };
};
