import { Dispatch, SetStateAction, useMemo } from 'react';
import { Filter } from '@/popup/types';
import { Task } from '@/types';
import { Button, Placeholder, Tasks, Top } from './styles';
import { TaskThumbnail } from './task-thumbnail';

const statusList = ['all', 'success', 'pending', 'error'] as const;

interface Props {
  tasks: Task[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const Content = ({ tasks: _tasks, filter, setFilter }: Props) => {
  const tasks = useMemo(
    () => ({
      all: _tasks,
      success: _tasks.filter((i) => i.status === 'success'),
      pending: _tasks.filter((i) => i.status === 'pending'),
      error: _tasks.filter((i) => i.status === 'error'),
    }),
    [_tasks],
  );

  const showPlaceholder = tasks[filter].length === 0;

  return (
    <>
      <Top>
        <h2>TASKS</h2>
        <ul className="buttons">
          {statusList.map((i) => (
            <Button
              active={i === filter}
              disabled={i !== 'all' && tasks[i].length === 0}
              key={`filter-button-${i}`}
              onClick={() => setFilter(i)}
            >
              {i}
            </Button>
          ))}
        </ul>
      </Top>

      {showPlaceholder && <Placeholder>No tasks were found.</Placeholder>}

      {!showPlaceholder && (
        <Tasks>
          {tasks[filter].map((task) => (
            <TaskThumbnail key={task.id} task={task} />
          ))}
        </Tasks>
      )}
    </>
  );
};
