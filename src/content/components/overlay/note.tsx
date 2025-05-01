import { useState } from 'react';
import { Rect } from '@/types';
import { NoteBody } from './note-body';
import { Note as Component } from './styles';

interface Props {
  rect: Rect;
  translation: string;
}

export const Note = ({ rect, translation }: Props) => {
  const [hover, setHover] = useState(false);
  const top = rect.y;
  const left = rect.x;

  return (
    <Component
      style={{ top, left, width: rect.width, height: rect.height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && <NoteBody rect={rect} translation={translation} />}
    </Component>
  );
};
