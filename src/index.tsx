import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalSlyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalSlyle />
    <App />
  </>
);
