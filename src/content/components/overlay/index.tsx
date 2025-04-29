import React, { useState } from 'react';
import { Task } from '@/types/task';
import styled from '@emotion/styled';

interface Props {
  tasks: Task[];
}

export const TranslationOverlay: React.FC<Props> = ({ tasks }) => {
  return (
    <OverlayRoot>
      {tasks.map((task) => (
        <DraggedRegion key={task.id} rect={task.rect}>
          {task.status === 'success'
            ? task.captions.map((caption) => (
                <CaptionBox
                  key={caption.id}
                  rect={caption.rect}
                  translation={caption.translation}
                />
              ))
            : null}
        </DraggedRegion>
      ))}
    </OverlayRoot>
  );
};

const OverlayRoot = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2147483646;
`;

interface RegionProps {
  rect: { x: number; y: number; width: number; height: number };
  children: React.ReactNode;
}

const DraggedRegion: React.FC<RegionProps> = ({ rect, children }) => {
  const top = rect.y + scrollY;
  const left = rect.x;

  return (
    <RegionBox style={{ top, left, width: rect.width, height: rect.height }}>{children}</RegionBox>
  );
};

const RegionBox = styled.div`
  position: absolute;
  border: 1px dotted #aaa;
  background-color: rgba(255, 255, 255, 0.05);
`;

interface CaptionProps {
  rect: { x: number; y: number; width: number; height: number };
  translation: string;
}

const CaptionBox: React.FC<CaptionProps> = ({ rect, translation }) => {
  const [hover, setHover] = useState(false);
  const top = rect.y;
  const left = rect.x;

  return (
    <Caption
      style={{ top, left, width: rect.width, height: rect.height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && <TranslationPopup rect={rect} translation={translation} />}
    </Caption>
  );
};

const Caption = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #aaa;
  color: black;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 2px;
  pointer-events: auto;
`;

interface PopupProps {
  rect: { x: number; y: number; width: number; height: number };
  translation: string;
}

const TranslationPopup: React.FC<PopupProps> = ({ rect, translation }) => {
  const top = rect.height + 4;
  const left = 0;

  return <Popup style={{ top, left }}>{translation}</Popup>;
};

const Popup = styled.div`
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
