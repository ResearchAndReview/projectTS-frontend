import { Dispatch, SetStateAction } from 'react';
import { DisplayMode } from '@/popup/types';
import { Button, Heading, HorizontalContainer, Label, Select, Wrapper } from './styles';

interface Props {
  displayMode: DisplayMode;
  setDisplayMode: Dispatch<SetStateAction<DisplayMode>>;
}

export const Setting = ({ displayMode, setDisplayMode }: Props) => {
  return (
    <>
      <Heading>
        <h2>LANGUAGE</h2>
      </Heading>
      <HorizontalContainer>
        <Wrapper>
          <Label>Translate from</Label>
          <Select>
            <option>日本語</option>
          </Select>
        </Wrapper>
        <Wrapper>
          <Label>Translate into</Label>
          <Select>
            <option>한국어</option>
          </Select>
        </Wrapper>
      </HorizontalContainer>
      <Heading>
        <h2>DISPLAY MODE</h2>
      </Heading>
      <HorizontalContainer>
        <Button active={displayMode === 'hover'} onClick={() => setDisplayMode('hover')}>
          <Marker />
          <span>on hover</span>
        </Button>
        <Button active={displayMode === 'always'} onClick={() => setDisplayMode('always')}>
          <Marker />
          <span>always</span>
        </Button>
      </HorizontalContainer>
    </>
  );
};

const Marker = () => (
  <div className="marker">
    <div />
  </div>
);
