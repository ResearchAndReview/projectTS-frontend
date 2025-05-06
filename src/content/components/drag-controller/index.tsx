import { Rect } from '@/types';
import { useRect } from './hooks';
import { Box, Overlay } from './styles';

interface Props {
  onComplete: (rect: Rect) => void;
}

export const DragController = ({ onComplete }: Props) => {
  const { rect } = useRect(onComplete);

  return <Overlay>{rect && <Box rect={rect} />}</Overlay>;
};
