import { useEffect, useState } from 'react';
import { Point, Rect } from '@/types';
import styled from '@emotion/styled';

interface Props {
  onComplete: (rect: Rect) => void;
}

export const DragController = ({ onComplete }: Props) => {
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
      if (rect) onComplete(rect);
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

// Styled components

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  cursor: crosshair;
  user-select: none;
  background-color: transparent;
`;

const Box = styled.div<{ rect: Rect }>`
  position: absolute;
  top: ${({ rect: { y } }) => y}px;
  left: ${({ rect: { x } }) => x}px;
  width: ${({ rect: { width } }) => width}px;
  height: ${({ rect: { height } }) => height}px;

  border: 1px dashed #7300ff;
  background-color: rgba(66, 165, 245, 0.15);

  pointer-events: none;
  z-index: 1000000;
`;
