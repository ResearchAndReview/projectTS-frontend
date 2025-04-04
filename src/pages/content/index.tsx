import ReactDOM from 'react-dom/client';
import { Main } from './main';

const rootId = 'comutrans-root';

let rootElem = document.getElementById(rootId);

if (!rootElem) {
  rootElem = document.createElement('div');
  rootElem.id = rootId;

  Object.assign(rootElem.style, {
    position: 'fixed',
    backgroundColor: 'transparent',
    zIndex: '2147483647',
    pointerEvents: 'auto',
  });

  document.body.appendChild(rootElem);
}

ReactDOM.createRoot(rootElem).render(<Main />);
