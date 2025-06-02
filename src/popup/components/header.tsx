import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { Tab as TabType } from '../types';

interface Props {
  tab: TabType;
  setTab: Dispatch<SetStateAction<TabType>>;
}

const Logo = styled.div`
  font-size: 22px;
  font-weight: 500;
  font-family: 'Quicksand', sans-serif;
  padding-left: 24px;
  height: 80px;
  display: flex;
  align-items: center;
  user-select: none;

  .logoImage {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }

  span:last-child {
    color: #7300ff;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #dde2e9;
  user-select: none;
`;

const Tab = styled.div`
  border: none;
  background-color: transparent;

  font-size: 15px;
  color: #485465;
  padding: 12px 24px;
  font-weight: semibold;
  cursor: pointer;

  &:hover {
    color: #7300ff;
  }

  &.active {
    color: #7300ff;
    border-bottom: 3px solid #7300ff;
  }
`;

export const Header = ({ tab, setTab }: Props) => {
  return (
    <div>
      <Logo>
        <img src="logo.png" className="logoImage" />
        <span>comu</span>
        <span>trans</span>
      </Logo>
      <Tabs>
        <Tab className={tab === 'status' ? 'active' : ''} onClick={() => setTab('status')}>
          STATUS
        </Tab>
        <Tab className={tab === 'setting' ? 'active' : ''} onClick={() => setTab('setting')}>
          SETTING
        </Tab>
      </Tabs>
    </div>
  );
};
