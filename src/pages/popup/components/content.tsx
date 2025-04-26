import { Task } from '@/types';
import styled from '@emotion/styled';

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 42px;
  font-size: 13px;

  .thumbnail {
    width: 42px;
    height: 42px;
  }

  .status {
    padding-left: 8px;

    &.error {
      color: red;
    }
  }
`;

export const Content = ({ tasks }: { tasks: Task[] }) => {
  return (
    <List>
      {tasks.map((task) => (
        <Item>
          <img src={task.image} className="thumbnail" />
          <div className={`status ${task.status}`}>{task.status}</div>
        </Item>
      ))}
    </List>
  );
};
