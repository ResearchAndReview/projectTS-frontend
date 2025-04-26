/** @jsxImportSource @emotion/react */
import { Rect } from '@/types';
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  inset: 0;
  z-index: 999999;
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
  border: 1px dashed #7300ff;
  background-color: rgba(66, 165, 245, 0.15);
  pointer-events: none;
  z-index: 1000000;
`;
