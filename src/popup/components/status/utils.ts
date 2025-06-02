import toast from 'react-hot-toast';
import { Task } from '@/types';

export const downloadHandler = (tasks: Task[]) => {
  if (tasks.length === 0) {
    toast.error('다운로드 할 데이터가 없습니다.', { duration: 1500 });
    return;
  }

  const json = JSON.stringify(tasks, null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'translation_tasks.json';
  a.click();

  URL.revokeObjectURL(url);
};
