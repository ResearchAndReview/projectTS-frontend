import { ChangeEvent } from 'react';
import { FontSize } from '@/types';
import { Description, HorizontalContainer, Select, Wrapper } from '../styles';

interface Props {
  fontSize: FontSize;
  setFontSize: (value: FontSize) => void;
}

export const FontSizeSetting = ({ fontSize, setFontSize }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value as FontSize);
  };

  return (
    <>
      <Description>폰트 크기를 선택해주세요.</Description>
      <HorizontalContainer>
        <Wrapper>
          <Select value={fontSize ?? 'sm'} onChange={handleChange}>
            <option value="sm">작게 (13pt)</option>
            <option value="md">보통 (16pt)</option>
            <option value="lg">크게 (20pt)</option>
          </Select>
        </Wrapper>
      </HorizontalContainer>
    </>
  );
};
