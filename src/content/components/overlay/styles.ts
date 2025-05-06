import styled from '@emotion/styled';

export const OverlayRoot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2147483646;
  border: 1px solid red;
`;

export const Frame = styled.div`
  position: absolute;
  border: 1px dotted #aaa;
  background-color: rgba(255, 255, 255, 0.05);
`;

export const Note = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #aaa;
  color: black;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 2px;
  pointer-events: auto;
`;

export const NoteBody = styled.div`
  position: absolute;
  background: white;
  color: black;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  pointer-events: none;
`;
