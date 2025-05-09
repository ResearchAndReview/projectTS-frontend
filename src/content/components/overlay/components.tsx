import React from 'react';
import { useState } from 'react';
import { Task } from '@/types';
import { Frame as FrameComponent } from './styles';
import {
  NoteBody as NoteBodyComponent,
  Note as NoteComponent,
  NoteFloat as NoteFloatComponent,
} from './styles';

// Component Props

interface FrameProps {
  rect: Task['rect'];
  children: React.ReactNode;
}

interface NoteProps {
  rect: Task['rect'];
  translation: Task['captions'][number]['translation'];
}

interface NoteBodyProps extends NoteProps {
  hover: boolean;
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
      <NoteFloatComponent hover={hover} />
      {translation && <NoteBody rect={rect} translation={translation} hover={hover} />}
    </NoteComponent>
  );
};

const NoteBody = ({ translation, hover }: NoteBodyProps) => {
  const top = 0;
  const left = 0;

  return (
    <NoteBodyComponent hover={hover} style={{ top, left }}>
      {translation}
    </NoteBodyComponent>
  );
};
