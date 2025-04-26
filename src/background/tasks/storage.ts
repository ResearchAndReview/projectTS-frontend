import { Task } from '@/types/task';

const tasksByTab: Record<string, Task[]> = {};

export const initTaskStorage = () => {
  chrome.storage.local.get('tasksByTab', (res) => {
    if (res.tasksByTab) {
      Object.assign(tasksByTab, res.tasksByTab);
    }
  });
};

const saveTasksToStorage = () => {
  chrome.storage.local.set({ tasksByTab });
};

export const getTasks = (sessionId?: string): Task[] => {
  if (sessionId) return tasksByTab[sessionId] ?? [];
  return Object.values(tasksByTab).flat();
};

export const setTasks = (sessionId: string, tasks: Task[]) => {
  tasksByTab[sessionId] = tasks;
  saveTasksToStorage();
};

export const addTask = (task: Task) => {
  const { sessionId } = task.context;

  const tasks = getTasks(sessionId);
  setTasks(sessionId, [...tasks, task]);

  // console.log('[TASKS] All current tasks by tab:');
  // for (const [id, taskList] of Object.entries(tasksByTab)) {
  //   console.log(`🗂️ Tab ${id}: ${taskList.length} task(s)`);
  // }
  // console.log('===== =====');
};

export const updateTask = (sessionId: string, updated: Task) => {
  const tasks = getTasks(sessionId).map((t) => (t.id === updated.id ? updated : t));
  setTasks(sessionId, tasks);
};
