import 'antd/dist/antd.variable.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EventEmitterRC from "./tools/EventEmitterRC";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <EventEmitterRC>
        <App />
      </EventEmitterRC>
  </React.StrictMode>
);

reportWebVitals();
