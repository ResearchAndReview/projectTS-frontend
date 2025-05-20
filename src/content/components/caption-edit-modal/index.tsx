import { RecoveryPayload } from '@/types';
import * as S from './styles';

interface Props {
  captions: RecoveryPayload;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (index: number, value: string) => void;
}

export const CaptionEditModal = ({ captions, inputRefs, onClose, onSubmit, onChange }: Props) => {
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
              onChange={(e) => onChange(i, e.target.value)}
            />
          </S.InputGroup>
        ))}
      </S.Body>

      <S.Footer>
        <S.SaveButton onClick={onSubmit}>저장 및 재번역</S.SaveButton>
      </S.Footer>
    </S.Wrapper>
  );
};
