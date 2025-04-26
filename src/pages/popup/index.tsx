import ReactDOM from 'react-dom/client';
import App from './app';

const rootId = 'root';

let rootElem = document.getElementById(rootId);

if (!rootElem) {
  rootElem = document.createElement('div');
  rootElem.id = rootId;

  document.body.appendChild(rootElem);
}

ReactDOM.createRoot(rootElem).render(<App />);
