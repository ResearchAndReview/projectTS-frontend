import { Toaster } from 'react-hot-toast';
import { Rect } from '@/types';
import { CaptionEditModal, DragController, TranslationOverlay } from '../components';
import { useCaptionEditModal, useDragState, useTaskManager } from './hooks';

export const Main = () => {
  const { dragState, setDragState } = useDragState();
  const { tasks, requestTask } = useTaskManager();
  const { close, open, isOpen, selectedTask, focusedCaptionId } = useCaptionEditModal();

  const handleComplete = (rect: Rect) => {
    setDragState('IDLE');
    requestTask(rect);
  };

  const handleNoteClick = (taskId: string, captionId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    open(task, captionId);
  };

  return (
    <>
      {isOpen && selectedTask && (
        <CaptionEditModal
          task={selectedTask}
          focusedCaptionId={focusedCaptionId}
          onClose={close}
          onSubmit={(captions) => {
            console.log('[제출된 캡션]', captions);
            close();
          }}
        />
      )}

      <Toaster position="bottom-center" />
      <TranslationOverlay tasks={tasks} onNoteClick={handleNoteClick} />
      {dragState === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
