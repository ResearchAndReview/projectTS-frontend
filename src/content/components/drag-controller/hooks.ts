import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Point, Rect } from '@/types';
import { isRectBigEnough } from './utils';

export const useRect = (onComplete: (rect: Rect, ignore?: boolean) => void) => {
  const [start, setStart] = useState<Point | null>(null);
  const [current, setCurrent] = useState<Point | null>(null);

  const rect = calcRect(start, current);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const x = e.pageX - window.scrollX;
      const y = e.pageY - window.scrollY;
      setStart({ x, y });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!start) return;
      const x = e.pageX - window.scrollX;
      const y = e.pageY - window.scrollY;
      setCurrent({ x, y });
    };

    const onMouseUp = () => {
      if (!rect) return;

      if (isRectBigEnough(rect)) {
        onComplete({ ...rect, y: rect.y + window.scrollY });
      } else {
        toast.error('박스가 너무 작습니다.');
        onComplete(rect, true);
      }
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

  return { rect };
};

// Utility functions

const calcRect = (start: Point | null, current: Point | null): Rect | null => {
  if (!start || !current) return null;
  if (start.x === current.x && start.y === current.y) return null;

  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);

  return { x, y, width, height };
};
