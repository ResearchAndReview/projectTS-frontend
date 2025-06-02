import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Footer, Header, Setting, Status } from './components';
import { useTasksFromAllTabs } from './hooks';
import { DisplayMode, Filter, Tab } from './types';

export default function App() {
  const [tab, setTab] = useState<Tab>('status');
  const [filter, setFilter] = useState<Filter>('all');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('hover');
  const { tasks } = useTasksFromAllTabs();

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
