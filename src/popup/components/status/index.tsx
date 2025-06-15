import { Dispatch, SetStateAction, useMemo } from 'react';
import { Filter } from '@/popup/types';
import { Task } from '@/types';
import { ActionButton, Download, FilterButton, Heading, Placeholder, Tasks } from './styles';
import { TaskThumbnail } from './task-thumbnail';
import { downloadHandler } from './utils';

const statusList = ['all', 'success', 'pending', 'error'] as const;

interface Props {
  tasks: Task[];
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const Status = ({ tasks: _tasks, filter, setFilter }: Props) => {
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
      <Heading>
        <h2>TASKS</h2>
        <ul className="filterButtons">
          {statusList.map((i) => (
            <FilterButton
              active={i === filter}
              disabled={i !== 'all' && tasks[i].length === 0}
              key={`filter-button-${i}`}
              onClick={() => setFilter(i)}
            >
              {i}
            </FilterButton>
          ))}
        </ul>
      </Heading>

      {showPlaceholder && <Placeholder>표시할 데이터가 없습니다.</Placeholder>}

      {!showPlaceholder && (
        <Tasks>
          {tasks[filter].map((task) => (
            <TaskThumbnail key={task.id} task={task} />
          ))}
        </Tasks>
      )}

      <Download>
        <ActionButton onClick={() => downloadHandler(tasks.success)}>데이터 다운로드</ActionButton>
      </Download>
    </>
  );
};
