import { DisplayMode } from '@/types';
import { Button, Description, DisplayModeItem, HorizontalContainer } from '../styles';

interface Props {
  displayMode: DisplayMode;
  setDisplayMode: (value: DisplayMode) => void;
}

export const DisplayModeSetting = ({ displayMode, setDisplayMode }: Props) => {
  return (
    <>
      <Description>번역을 표시할 방법을 선택해주세요.</Description>
      <HorizontalContainer>
        <DisplayModeOption
          label="마우스를 올려서 보기"
          image="display-mode-1.png"
          active={displayMode === 'hover'}
          onClick={() => setDisplayMode('hover')}
        />
        <DisplayModeOption
          label="항상 보기"
          image="display-mode-2.png"
          active={displayMode === 'always'}
          onClick={() => setDisplayMode('always')}
        />
      </HorizontalContainer>
    </>
  );
};

const DisplayModeOption = ({
  label,
  image,
  active,
  onClick,
}: {
  label: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) => (
  <DisplayModeItem>
    <img src={image} alt={label} />
    <Button active={active} onClick={onClick}>
      <Marker />
      <span>{label}</span>
    </Button>
  </DisplayModeItem>
);

const Marker = () => (
  <div className="marker">
    <div />
  </div>
);
