import { Dispatch, SetStateAction, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Filter } from '@/popup/types';
import { Task } from '@/types';
import { Button, Download, Placeholder, Tasks, Top } from './styles';
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

  const downloadHandler = () => {
    if (tasks.success.length === 0) {
      toast.error('다운로드 할 데이터가 없습니다.');
      return;
    }

    const json = JSON.stringify(tasks.success, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation_tasks.json';
    a.click();

    URL.revokeObjectURL(url);
  };

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

      {showPlaceholder && <Placeholder>아직 태스크가 없습니다.</Placeholder>}

      {!showPlaceholder && (
        <>
          <Tasks>
            {tasks[filter].map((task) => (
              <TaskThumbnail key={task.id} task={task} />
            ))}
          </Tasks>
          <Download>
            <Button active={false} disabled={false} onClick={downloadHandler}>
              성공한 데이터 다운로드 ({tasks.success.length}건)
            </Button>
          </Download>
        </>
      )}
    </>
  );
};
