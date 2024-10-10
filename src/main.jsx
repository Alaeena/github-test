import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DrawProvider } from './config/DrawContext.jsx';

import App from './App.jsx';
import './components/normalize.scss';
import './components/index.scss';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DrawProvider>
            <App />
        </DrawProvider>
    </BrowserRouter>,
);
