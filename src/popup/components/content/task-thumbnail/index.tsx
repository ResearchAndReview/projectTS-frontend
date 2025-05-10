import { Task } from '@/types';
import { Badge, Overlay, ThumbnailImg, Wrapper } from './styles';

interface Props {
  task: Task;
}

export const TaskThumbnail = ({ task }: Props) => {
  const { id, image, status } = task;

  const handleClick = () => {
    console.log('Clicked task:', id);
  };

  const showBadge = status === 'pending' || status === 'error';

  return (
    <Wrapper onClick={handleClick}>
      <ThumbnailImg src={image} alt={`task-${id}`} />
      {showBadge && <Overlay />}
      {showBadge && <Badge status={status} />}
    </Wrapper>
  );
};
