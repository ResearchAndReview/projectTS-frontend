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

export const Header = () => {
  return (
    <div>
      <Logo>
        <div className="logoImage" />
        <span>comu</span>
        <span>trans</span>
      </Logo>
      {/* Tabs */}
    </div>
  );
};
