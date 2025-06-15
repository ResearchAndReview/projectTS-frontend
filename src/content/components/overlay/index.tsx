import { useEffect, useState } from 'react';
import { loadFromStorage } from '@/lib/utils';
import { Caption, DisplayMode, FontSize, Task } from '@/types';
import { Frame, Note } from './components';
import { OverlayRoot } from './styles';

interface Props {
  tasks: Task[];
  onNoteClick: (task: Task, captionId: Caption['id']) => void;
}

export const TranslationOverlay = ({ tasks, onNoteClick }: Props) => {
  const [fontSize, setFontSize] = useState<FontSize>('sm');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('hover');
  const isTaskLoading = (task: Task) => task.captions.length === 0;

  useEffect(() => {
    loadFromStorage<DisplayMode>('displayMode').then((value) => {
      if (value === 'hover' || value === 'always') {
        setDisplayMode(value);
      } else {
        setDisplayMode('hover'); // fallback
      }
    });

    loadFromStorage<FontSize>('fontSize').then((value) => {
      if (value === 'sm' || value === 'md' || value == 'lg') {
        setFontSize(value);
      } else {
        setFontSize('sm'); // fallback
      }
    });
  }, []);

  return (
    <OverlayRoot>
      {tasks.map((task) => (
        <Frame key={`task#${task.id}`} rect={task.rect} loading={isTaskLoading(task)}>
          {task.captions.map((caption) => (
            <Note
              key={`note#${caption.id}`}
              rect={caption.rect}
              translation={caption.translation}
              onClick={() => onNoteClick(task, caption.id)}
              fontSize={fontSize}
              displayMode={displayMode}
            />
          ))}
        </Frame>
      ))}
    </OverlayRoot>
  );
};
