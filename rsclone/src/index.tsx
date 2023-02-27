import ReactDOM from 'react-dom/client';
import './index.scss';
import 'normalize.css'
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { MenuState } from './context/MenuContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MenuState>
      <App />
    </MenuState>
  </BrowserRouter>
);

