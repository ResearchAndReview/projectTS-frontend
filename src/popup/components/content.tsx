import { Dispatch, SetStateAction, useMemo } from 'react';
import { Task } from '@/types';
import styled from '@emotion/styled';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 16px 32px 24px;

  h2 {
    font-size: 16px;
    font-weight: semibold;
  }

  .buttons {
    display: flex;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 2px;
  background-color: transparent;

  font-size: 13px;
  color: #485465;
  padding: 4px 8px;

  &.active {
    background-color: #eee3fd;
    color: #7300ff;
  }
`;

const Tasks = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 가로로 4칸 */

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  padding: 16px 24px;
`;

const types = ['all', 'success', 'pending', 'error'] as const;

export const Content = ({
  tasks,
  filter,
  setFilter,
}: {
  tasks: Task[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) => {
  const filteredTasks = useMemo(
    () => (filter === 'all' ? tasks : tasks.filter((i) => i.status === filter)),
    [filter, tasks],
  );

  const count = useMemo(
    () => ({
      all: tasks.length,
      error: tasks.filter((i) => i.status === 'error').length,
      complete: tasks.filter((i) => i.status === 'success').length,
      pending: tasks.filter((i) => i.status === 'pending').length,
    }),
    [tasks],
  );

  return (
    <div>
      <Top>
        <h2>TASKS</h2>
        <ul className="buttons">
          {types.map((i) => (
            <Button
              className={filter === i ? 'active' : ''}
              key={`filter-button-${i}`}
              onClick={() => setFilter(i)}
            >
              {i} {i === 'all' && `(${count[i]})`}
            </Button>
          ))}
        </ul>
      </Top>
      {filteredTasks.length === 0 && <Placeholder>No tasks were found.</Placeholder>}
      {filteredTasks.length !== 0 && (
        <Tasks>
          {filteredTasks.map((task) => (
            <img src={task.image} className="thumbnail" id={`task-${task.id}`} />
          ))}
        </Tasks>
      )}
    </div>
  );
};
