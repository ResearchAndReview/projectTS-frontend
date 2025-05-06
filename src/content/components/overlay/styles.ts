import styled from '@emotion/styled';

export const OverlayRoot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2147483646;
`;

export const Frame = styled.div`
  position: absolute;
  border: 1px dotted #aaa;
  background-color: rgba(255, 255, 255, 0.05);

  z-index: 0;
`;

export const Note = styled.div`
  position: absolute;
  pointer-events: auto;
`;

export const NoteFloat = styled.div<{ hover: boolean }>`
  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.hover ? 0.25 : 0.8)};
  transition: opacity 0.2s ease;

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #aaa;
  border-radius: 2px;
  padding: 2px 4px;
  font-size: 13px;

  pointer-events: auto;
  z-index: 0;
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

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
`;
