import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { loadFromStorage, saveToStorage } from '@/lib/utils';
import { DisplayMode } from '@/types';
import { Footer, Header, Setting, Status } from './components';
import { useTasksFromAllTabs } from './hooks';
import { Filter, Tab } from './types';

export default function App() {
  const [tab, setTab] = useState<Tab>('status');
  const [filter, setFilter] = useState<Filter>('all');
  const [displayMode, setDisplayMode] = useState<DisplayMode>(null);
  const { tasks } = useTasksFromAllTabs();

  useEffect(() => {
    if (displayMode === null) return;

    saveToStorage('displayMode', displayMode).catch(() => {
      toast.error('설정을 저장하지 못했습니다.');
    });
  }, [displayMode]);

  useEffect(() => {
    loadFromStorage<DisplayMode>('displayMode').then((value) => {
      if (value === 'hover' || value === 'always') {
        setDisplayMode(value);
      } else {
        setDisplayMode('hover');
      }
    });
  }, []);

  return (
    <>
      <div>
        <Toaster position="bottom-center" />
        <Header tab={tab} setTab={setTab} />
        {tab === 'status' && <Status tasks={tasks} filter={filter} setFilter={setFilter} />}
        {tab === 'setting' && <Setting displayMode={displayMode} setDisplayMode={setDisplayMode} />}
        <Footer />
      </div>
    </>
  );
}
