import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import {store, persistor} from './store/redux'
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
            </BrowserRouter>  
        </PersistGate>
    </Provider>
);

