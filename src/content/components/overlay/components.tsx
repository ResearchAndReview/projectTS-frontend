import React from 'react';
import { useState } from 'react';
import { DisplayMode, FontSize, Task } from '@/types';
import { FrameCloseButton, Frame as FrameComponent } from './styles';
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
  fontSize: FontSize;
  displayMode: DisplayMode;
}

interface NoteBodyProps {
  rect: Task['rect'];
  translation: Task['captions'][number]['translation'];
  fontSize: FontSize;
  hover: boolean;
}

// Components

export const Frame = ({ rect, children, loading }: FrameProps) => {
  const [closed, setClosed] = useState(false);

  const top = rect.y;
  const left = rect.x;

  if (closed) return null;

  return (
    <FrameComponent style={{ top, left, width: rect.width, height: rect.height }} loading={loading}>
      <FrameCloseButton onClick={() => setClosed(true)}>
        <span>×</span>
      </FrameCloseButton>
      {children}
    </FrameComponent>
  );
};

export const Note = ({ rect, translation, onClick, fontSize, displayMode }: NoteProps) => {
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
          {translation && (
            <NoteBody rect={rect} translation={translation} hover={hover} fontSize={fontSize} />
          )}
        </>
      )}
      {displayMode === 'always' && (
        <>
          <NoteFloatComponent hover={hover} loading={!translation} />
          {translation && (
            <NoteBody rect={rect} translation={translation} hover={!hover} fontSize={fontSize} />
          )}
        </>
      )}
    </NoteComponent>
  );
};

const NoteBody = ({ rect, translation, hover, fontSize }: NoteBodyProps) => {
  const top = 0;
  const left = 0;
  const size =
    [
      { key: 'sm', size: 13 },
      { key: 'md', size: 16 },
      { key: 'lg', size: 20 },
    ].find(({ key }) => key === fontSize)?.size ?? 13;

  return (
    <NoteBodyComponent
      hover={hover}
      style={{ top, left, fontSize: size, maxWidth: `${rect.width + 64}px` }}
    >
      {translation}
    </NoteBodyComponent>
  );
};
