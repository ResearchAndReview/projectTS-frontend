import { Toaster } from 'react-hot-toast';
import { Rect } from '@/types';
import { DragController, RecoveryModal, TranslationOverlay } from '../components';
import { useDragState, useRecoveryModal, useTaskManager } from './hooks';

export const Main = () => {
  const { dragState, setDragState } = useDragState();
  const { tasks, requestTask, requestRecovery } = useTaskManager();
  const { close, handleNoteClick, handleChange, captions, inputRefs, taskId } = useRecoveryModal();

  const handleComplete = (rect: Rect) => {
    setDragState('IDLE');
    requestTask(rect);
  };

  const onRecoverySubmit = () => {
    if (!taskId || !captions) return;

    const original = tasks.find((i) => i.id === taskId)?.captions;
    if (!original || original.length !== captions.length) return;

    const filtered = captions.filter(({ text }, index) => original[index].text !== text);

    requestRecovery(taskId, filtered);
    close();
  };

  const isModalOpen = taskId && captions;

  return (
    <>
      {isModalOpen && (
        <RecoveryModal
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
