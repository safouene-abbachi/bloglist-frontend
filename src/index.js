import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
