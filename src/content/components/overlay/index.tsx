import { Task } from '@/types/task';
import { Frame, Note } from './components';
import { OverlayRoot } from './styles';

interface Props {
  tasks: Task[];
}

export const TranslationOverlay = ({ tasks }: Props) => (
  <OverlayRoot>
    {tasks.map((task) => (
      <Frame key={task.id} rect={task.rect}>
        {task.status === 'success' &&
          task.captions.map((caption) => (
            <Note key={caption.id} rect={caption.rect} translation={caption.translation} />
          ))}
      </Frame>
    ))}
  </OverlayRoot>
);
