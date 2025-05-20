import { Toaster } from 'react-hot-toast';
import { Rect } from '@/types';
import { CaptionEditModal, DragController, TranslationOverlay } from '../components';
import { useCaptionEditModal, useDragState, useTaskManager } from './hooks';

export const Main = () => {
  const { dragState, setDragState } = useDragState();
  const { tasks, requestTask, requestRetry } = useTaskManager();
  const { close, handleNoteClick, handleChange, captions, inputRefs, taskId } =
    useCaptionEditModal();

  const handleComplete = (rect: Rect) => {
    setDragState('IDLE');
    requestTask(rect);
  };

  const onRecoverySubmit = () => {
    if (!taskId || !captions) return;
    requestRetry(taskId, captions);
    close();
  };

  const isModalOpen = taskId && captions;

  return (
    <>
      {isModalOpen && (
        <CaptionEditModal
          captions={captions}
          inputRefs={inputRefs}
          onClose={close}
          onChange={handleChange}
          onSubmit={onRecoverySubmit}
        />
      )}

      <Toaster position="bottom-center" />
      <TranslationOverlay tasks={tasks} onNoteClick={handleNoteClick} />
      {dragState === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
