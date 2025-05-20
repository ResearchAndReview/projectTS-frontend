import { useEffect, useRef, useState } from 'react';
import { RecoveryPayload, Task } from '@/types/task';

export const useCaptionEditModal = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [captions, setCaptions] = useState<RecoveryPayload | null>(null);
  const [clickedCaptionId, setClickedCaptionId] = useState<string | null>(null);

  const isOpen = taskId !== null;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const open = (task: Task) => {
    setTaskId(task.id);
    setCaptions(task.captions.map(({ id, text }) => ({ id, text })));
  };

  const close = () => {
    setTaskId(null);
    setCaptions(null);
  };

  useEffect(() => {
    if (!captions || !clickedCaptionId) return;

    const index = captions.findIndex((c) => c.id === clickedCaptionId);
    if (index === -1) return;

    const elem = inputRefs.current[index];
    if (!elem) return;

    elem.focus();
    setClickedCaptionId(null);
  }, [captions, clickedCaptionId]);

  const handleNoteClick = (task: Task, captionId: string) => {
    if (!isOpen) open(task);
    setClickedCaptionId(captionId);
  };

  const handleChange = (index: number, value: string) => {
    setCaptions((prev) => {
      const updated = prev ? [...prev] : [];
      updated[index] = { ...updated[index], text: value };
      return updated;
    });
  };

  return {
    isOpen,
    close,
    handleNoteClick,
    captions,
    inputRefs,
    handleChange,
    taskId,
  };
};
