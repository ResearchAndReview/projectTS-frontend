import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Content, Footer, Header } from './components';
import { useTasksFromAllTabs } from './hooks';
import { Filter } from './types';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const { tasks } = useTasksFromAllTabs();

  return (
    <>
      <div>
        <Toaster position="bottom-center" />
        <Header />
        <Content tasks={tasks} filter={filter} setFilter={setFilter} />
        <Footer />
      </div>
    </>
  );
}
