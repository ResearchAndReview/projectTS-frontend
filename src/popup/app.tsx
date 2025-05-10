import { useState } from 'react';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { useTasksFromAllTabs } from './hooks';
import { Filter } from './types';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const { tasks } = useTasksFromAllTabs();

  return (
    <div>
      <Header />
      <Content tasks={tasks} filter={filter} setFilter={setFilter} />
      <Footer />
    </div>
  );
}
