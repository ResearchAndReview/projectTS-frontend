import { useEffect, useRef, useState } from 'react';
import { RecoveryPayload, Task } from '@/types';
import * as S from './styles';

interface Props {
  task: Task;
  focusedCaptionId: string | null;
  onClose: () => void;
  onSubmit: (data: RecoveryPayload) => void;
}

export const CaptionEditModal = ({ task, focusedCaptionId, onClose, onSubmit }: Props) => {
  const [captions, setCaptions] = useState<RecoveryPayload>(
    task.captions.map(({ id, text }) => ({ id, text })),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!focusedCaptionId) return;
    const index = captions.findIndex((c) => c.id === focusedCaptionId);
    const el = inputRefs.current[index];
    if (el) el.focus();
  }, [focusedCaptionId, captions]);

  const handleChange = (index: number, value: string) => {
    const updated = [...captions];
    updated[index] = { ...updated[index], text: value };
    setCaptions(updated);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <strong>OCR 텍스트 수정</strong>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.Header>

      <S.Body>
        {captions.map((caption, i) => (
          <S.InputGroup key={caption.id}>
            <S.Label>문장 {i + 1}</S.Label>
            <S.Input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={caption.text}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </S.InputGroup>
        ))}
      </S.Body>

      <S.Footer>
        <S.SaveButton onClick={() => onSubmit(captions)}>저장 및 재번역</S.SaveButton>
      </S.Footer>
    </S.Wrapper>
  );
};
