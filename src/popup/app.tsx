import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import { Content } from './components/content';
import { Header } from './components/header';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_ALL_TASKS' }, (response) => {
      if (response) {
        setTasks(response);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <Content tasks={tasks} />
    </div>
  );
}
