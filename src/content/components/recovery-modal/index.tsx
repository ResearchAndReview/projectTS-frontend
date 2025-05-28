import { RecoveryPayload } from '@/types';
import * as S from './styles';

interface Props {
  captions: RecoveryPayload;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (index: number, value: string) => void;
}

export const RecoveryModal = ({ captions, inputRefs, onClose, onSubmit, onChange }: Props) => {
  return (
    <S.Wrapper>
      <S.Header>
        <strong>텍스트 수정 및 재번역 요청</strong>
        <S.CloseButton onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#1f1f1f"
          >
            <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
          </svg>
        </S.CloseButton>
      </S.Header>

      <S.Description>
        잘못 인식된 텍스트를 수정하고 하단의 `저장 및 재번역` 버튼을 클릭해주세요.
      </S.Description>

      <S.Body>
        {captions.map((caption, i) => (
          <S.InputGroup key={caption.id}>
            <S.Label>캡션 {i + 1}</S.Label>
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
