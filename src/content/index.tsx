import ReactDOM from 'react-dom/client';
import { Main } from './main';

const rootId = 'comutrans-root';

let rootElem = document.getElementById(rootId);

if (!rootElem) {
  rootElem = document.createElement('div');
  rootElem.id = rootId;

  Object.assign(rootElem.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: '2147483647',
    pointerEvents: 'auto',
  });

  document.body.appendChild(rootElem);
}

ReactDOM.createRoot(rootElem).render(<Main />);
