import { Task } from '@/types/task';

const tasks: Task[] = [];

export const initTaskStorage = () => {
  tasks.splice(0, tasks.length);
  chrome.storage.local.get('tasks', (res) => {
    if (res.tasks) tasks.concat(...res.tasks);
  });
};

const saveTasksToStorage = () => {
  chrome.storage.local.set({ tasks });
};

export const getTasks = (sessionId?: string): Task[] => {
  if (sessionId) return tasks.filter((i) => i.context.sessionId === sessionId);
  return tasks;
};

export const addTask = (task: Task) => {
  tasks.push(task);
  saveTasksToStorage();
};

export const updateTask = (updated: Task) => {
  const index = tasks.findIndex((i) => i.id === updated.id);

  if (index !== -1) tasks.splice(index, 1, updated);
  else tasks.push(updated);

  saveTasksToStorage();
};
