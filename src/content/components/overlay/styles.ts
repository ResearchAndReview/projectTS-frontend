import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0%   { background-color: rgba(66, 165, 245, 0.15); }
  50%  { background-color: rgba(66, 165, 245, 0.3); }
  100% { background-color: rgba(66, 165, 245, 0.15); }
`;

export const OverlayRoot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 100;
`;

export const Frame = styled.div<{ loading?: boolean }>`
  position: absolute;
  pointer-events: auto;
  background-color: transparent;
  border: 1px solid #7300ff30;
  z-index: 0;

  transition:
    border-color 0.5s ease,
    background-color 0.5s ease;

  &:hover > button {
    opacity: 1;
  }

  ${(props) =>
    props.loading &&
    css`
      animation: ${pulse} 4s ease-in-out infinite;
      border: 1px solid #7300ffff;
    `}
`;

export const FrameCloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -16px;
  left: -16px;
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 0.9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin: 4px;
  background: #7300ff;
  color: #fff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 2;

  > span {
    transform: translateY(-1px);
  }

  &:hover {
    transform: scale(1.1);
  }

  transition: transform 0.2s ease;
`;

export const Note = styled.div`
  position: absolute;
  pointer-events: auto;
`;

export const NoteFloat = styled.div<{ hover: boolean; loading?: boolean }>`
  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.hover ? 0.25 : 0.8)};

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #aaa;
  border-radius: 2px;
  padding: 2px 4px;
  font-size: 13px;

  pointer-events: auto;
  z-index: 0;

  transition:
    opacity 0.2s ease,
    border-color 0.5s ease,
    background-color 0.5s ease;

  ${(props) =>
    props.loading &&
    css`
      animation: ${pulse} 4s ease-in-out infinite;
      border-color: transparent;
    `}
`;

export const NoteBody = styled.div<{ hover: boolean }>`
  opacity: ${(props) => (props.hover ? 1 : 0)};
  transition: opacity 0.2s ease;

  position: absolute;
  background: white;
  color: black;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 13px;

  width: max-content;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 1;
`;
