import styled from '@emotion/styled';

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 16px 32px 24px;

  h2 {
    font-size: 16px;
    font-weight: semibold;
  }

  .filterButtons {
    display: flex;
  }
`;

export const FilterButton = styled.button<{ disabled: boolean; active: boolean }>`
  padding: 4px 8px;
  border: none;
  border-radius: 2px;

  font-size: 13px;

  color: ${({ disabled, active }) => (disabled ? '#cdcdcd' : active ? '#7300ff' : '#485465')};
  background-color: ${({ active }) => (active ? '#eee3fd' : 'transparent')};

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  :hover {
    color: ${({ disabled }) => (disabled ? '#cdcdcd' : '#7300ff')};
  }
`;

export const Tasks = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 가로로 4칸 */

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

export const Placeholder = styled.div`
  padding: 16px 24px;
  font-size: 12px;
`;
