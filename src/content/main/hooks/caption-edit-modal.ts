import { useState } from 'react';
import { Task } from '@/types/task';

export const useCaptionEditModal = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [focusedCaptionId, setFocusedCaptionId] = useState<string | null>(null);

  const open = (task: Task, captionId: string) => {
    setSelectedTask(task);
    setFocusedCaptionId(captionId);
  };

  const close = () => {
    setSelectedTask(null);
    setFocusedCaptionId(null);
  };

  return {
    isOpen: selectedTask !== null,
    selectedTask,
    focusedCaptionId,
    open,
    close,
  };
};
