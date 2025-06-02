import { useCallback } from 'react';
import { Task } from '@/types';
import { Badge, Overlay, ThumbnailImg, Wrapper } from './styles';
import { openImage } from './utils';

interface Props {
  task: Task;
}

export const TaskThumbnail = ({ task }: Props) => {
  const { id, image, status } = task;

  const showBadge = status === 'pending' || status === 'error';
  const clickHandler = useCallback(() => openImage(image), [image]);

  return (
    <Wrapper onClick={clickHandler}>
      <ThumbnailImg src={image} alt={`task-${id}`} />
      {showBadge && <Overlay />}
      {showBadge && <Badge status={status} />}
    </Wrapper>
  );
};
