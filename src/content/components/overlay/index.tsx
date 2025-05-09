import { Task } from '@/types/task';
import { Frame, Note } from './components';
import { OverlayRoot } from './styles';

interface Props {
  tasks: Task[];
}

export const TranslationOverlay = ({ tasks }: Props) => (
  <OverlayRoot>
    {tasks.map((task) => (
      <Frame key={`task#${task.id}`} rect={task.rect}>
        {task.captions.map((caption) => (
          <Note key={`note#${caption.id}`} rect={caption.rect} translation={caption.translation} />
        ))}
      </Frame>
    ))}
  </OverlayRoot>
);
