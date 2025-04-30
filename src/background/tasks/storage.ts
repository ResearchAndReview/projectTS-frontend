import { Task } from '@/types/task';

let tasks: Task[] = [];
let initialized = false;

/** Loads tasks from chrome.storage.local (only once) */
export const initTaskStorage = async () => {
  if (initialized) return;

  const res = await chrome.storage.local.get('tasks');
  tasks = res.tasks ?? [];
  initialized = true;
};

/** Persists the current tasks array to chrome.storage.local */
const saveTasksToStorage = () => {
  chrome.storage.local.set({ tasks });
};

/** Returns all tasks or tasks filtered by sessionId */
export const getTasks = async (sessionId?: string): Promise<Task[]> => {
  if (!initialized) await initTaskStorage();

  return sessionId ? tasks.filter((i) => i.context.sessionId === sessionId) : tasks;
};

/** Adds a new task to memory and persists it */
export const addTask = (task: Task) => {
  tasks.push(task);
  saveTasksToStorage();
};

/** Updates an existing task or inserts it if not found */
export const updateTask = (updated: Task) => {
  const index = tasks.findIndex((i) => i.id === updated.id);

  if (index !== -1) tasks.splice(index, 1, updated);
  else tasks.push(updated);

  saveTasksToStorage();
};

/** Clears all tasks (for reset or debugging) */
export const clearTasks = () => {
  tasks = [];
  chrome.storage.local.remove('tasks');
};
