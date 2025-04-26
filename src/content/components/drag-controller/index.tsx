import React from 'react';
import { Point, Rect } from '@/types';
import { Box, Overlay } from './ui';

interface Props {
  onComplete: (rect: Rect) => void;
}

export const DragController = ({ onComplete }: Props) => {
  const [start, setStart] = React.useState<Point | null>(null);
  const [current, setCurrent] = React.useState<Point | null>(null);

  const rect = calcRect(start, current);

  React.useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const x = e.pageX - window.scrollX;
      const y = e.pageY - window.scrollY;
      setStart({ x, y });
      setCurrent({ x, y });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (start) {
        const x = e.pageX - window.scrollX;
        const y = e.pageY - window.scrollY;
        setCurrent({ x, y });
      }
    };

    const onMouseUp = () => {
      if (rect) onComplete({ ...rect, x: rect.x + window.scrollX, y: rect.y + window.scrollY });
      setStart(null);
      setCurrent(null);
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [start, rect, onComplete]);

  return <Overlay>{rect && <Box rect={rect} />}</Overlay>;
};

const calcRect = (start: Point | null, current: Point | null): Rect | null => {
  if (!start || !current) return null;
  if (start.x === current.x && start.y === current.y) return null;

  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);

  return { x, y, width, height };
};
