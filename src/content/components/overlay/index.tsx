import { Task } from '@/types/task';
import { Frame, Note } from './components';
import { OverlayRoot } from './styles';

interface Props {
  tasks: Task[];
}

export const TranslationOverlay = ({ tasks }: Props) => {
  const isTaskLoading = (task: Task) => task.captions.length === 0;

  return (
    <OverlayRoot>
      {tasks.map((task) => (
        <Frame key={`task#${task.id}`} rect={task.rect} loading={isTaskLoading(task)}>
          {task.captions.map((caption) => (
            <Note
              key={`note#${caption.id}`}
              rect={caption.rect}
              translation={caption.translation}
            />
          ))}
        </Frame>
      ))}
    </OverlayRoot>
  );
};
