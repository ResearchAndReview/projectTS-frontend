import styled from '@emotion/styled';

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 16px 32px 24px;

  h2 {
    font-size: 16px;
    font-weight: semibold;
  }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  column-gap: 12px;
  padding: 24px;
  padding-top: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 10px;
  color: #485465;
  margin-left: 4px;
`;

export const Select = styled.select`
  font-size: 12px;
  padding: 8px;
  padding-right: 0;
  border: none;
  border-radius: 4px;
  background-color: #f6f7f9;
  font-size: 12px;
  color: #000;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='none' stroke='black' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  outline: none;
`;

export const Button = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: #000;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #f6f7f9;
  }

  .marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-right: 8px;
    padding: 2px;
    border: 2px solid #7300ff;
    border-radius: 50%;

    > div {
      display: ${({ active }) => (active ? 'block' : 'none')};
      width: 100%;
      height: 100%;
      background-color: #7300ff;
      border-radius: 50%;
    }
  }
`;
