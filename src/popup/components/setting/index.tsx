import { DisplayMode, FontSize } from '@/types';
import { DisplayModeSetting } from './sections/display-mode-setting';
import { FontSizeSetting } from './sections/font-size-setting';
import { LanguageSetting } from './sections/language-setting';
import { Heading } from './styles';

interface Props {
  displayMode: DisplayMode;
  setDisplayMode: (value: DisplayMode) => void;
  fontSize: FontSize;
  setFontSize: (value: FontSize) => void;
}

export const Setting = ({ displayMode, setDisplayMode, fontSize, setFontSize }: Props) => {
  return (
    <>
      <Heading>
        <h2>디스플레이</h2>
      </Heading>
      <FontSizeSetting fontSize={fontSize} setFontSize={setFontSize} />
      <DisplayModeSetting displayMode={displayMode} setDisplayMode={setDisplayMode} />

      <Heading>
        <h2>언어</h2>
      </Heading>
      <LanguageSetting />
    </>
  );
};
