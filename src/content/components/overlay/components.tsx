import React from 'react';
import { useState } from 'react';
import { DisplayMode, Task } from '@/types';
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
  loading: boolean;
}

interface NoteProps {
  rect: Task['rect'];
  translation: Task['captions'][number]['translation'];
  onClick: () => void;
  displayMode: DisplayMode;
}

interface NoteBodyProps {
  rect: Task['rect'];
  translation: Task['captions'][number]['translation'];
  hover: boolean;
}

// Components

export const Frame = ({ rect, children, loading }: FrameProps) => {
  const top = rect.y;
  const left = rect.x;

  return (
    <FrameComponent style={{ top, left, width: rect.width, height: rect.height }} loading={loading}>
      {children}
    </FrameComponent>
  );
};

export const Note = ({ rect, translation, onClick, displayMode }: NoteProps) => {
  const [hover, setHover] = useState(false);
  const top = rect.y;
  const left = rect.x;

  return (
    <NoteComponent
      style={{ top, left, width: rect.width, height: rect.height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {displayMode === 'hover' && (
        <>
          <NoteFloatComponent hover={hover} loading={!translation} />
          {translation && <NoteBody rect={rect} translation={translation} hover={hover} />}
        </>
      )}
      {displayMode === 'always' && translation && (
        <NoteBody rect={rect} translation={translation} hover={!hover} />
      )}
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
