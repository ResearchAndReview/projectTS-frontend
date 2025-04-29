import styled from '@emotion/styled';

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
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: #7300ff;
    margin-right: 12px;
  }

  span:last-child {
    color: #7300ff;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #dde2e9;
`;

const Tab = styled.div`
  border: none;
  background-color: transparent;

  font-size: 15px;
  color: #485465;
  padding: 12px 24px;
  font-weight: semibold;

  &.active {
    color: #7300ff;
    border-bottom: 3px solid #7300ff;
  }
`;

export const Header = () => {
  return (
    <div>
      <Logo>
        <div className="logoImage" />
        <span>comu</span>
        <span>trans</span>
      </Logo>
      <Tabs>
        <Tab className="active">STATUS</Tab>
      </Tabs>
    </div>
  );
};
