import React from 'react';
import { Rect } from '@/types';
import { Frame as Component } from './styles';

interface Props {
  rect: Rect;
  children: React.ReactNode;
}

export const Frame = ({ rect, children }: Props) => {
  const top = rect.y + scrollY;
  const left = rect.x;

  return (
    <Component style={{ top, left, width: rect.width, height: rect.height }}>{children}</Component>
  );
};
