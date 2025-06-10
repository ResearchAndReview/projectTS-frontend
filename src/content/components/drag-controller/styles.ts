import { Rect } from '@/types';
import styled from '@emotion/styled';
import { getBackgroundColor, getBorderColor } from './utils';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  cursor: crosshair;
  user-select: none;
  background-color: transparent;
`;

export const Box = styled.div<{ rect: Rect }>`
  position: absolute;
  top: ${({ rect }) => rect.y}px;
  left: ${({ rect }) => rect.x}px;
  width: ${({ rect }) => rect.width}px;
  height: ${({ rect }) => rect.height}px;

  border: 1px solid;
  border-color: ${({ rect }) => getBorderColor(rect)};
  background-color: ${({ rect }) => getBackgroundColor(rect)};

  pointer-events: none;
  z-index: 1000000;
`;
