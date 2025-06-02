import styled from '@emotion/styled';

export const Download = styled.div`
  padding: 12px;
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  gap: 4px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #f6f7f9;

  font-size: 12px;

  color: #485465;
  cursor: pointer;

  :hover {
    color: #7300ff;
    background-color: #eee3fd;
    transform: translateY(-1px);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  }

  transition: all 0.1s ease;
`;
