import { HorizontalContainer, Label, Select, Wrapper } from '../styles';

export const LanguageSetting = () => {
  return (
    <HorizontalContainer>
      <LanguageSelect label="Translate from" value="日本語" />
      <LanguageSelect label="Translate into" value="한국어" />
    </HorizontalContainer>
  );
};

const LanguageSelect = ({ label, value }: { label: string; value: string }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Select value={value}>
      <option>{value}</option>
    </Select>
  </Wrapper>
);
