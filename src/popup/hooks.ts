import { useEffect, useState } from 'react';
import { sendTabMessage } from '@/lib/utils';
import { Task } from '@/types';

export const useTasksFromAllTabs = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Fetches tasks from all active tabs by sending a REQUEST_TASKS message
   * to each tab that has a content script loaded.
   */
  const fetchTasks = async () => {
    const tabs = await chrome.tabs.query({});
    const allTasks: Task[] = [];

    await Promise.all(
      tabs.map(async (tab) => {
        if (!tab.id) return;

        try {
          const res = await sendTabMessage(tab.id, {
            type: 'REQUEST_TASKS',
            payload: undefined,
          });

          allTasks.push(...res.tasks);
        } catch {
          // ignore
        }
      }),
    );

    setTasks(allTasks);
  };

  /** Fetch tasks immediately when the hook is mounted. */
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    refetch: fetchTasks,
  };
};
