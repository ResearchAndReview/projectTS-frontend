import React from 'react';
import { useState } from 'react';
import { Rect } from '@/types';
import { Frame as FrameComponent } from './styles';
import { NoteBody as NoteBodyComponent, Note as NoteComponent } from './styles';

// Component Props

interface FrameProps {
  rect: Rect;
  children: React.ReactNode;
}

interface NoteProps {
  rect: Rect;
  translation: string;
}

// Components

export const Frame = ({ rect, children }: FrameProps) => {
  const top = rect.y;
  const left = rect.x;

  return (
    <FrameComponent style={{ top, left, width: rect.width, height: rect.height }}>
      {children}
    </FrameComponent>
  );
};

export const Note = ({ rect, translation }: NoteProps) => {
  const [hover, setHover] = useState(false);
  const top = rect.y;
  const left = rect.x;

  return (
    <NoteComponent
      style={{ top, left, width: rect.width, height: rect.height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && <NoteBody rect={rect} translation={translation} />}
    </NoteComponent>
  );
};

const NoteBody = ({ rect, translation }: NoteProps) => {
  const top = rect.height + 4;
  const left = 0;

  return <NoteBodyComponent style={{ top, left }}>{translation}</NoteBodyComponent>;
};
