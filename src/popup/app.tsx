import { useState } from 'react';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { useTasks } from './hooks';

export default function App() {
  const [filter, setFilter] = useState<string>('all');
  const { tasks } = useTasks();

  return (
    <div>
      <Header />
      <Content tasks={tasks} filter={filter} setFilter={setFilter} />
      <Footer />
    </div>
  );
}
