import { Rect } from '@/types';
import { NoteBody as Component } from './styles';

interface Props {
  rect: Rect;
  translation: string;
}

export const NoteBody = ({ rect, translation }: Props) => {
  const top = rect.height + 4;
  const left = 0;

  return <Component style={{ top, left }}>{translation}</Component>;
};
