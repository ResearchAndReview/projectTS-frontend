import { Toaster } from 'react-hot-toast';
import { Rect } from '@/types';
import { DragController, TranslationOverlay } from '../components';
import { useDragState, useTaskManager } from './hooks';

export const Main = () => {
  const { dragState, setDragState } = useDragState();
  const { tasks, requestTask } = useTaskManager();

  const handleComplete = (rect: Rect) => {
    setDragState('IDLE');
    requestTask(rect);
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <TranslationOverlay tasks={tasks} />
      {dragState === 'DRAG' && <DragController onComplete={handleComplete} />}
    </>
  );
};
