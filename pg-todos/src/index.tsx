import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainProvider } from './context/MainContext';
import { ThemeProvider } from './context/ThemeContext';
import { DeleteConfirmProvider } from './context/DeleteConfirmContext';
import { SmallTextProvider } from './context/SmallTextContext';
import App from './App';
import './styles.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <MainProvider>
      <ThemeProvider>
        <DeleteConfirmProvider>
          <SmallTextProvider>
            <App />
          </SmallTextProvider>
        </DeleteConfirmProvider>
      </ThemeProvider>
    </MainProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
